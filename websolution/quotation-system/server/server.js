const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://devarete.com",
            "https://www.devarete.com",
        ],
        methods: ["GET", "POST"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/quotes", require("./routes/quoteRoutes"));
app.use("/api/inquiries", require("./routes/inquiryRoutes"));

app.get("/", (req, res) => {
    res.send("Quotation System API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});