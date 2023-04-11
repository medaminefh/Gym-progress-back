//import package
import dotenv from "dotenv";

import helmet from "helmet";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import mongoose from "mongoose";
import formidable from "formidable";
import fs from "fs";
import path from "path";

dotenv.config();
const app = express();

// DB connection
mongoose.connect(process.env.MONGODB_URI!);

mongoose.connection.on("connected", () => {
  console.log("DB connected");
});

mongoose.connection.on("error", (err: Error) => {
  console.log("DB failed with err - ", err);
});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

app.get("/", (req, res) => {
  res.send(`
      <h2>With <code>"express"</code> npm package</h2>
      <form action="/api/upload" enctype="multipart/form-data" method="post">
        <div>Text field title: <input type="text" name="title" /></div>
        <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
        <input type="submit" value="Upload" />
      </form>
    `);
});

app.post("/api/upload", (req, res) => {
  const uploadDir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);

    console.log("Folder Created Successfully.");
  }
  const customOptions = {
    uploadDir,
    keepExtensions: true,
    allowEmptyFiles: false,
    maxFileSize: 5 * 1024 * 1024 * 1024,
    multiples: true,
  };
  const form = formidable(customOptions);

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log("Error", err);
      return;
    }

    return res.json({ fields, files });
  });
});

//server listen
const port: Number = 8000;
app.listen(port, () => {
  console.log(`server yemchi jawou mezyan 3al port http://localhost:${port}`);
});
