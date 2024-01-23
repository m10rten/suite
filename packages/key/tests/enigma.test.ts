import { Enigma, EnigmaOptions, IKeyOptions } from "@/enigma";

describe("Enigma", () => {
  const privateKey = "TestPrivateKey";
  const salt = "TestSalt123";
  const prefix = "key_";

  const options: EnigmaOptions = {
    privateKey,
    salt,
    prefix,
  };

  const enigma = Enigma.init(options);

  describe("create", () => {
    it("should create a valid key", () => {
      const key = enigma.create();
      expect(enigma.verify(key)).toBe(true);
    });
  });

  describe("encrypt and decrypt", () => {
    it("should encrypt and decrypt data successfully", () => {
      const data = "Hello World!";
      const encrypted = enigma.encrypt(data);
      const decrypted = enigma.decrypt(encrypted);

      expect(decrypted.decrypted).toBe(data);
    });
  });

  describe("verify", () => {
    it("should verify a valid key", () => {
      const key = enigma.create();
      expect(enigma.verify(key)).toBe(true);
    });

    it("should return false for an invalid key", () => {
      const invalidKey = "invalid_key";
      expect(enigma.verify(invalidKey)).toBe(false);
    });
  });

  describe("custom options", () => {
    it("should use custom options for encryption", () => {
      const customOptions: IKeyOptions = {
        algorithm: "sha1",
        digest: "hex",
      };

      const data = "Custom Options Test";
      const encrypted = enigma.encrypt(data, customOptions);
      const decrypted = enigma.decrypt(encrypted);

      expect(decrypted.decrypted).toBe(data);
    });
  });
});
