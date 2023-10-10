
# Bun Http Tutorial


## Usage
`curl -fsSL https://bun.sh/install | bash`


## Create basic Project
``` bash
bun create elysia myapp
cd myapp
bun run dev
```


### Http server
1. Remove the code

2. Add the code
```ts
import { Elysia } from 'elysia'

const app = new Elysia();
app.get('/', () => "Hello World!");
app.listen(8000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

3. Show Methodes
```ts
app.get('/', () => {});
app.post('/', () => {});
app.put('/', () => {});
app.patch('/', () => {});
app.delete('/', () => {});
```

4. How to read param
```ts
app.get("/hello/:name", ({ params: { name } }) => {
  return `Hello ${name}!`;
});
```

### Bun sqlite integration
5. Setup Cors for Later
```bash
bun add @elysiajs/cors
```

6. Import and Use
```ts
import { cors } from "@elysiajs/cors";

const app = new Elysia();
app.use(cors());
```

7. Create DB
```ts
import { Database } from "bun:sqlite";

// Create DB If not Exists
const DB = new Database("mydb.sqlite", { create: true });
```

8. Query to create Table
```ts
DB.query(
  `CREATE TABLE IF NOT EXISTS MESSAGES(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message TEXT
);`
).run();
```

9. Get all Entries
```ts
app.get("/", (context) => {
  const query = DB.query(`SELECT * FROM MESSAGES;`);
  const result = query.all();
  console.log(result);
  context.set.status = 200;

  return new Response(JSON.stringify({ messages: result }), {
    headers: { "Content-Type": "application/json" },
  });
});
```

10. Post One Entry
```ts
import { Elysia, t } from "elysia";

app.post(
  "/add",
  ({ body }) => {
    const message = body?.message;
    console.log(message);
    const query = DB.query(`INSERT INTO MESSAGES (message) VALUES (?1)`);
    query.run(message);
    return new Response(JSON.stringify({ message: "Added" }), {
      headers: { "Content-Type": "application/json" },
    });
  },
  {
    body: t.Object({
      message: t.String(),
    }),
  }
);
```

11. Curl Command
```bash
curl -X POST http://localhost:8000/add -H "Content-Type: application/json" -d '{"message":"This is a Reminder!"}'  
curl http://localhost:8000/
```

### Here are some tasks for you:

- Create `PUT` and `DELETE` requests to update or DELETE the Database
- Implement error handling
