const express = require("express");
const router = express.Router();
const {
    createQuote,
    getQuotes,
    getQuoteById,
    updateQuote,
    deleteQuote,
} = require("../controllers/quoteController");

router.post("/", createQuote);
router.get("/", getQuotes);
router.get("/:id", getQuoteById);
router.put("/:id", updateQuote);
router.delete("/:id", deleteQuote);

module.exports = router;