import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import config from "./utils/config.js";
//import path from 'path';

import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//app.use(express.static("client/build"));

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

//app.get("*", (req, res) => {
//  const __dirname = path.resolve();
//  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//}); 

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    app.listen(config.PORT, () =>
      console.log(`Server running on port: ${config.PORT}`)
    );
  })
  .catch((error) => {
    console.log(error.message);
  });
