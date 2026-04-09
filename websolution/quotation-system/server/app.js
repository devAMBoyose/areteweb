// server/app.js
import express from "express";
import cors from "cors";
import path from "path";
import inquiryRoutes from "./routes/inquiryRoutes.js";

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve("uploads")));

app.use("/api/inquiries", inquiryRoutes);

export default app;