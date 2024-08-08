import "dotenv/config";
import express from "express";
import cors from "cors";
import Router from "./src/router/index.mjs";
import Constants from "./src/constants/index.mjs";

const { APP_PORT, API_PREFIX } = Constants;
const app = express();
app.use(express.json());
app.use(cors());

// routes
Object.entries(Router).map(([name, router]) => {
  app.use(`${API_PREFIX}/${name}`, router);
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running.",
  });
});

app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`);
});
