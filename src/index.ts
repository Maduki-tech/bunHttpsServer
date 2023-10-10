import { Elysia } from "elysia";

const app = new Elysia();

app.get("/", () => "Hello World!");

app.get("/hello/:name", ({params: {name}}) => {
    return `Hello this is from ${name}!`;
});

app.listen(3000, () => console.log("Server is running on port 3000"));

console.log("App is running on localhost:3000");
