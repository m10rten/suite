import { useOnce, useZap } from "@mvdlei/hooks";
import { z } from "zod";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
function App() {
  const zap = useZap({
    origin: "https://jsonplaceholder.typicode.com",
  });
  const { data, error, loading, call } = zap("/posts", {
    output: z.array(
      z.object({
        userId: z.number(),
        id: z.number(),
        title: z.string(),
        body: z.string(),
      }),
    ),
  });

  useOnce(() => {
    call();
  });
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.map((post: Post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
      <button onClick={() => call()}>Reload</button>
    </>
  );
}

export default App;
