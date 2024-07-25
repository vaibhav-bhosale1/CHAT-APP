import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/authroutes.js"
import messageroutes from "./routes/messageroutes.js"
import connecttomongodb from "./db/connecttomongodb.js";
import cookieParser from "cookie-parser";
import { dirname } from 'path';
import userRoutes from "./routes/userRoutes.js"
import { app,server } from "./socket/socket.js";
import path from "path"


dotenv.config();

const PORT=process.env.PORT || 8000;
const __dirname=path.resolve();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authroutes);
app.use("/api/messages", messageroutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connecttomongodb();
	console.log(`Server Running on port ${PORT}`);
});