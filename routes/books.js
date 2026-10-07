const express = require("express");
const router = express.Router();

const {
    ReadBook,
    WriteBook
} = require("../models/Book");

const PREFIX = "289";
const VAT = 13;

// READ -> bắt buộc sử dụng tài khoản READ
router.get("/books", async (req, res) => {
    try {
        const books = await ReadBook.find().lean();

        res.json({
            account: "23IT289_read",
            books
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// WRITE -> bắt buộc sử dụng tài khoản WRITE
router.post("/books", async (req, res) => {
    try {
        const { productCode, name, price } = req.body;

        if (!productCode || !productCode.startsWith(PREFIX)) {
            return res.status(400).json({
                error: "Mã sản phẩm bắt buộc phải bắt đầu bằng 289"
            });
        }

        const originalPrice = Number(price);

        if (!Number.isFinite(originalPrice) || originalPrice < 0) {
            return res.status(400).json({
                error: "Giá sản phẩm không hợp lệ"
            });
        }

        const priceAfterVAT =
            Math.round(originalPrice * (1 + VAT / 100));

        const book = await WriteBook.create({
            productCode,
            name,
            price: originalPrice,
            priceAfterVAT
        });

        res.status(201).json({
            account: "23IT289_write",
            vat: "13%",
            book
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;