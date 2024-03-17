/* eslint-disable no-console */
import { HttpError } from "../src/errors";
import { api } from "../src/fetch";
import { Web } from "../src/index";

/**
 * Test code:
 */
const main = async () => {
  try {
    console.log(Web.Api.Origin.fromEnv());

    console.log("started");

    const todo = await api("1//?q=1", {
      origin: "https://jsonplaceholder.typicode.com//1",
      path: "//todos//",
      params: {
        h: "2",
      },
    });
    console.log(todo.status, todo.data);

    const get = await api.get("https://jsonplaceholder.typicode.com/todos/2");
    console.log(get.status, get.data);

    const post = await api.post("https://jsonplaceholder.typicode.com/todos", {
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
    });
    console.log(post.status, post.data);
  } catch (error) {
    if (HttpError.is(error)) {
      console.log(error.response.statusText);
    } else {
      console.error(error);
    }
  }
};
main().then(() => console.log("done"));
