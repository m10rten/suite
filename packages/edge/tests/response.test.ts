import { EdgeResponse, Quick } from "@/response"; // Adjust the import path as needed

describe("EdgeResponse class", () => {
  it("should set status correctly", () => {
    const response = new EdgeResponse();
    response.status(200);
    expect(response).toHaveProperty("_status", 200);
  });

  it("should set headers correctly", () => {
    const response = new EdgeResponse();
    const headers = { "Content-Type": "application/json" };
    response.headers(headers);
    expect(response).toHaveProperty("_headers", headers);
  });

  it("should return a JSON response", () => {
    const response = new EdgeResponse();
    const body = { message: "Hello, World!" };
    const jsonResponse = response.json(body);
    expect(jsonResponse).toBeInstanceOf(Response);
    // You can add more assertions to check the status and headers of the response if needed
  });

  it("should return a text response", () => {
    const response = new EdgeResponse();
    const body = "Hello, World!";
    const textResponse = response.text(body);
    expect(textResponse).toBeInstanceOf(Response);
    // You can add more assertions to check the status and headers of the response if needed
  });

  it("should return a generic response", () => {
    const response = new EdgeResponse();
    const body = { message: "Hello, World!" };
    const genericResponse = response.send(body);
    expect(genericResponse).toBeInstanceOf(Response);
    // You can add more assertions to check the status and headers of the response if needed
  });

  it("should end the response", () => {
    const response = new EdgeResponse();
    const endResponse = response.end();
    expect(endResponse).toBeInstanceOf(Response);
    // You can add more assertions to check the status and headers of the response if needed
  });
});

describe("EdgeResponse namespace", () => {
  it("should return a response with status code 200 for Quick.ok", () => {
    const response = Quick.HTTP.ok();
    expect(response).toBeInstanceOf(Response);
    // Add assertions if needed
  });
});
