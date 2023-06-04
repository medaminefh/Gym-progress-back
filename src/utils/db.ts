import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
// DB connection
mongoose.connect(process.env.MONGODB_URI!);

mongoose.connection.on("connected", () => {
	console.log("DB connected");
});

mongoose.connection.on("error", (err: Error) => {
	console.log("DB failed with err - ", err);
});
