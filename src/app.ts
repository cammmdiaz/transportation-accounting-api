import express, { json } from "express";
import indexRouter from "./routers";
import { errorHandler } from "./middlewares/error_handler";

const app = express();

app.use(json());

app.get("/ping", (request: any, response: any) => {
    response.status(200).json({ message: "pong - the server is running" });
});

app.use("/api", indexRouter);

app.use(errorHandler);

export default app;
