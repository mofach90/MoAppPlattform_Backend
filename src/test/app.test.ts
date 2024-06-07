import request from "supertest";
import { app, server } from "../server";

describe("first test ", () => {
  it("test the endpoint /test", async () => {
    const response = await request(app)
      .get("/test")
      .expect("Content-Type", /text\/html/)
      .expect(200);
    expect(response.text).toEqual("<h1>success status 200</h1>");
  });
});

afterAll((done) => {
  server.close(done);
});
