/* eslint-disable @typescript-eslint/no-explicit-any */
import { TString } from "@/string";

describe("String Class", () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  let str: TString;

  beforeEach(() => {
    str = new TString();
  });

  describe("upper", () => {
    it("should transform string to uppercase", () => {
      const result = str.upper("hello");
      expect(result).toBe("HELLO");
    });

    it("should return input as is when parsing fails", () => {
      const result = str.upper(123 as any);
      expect(result).toBe(123);
    });
  });

  describe("lower", () => {
    it("should transform string to lowercase", () => {
      const result = str.lower("HeLLo");
      expect(result).toBe("hello");
    });

    it("should return input as is when parsing fails", () => {
      const result = str.lower(123 as any);
      expect(result).toBe(123);
    });
  });

  describe("reverse", () => {
    it("should reverse the characters of the string", () => {
      const result = str.reverse("hello");
      expect(result).toBe("olleh");
    });

    it("should return input as is when parsing fails", () => {
      const result = str.reverse(123 as any);
      expect(result).toBe(123);
    });
  });

  describe("empty", () => {
    it("should return true for an empty string", () => {
      const result = str.empty("");
      expect(result).toBe(true);
    });

    it("should return false for a non-empty string", () => {
      const result = str.empty("hello");
      expect(result).toBe(false);
    });

    it("should return true for String()", () => {
      const result = str.empty(String());
      expect(result).toBe(true);
    });
  });

  describe("has", () => {
    it("should return true if the string contains the specified substring", () => {
      const result = str.has("hello", "el");
      expect(result).toBe(true);
    });

    it("should return false if the string does not contain the specified substring", () => {
      const result = str.has("hello", "le");
      expect(result).toBe(false);
    });
  });

  describe("quote", () => {
    it("should wrap the string in double quotes", () => {
      const result = str.quote("hello");
      expect(result).toBe('"hello"');
    });

    it("should return input as is when parsing fails", () => {
      const result = str.quote(123 as any);
      expect(result).toBe(123);
    });
  });

  describe("words", () => {
    describe("count", () => {
      it("should return the number of words in a string", () => {
        const result = str.words.count("hello world");
        expect(result).toBe(2);
      });

      it("should return 0 for an empty string", () => {
        const result = str.words.count("");
        expect(result).toBe(0);
      });
    });

    describe("longest", () => {
      it("should return the longest words if the same length", () => {
        const result = str.words.longest("hello world");
        expect(result).toStrictEqual(["hello", "world"]);
      });

      it("should return an empty string for an empty string", () => {
        const result = str.words.longest("");
        expect(result).toBe("");
      });

      it("should return an empty string for a number", () => {
        const result = str.words.longest(123 as any);
        expect(result).toBe("");
      });

      it("should return the 1 longest word as string", () => {
        const result = str.words.longest("123456 12345 1234567");
        expect(result).toBe("1234567");
      });
    });
  });

  describe("casing", () => {
    describe("kebab", () => {
      it("should convert the string to kebab case", () => {
        const result = str.casing.kebab("hello world");
        expect(result).toBe("hello-world");
      });
      it("should convert with uppercase", () => {
        const upped = str.upper("hello world");
        const result = str.casing.kebab(upped);
        expect(result).toBe("HELLO-WORLD");
      });
    });

    describe("snake", () => {
      it("should convert the string to snake case", () => {
        const result = str.casing.snake("hello world");
        expect(result).toBe("hello_world");
      });
      it("should convert with uppercase", () => {
        const upped = str.upper("hello world");
        const result = str.casing.snake(upped);
        expect(result).toBe("HELLO_WORLD");
      });
    });

    describe("camel", () => {
      it("should convert the string to camel case", () => {
        const result = str.casing.camel("hello world");
        expect(result).toBe("helloWorld");
      });
      it("should convert with uppercase, still to camel", () => {
        const upped = str.upper("hello world");
        const result = str.casing.camel(upped);
        expect(result).toBe("helloWorld");
      });
    });

    describe("pascal", () => {
      it("should convert the string to pascal case", () => {
        const result = str.casing.pascal("hello world");
        expect(result).toBe("HelloWorld");
      });
      it("should convert with uppercase, still to pascal", () => {
        const upped = str.upper("hello world");
        const result = str.casing.pascal(upped);
        expect(result).toBe("HelloWorld");
      });
    });

    describe("dot", () => {
      it("should convert the string to dot case", () => {
        const result = str.casing.dot("hello world");
        expect(result).toBe("hello.world");
      });
      it("should convert with uppercase", () => {
        const upped = str.upper("hello world");
        const result = str.casing.dot(upped);
        expect(result).toBe("HELLO.WORLD");
      });
    });

    describe("is", () => {
      describe("kebab", () => {
        it("should return true if the string is in kebab case", () => {
          const result = str.casing.is.kebab("hello-world");
          expect(result).toBe(true);
        });

        it("should return false if the string is not in kebab case", () => {
          const result = str.casing.is.kebab("helloWorld");
          expect(result).toBe(false);
        });
      });

      describe("snake", () => {
        it("should return true if the string is in snake case", () => {
          const result = str.casing.is.snake("hello_world");
          expect(result).toBe(true);
        });

        it("should return false if the string is not in snake case", () => {
          const result = str.casing.is.snake("helloWorld");
          expect(result).toBe(false);
        });
      });

      describe("camel", () => {
        it("should return true if the string is in camel case", () => {
          const result = str.casing.is.camel("helloWorld");
          expect(result).toBe(true);
        });

        it("should return false if the string is not in camel case", () => {
          const result = str.casing.is.camel("hello-world");
          expect(result).toBe(false);
        });
      });

      describe("pascal", () => {
        it("should return true if the string is in pascal case", () => {
          const result = str.casing.is.pascal("HelloWorld");
          expect(result).toBe(true);
        });

        it("should return false if the string is not in pascal case", () => {
          const result = str.casing.is.pascal("helloWorld");
          expect(result).toBe(false);
        });
      });

      describe("dot", () => {
        it("should return true if the string is in dot case", () => {
          const result = str.casing.is.dot("hello.world");
          expect(result).toBe(true);
        });

        it("should return false if the string is not in dot case", () => {
          const result = str.casing.is.dot("helloWorld");
          expect(result).toBe(false);
        });
      });
    });
  });

  describe("email", () => {
    it("should return true for a valid email address", () => {
      const result = str.email("test@test.ts");
      expect(result).toBe(true);
    });

    it("should return false for an invalid email address", () => {
      const result = str.email("test@test");
      expect(result).toBe(false);
    });
  });

  describe("url", () => {
    it("should return true for a valid URL", () => {
      const result = str.url("http://localhost:8080");
      expect(result).toBe(true);
    });

    it("should return false for an invalid URL", () => {
      const result = str.url("test.ts");
      expect(result).toBe(false);
    });
  });

  describe("truncate", () => {
    it("should truncate a string with a specified length", () => {
      const result = str.truncate("hello world", 5);
      expect(result).toBe("hello...");
    });

    it("should return input as is when parsing fails", () => {
      const result = str.truncate(123 as any, 5);
      expect(result).toBe(123);
    });

    it("should return input as is when length is less than 0", () => {
      const result = str.truncate("hello world", -5);
      expect(result).toBe("hello world");
    });
  });
});
