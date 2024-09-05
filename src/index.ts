import express, { json } from "express";

const PORT = 8080; // TODO: move to config file
export const app = express();

app.use(json());

app.get("/ping", (request: any, response) => {
    response.status(200).json({ message: "pong - the server is running" });
});

app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});