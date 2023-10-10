import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { Database } from "bun:sqlite";

const app = new Elysia();
app.use(cors());

const DB = new Database("mydb.sqlite", { create: true });

DB.query(
  `CREATE TABLE IF NOT EXISTS Messages (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
         message Text
         );`,
).run();

app.get("/", (context) => {
  const query = DB.query("SELECT * FROM Messages;");
  const result = query.all();

  console.log(result);
  context.set.status = 200;

  return new Response(JSON.stringify({ messages: result }), {
    headers: {
      "content-type": "application/json",
    },
  });
});

app.post(
  "/add",
  ({ body }) => {
    const message = body?.message;
    console.log(message);
    const query = DB.query("INSERT INTO Messages (message) VALUES (?1);");
    query.run(message);
    return new Response(JSON.stringify({ message: "success" }), {
      headers: {
        "content-type": "application/json",
      },
    });
  },
  {
    body: t.Object({
      message: t.String(),
    }),
  },
);

app.get("/hello/:name", ({ params: { name } }) => {
  return `Hello this is from ${name}!`;
});

app.listen(3000, () => console.log("Server is running on port 3000"));

console.log("App is running on localhost:3000");
