import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/authroutes.js"
import messageroutes from "./routes/messageroutes.js"
import connecttomongodb from "./db/connecttomongodb.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
import { app,server } from "./socket/socket.js";
import path from "path"

const PORT=process.env.PORT || 8000;
const __dirname=path.resolve();

dotenv.config();
const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});