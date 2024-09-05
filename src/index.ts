import express, { json } from "express";
import companiesRouter from "./routers/company_router";

const PORT = 8080; // TODO: move to config file
export const app = express();

app.use(json());

app.get("/ping", (request: any, response: any) => {
    response.status(200).json({ message: "pong - the server is running" });
});

app.use("/api/company", companiesRouter);

app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});