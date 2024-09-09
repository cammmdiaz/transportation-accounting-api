import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT; // for example: 8080;

app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});