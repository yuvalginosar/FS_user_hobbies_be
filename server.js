import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);
const buildPath = path.join(currentDir, "../asterra_home_assignment_fe/build");

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.use(express.static(buildPath));

app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:3000",
      "http://54.158.63.25",
    ],
    credentials: true,
  })
);

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(currentDir, "../asterra_home_assignment_fe/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
