import app from "./app";

const PORT = 8080; // TODO: move to config file

app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
});