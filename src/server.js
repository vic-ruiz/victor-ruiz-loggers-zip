import express from "express";
import morgan from "morgan";
import routes from "./routes/info.js";
import "dotenv/config";

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/info", routes);

const server = app.listen(PORT, () => {
  console.log(` 🚀 Server started at http://localhost:${PORT}`);
});

server.on("error", (err) => console.log(err));
