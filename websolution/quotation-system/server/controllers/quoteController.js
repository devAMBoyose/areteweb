const Quote = require("../models/Quote");

exports.createQuote = async (req, res) => {
    try {
        const quote = await Quote.create(req.body);
        res.status(201).json(quote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find().sort({ createdAt: -1 });
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getQuoteById = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);

        if (!quote) {
            return res.status(404).json({ message: "Quote not found" });
        }

        res.status(200).json(quote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateQuote = async (req, res) => {
    try {
        const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!quote) {
            return res.status(404).json({ message: "Quote not found" });
        }

        res.status(200).json(quote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteQuote = async (req, res) => {
    try {
        const quote = await Quote.findByIdAndDelete(req.params.id);

        if (!quote) {
            return res.status(404).json({ message: "Quote not found" });
        }

        res.status(200).json({ message: "Quote deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};