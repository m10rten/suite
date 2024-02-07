import { Edge } from "@/edge";

describe("Edge namespace", () => {
  describe("create function", () => {
    it("should create a new Edge application with the provided handler", () => {
      const handler = jest.fn();
      const edgeApp = Edge.create(handler);

      expect(edgeApp.default).toBe(handler);
      expect(edgeApp.GET).toBe(handler);
      expect(edgeApp.POST).toBe(handler);
      expect(edgeApp.PUT).toBe(handler);
      expect(edgeApp.DELETE).toBe(handler);
      expect(edgeApp.PATCH).toBe(handler);
      expect(edgeApp.OPTIONS).toBe(handler);
      expect(edgeApp.HEAD).toBe(handler);
    });
  });

  describe("custom function", () => {
    it("should create a new Edge application with custom properties and handler", async () => {
      const middleware = jest.fn().mockResolvedValue({ myProp: "Hello, World!" });
      const handler = jest.fn().mockResolvedValue(new Response("Custom response"));

      const edgeApp = Edge.custom(middleware, handler);

      const request = new Request("https://example.com");

      const response = await edgeApp.default(request);

      const merged = Object.assign(request, { myProp: "Hello, World!" });

      expect(middleware).toHaveBeenCalledWith(request);
      expect(handler).toHaveBeenCalledWith(merged);
      expect(response).toBeInstanceOf(Response);
    });

    it("should handle middleware returning a Response object", async () => {
      const middleware = jest
        .fn()
        .mockResolvedValue(new Response("Middleware response"));
      const handler = jest.fn();

      const edgeApp = Edge.custom(middleware, handler);

      const request = new Request("https://example.com");

      const response = await edgeApp.default(request);

      expect(middleware).toHaveBeenCalledWith(request);
      expect(handler).not.toHaveBeenCalled();
      expect(response).toBeInstanceOf(Response);
    });
  });
});
