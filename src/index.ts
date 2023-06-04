//import package

import helmet from "helmet";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import cors from "cors";
import nunjucks from "nunjucks";

const app = express();
nunjucks.configure("views", {
	autoescape: true,
	express: app,
});
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("."));

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

app.get("/", (_, res) => {
	try {
		const uploadDir = path.join(__dirname, "..", "views/uploads");
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir);

			console.log("Folder Created Successfully.");
		}

		fs.readdir(uploadDir, (err, files) => {
			console.log({ files, uploadDir });
			if (files && files.length) {
				const html = files.map((img) => `<img src="uploads/${img}" />`);
				return res.render("index.html", {
					name: "Mohamed amine fhal",
					files,
				});
			} else {
				res.send(
					"<h2>Hello world, I don't know if there is an Error of you don't have any imgs uploaded yet</h2>"
				);
			}
		});
	} catch (error) {
		console.log("there is an error", error);
		res.send("<h2>There is an error!</h2>");
	}
});

app.post("/api/upload", (req, res) => {
	console.log("Req", req.body);
	try {
		const uploadDir = path.join(__dirname, "..", "views/uploads");
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
	} catch (error) {
		console.log({ error });
		res.send("<h2>Something happened!</h2>");
	}
});

//server listen
const port: Number = 8000;
app.listen(port, () => {
	console.log(`server yemchi jawou mezyan 3al port http://localhost:${port}`);
});
