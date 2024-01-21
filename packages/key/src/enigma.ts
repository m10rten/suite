import crypto from "crypto";
import { z } from "zod";

const schema = z.object({
  privateKey: z.string(),
  salt: z.string().min(8, "Salt must be at least 8 characters long."),
  prefix: z
    .string()
    .min(4, "Prefix must be 4 characters long.")
    .max(4, "Prefix must be 4 characters long.")
    .regex(/^[a-z0-9_]+$/, {
      message: "Prefix must be alphanumeric and contain a trailing underscore.",
    }),
});
export type EnigmaOptions = Readonly<z.infer<typeof schema>>;

export interface IEnigma {
  /**
   * Method to create a key, random each time it is called.
   * @param options - Options for the key.
   */
  create(options: IKeyOptions): string;
  /**
   * Method to verify a key, verifies the signature/fingerprint/hash.
   * @param key
   * @param options
   */
  verify(key: string, options: IKeyOptions): boolean;
  /**
   * Method to encrypt data.
   * @param data
   * @param options
   */
  encrypt(data: string, options: IKeyOptions): string;
  /**
   * Method to decrypt data.
   * @param key
   * @param options
   */
  decrypt(key: string, options: IKeyOptions): { decrypted: string; fingerprint: string };

  /**
   * Method to create a key, random each time it is called.
   */
  create(): string;
  /**
   * Method to verify a key, verifies the signature/fingerprint/hash.
   * @param key
   */
  verify(key: string): boolean;
  /**
   * Method to encrypt data.
   * @param data
   */
  encrypt(data: string): string;
  /**
   * Method to decrypt data.
   * @param key
   */
  decrypt(key: string): { decrypted: string; fingerprint: string };
}

export type IKeyOptions = {
  algorithm: Readonly<"aes-256-cbc">;
  digest: Readonly<crypto.BinaryToTextEncoding>;
};
const defaults = {
  algorithm: "aes-256-cbc",
  digest: "hex",
} satisfies IKeyOptions;

const splitter = ".";
export class Enigma implements IEnigma {
  private constructor(private readonly config: EnigmaOptions) {
    this.config = config satisfies EnigmaOptions;
  }

  static init(options: EnigmaOptions): Enigma {
    const parsed = schema.safeParse(options);
    if (parsed.success === false) {
      throw new Error(parsed.error.message);
    }
    return new Enigma(parsed.data);
  }

  encrypt(data: string, options: Readonly<IKeyOptions> = defaults): string {
    const { privateKey, salt } = this.config;
    const { digest, algorithm } = options;
    const key = crypto.scryptSync(privateKey, salt, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([
      cipher.update(`${salt}${splitter}${data}`),
      cipher.final(),
    ]);
    const signature = encrypted.toString(digest);
    return `${signature}${splitter}${iv.toString(digest)}`;
  }

  decrypt(key: string, options: IKeyOptions = defaults) {
    try {
      const { privateKey, salt } = this.config;
      // if key is prefixed, remove it + splitter
      if (key.startsWith(this.config.prefix)) {
        // eslint-disable-next-line no-param-reassign
        key = key.replace(this.config.prefix + splitter, "");
      }
      const [signature, iv] = key.split(splitter);

      const keyBuffer = Buffer.from(signature!, "hex");
      const ivBuffer = Buffer.from(iv!, "hex");
      const decipher = crypto.createDecipheriv(
        options.algorithm,
        crypto.scryptSync(privateKey, salt, 32),
        ivBuffer,
      );

      const decrypted = decipher.update(keyBuffer) + decipher.final("utf-8");

      const decryptedString = decrypted.toString();
      return {
        decrypted: decryptedString.replace(`${salt}${splitter}`, ""),
        fingerprint: decryptedString,
      };
    } catch (error) {
      throw new Error("Failed to decrypt key.");
    }
  }

  create(options: IKeyOptions = defaults): string {
    try {
      const { prefix } = this.config;

      const r = crypto.randomBytes(4);

      const hash = crypto.createHash("sha512");
      hash.update(r);
      hash.update(Date.now().toString());

      const fingerprint = hash.digest("hex");

      const encrypted = this.encrypt(`${fingerprint}`, options);

      return `${prefix}${splitter}${encrypted}`;
    } catch (error) {
      throw new Error("Failed to create key.");
    }
  }

  verify(key: string): boolean {
    try {
      const { prefix, salt } = this.config;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [prefixKey, _, iv] = key.split(splitter);

      const { fingerprint } = this.decrypt(key);

      return (
        prefixKey! === prefix &&
        new RegExp(salt).test(fingerprint) &&
        /^[\w\d]+$/.test(iv!) &&
        iv!.length === 32
      );
    } catch {
      // if the key is not valid by error, return false
      return false;
    }
  }
}

// /**
//  * Test code:
//  */
// const main = async () => {
//   const privateKey = "TestPrivateKey";
//   const salt = "TestSalt123";
//   const prefix = "key_";

//   const options = {
//     privateKey,
//     salt,
//     prefix,
//   } satisfies EnigmaOptions;

//   // const e = Enigma.init(options);

//   const key = Enigma.init(options);

//   // const gen = key.generateRandom();
//   // console.log("generated:", gen);

//   const enc = key.encrypt("Hello World!");
//   console.log("encrypted hi:", enc);

//   const hi = key.decrypt(enc);
//   console.log("decrypted hi:", hi);

//   const cre = key.create();
//   console.log("created:", cre);
//   const dec = key.decrypt(cre);
//   console.log("decrypted create():", dec);

//   const ver = key.verify(cre);
//   console.log("verified create():", ver);

//   const ver2 = key.verify("key_1234567890abcdef.1234567890abcdef.1234567890abcdef");
//   console.log("verified fake:", ver2);

//   // const dec = key.decrypt(cre);
//   // console.log("decrypted:", dec);
// };

// main();
