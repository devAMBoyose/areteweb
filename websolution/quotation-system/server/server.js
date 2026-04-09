const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// existing route
app.use("/api/quotes", require("./routes/quoteRoutes"));

// new inquiry route
app.use("/api/inquiries", require("./routes/inquiryRoutes"));

app.get("/", (req, res) => {
    res.send("Quotation System API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});