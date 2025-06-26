import express from 'express';
//dotenv is used to read and process data from a .env file
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

/* {CORS : Cross-Origin Resource Sharing}
  CORS is a security feature implemented by web browsers to prevent malicious websites from making requests to a different domain than the one that served the web page.CORS stands for Cross-Origin Resource Sharing. It’s a security mechanism enforced by web browsers that blocks requests from your frontend (like localhost:5173) to a backend hosted on a different origin, unless the server explicitly allows it.
  its,like => {The browser asks the server: "Hey server, are you okay with me (coming from port 5173) accessing your data?"
      If the server doesn't send the right response headers, the browser blocks the request and throws a CORS error like:
    }
*/
import cors from "cors";
import path from "path";

import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { app,server } from './lib/socket.js';

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({limit:"10mb"})); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser()); // Middleware to parse the cookies
app.use(
  cors({
    origin : "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.) to be sent with requests
  })
);

//first route we gonna have for the authentication
//Hey Express app, for any request that starts with /api/auth, send it to authRoutes to figure out the rest.
//app.use method is always execute before the request reaches the route handler
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  console.log("Serving static files from:", path.join(__dirname, "../frontend/dist"));
console.log("Index HTML path:", path.join(__dirname, "../frontend/dist", "index.html"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

//add socket.io between the server and the experss app using server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB(); // connectDB is defined on db.js to connect to your database
});