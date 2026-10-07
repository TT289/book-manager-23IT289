const express = require("express");
const router = express.Router();

const {
    ReadBook,
    WriteBook
} = require("../models/Book");

const PREFIX = "289";
const VAT = 13;

// READ -> sử dụng tài khoản READ
router.get("/books", async (req, res) => {
    try {
        const books = await ReadBook.find().lean();

        res.render("books", {
            books: books
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
});

// WRITE -> sử dụng tài khoản WRITE
router.post("/books", async (req, res) => {
    try {
        const { productCode, name, price } = req.body;

        // Kiểm tra mã sản phẩm
        if (!productCode || !productCode.startsWith(PREFIX)) {
            return res.status(400).send(
                "Mã sản phẩm bắt buộc phải bắt đầu bằng 289"
            );
        }

        const originalPrice = Number(price);

        // Kiểm tra giá
        if (!Number.isFinite(originalPrice) || originalPrice < 0) {
            return res.status(400).send(
                "Giá sản phẩm không hợp lệ"
            );
        }

        // Tính VAT 13%
        const priceAfterVAT = Math.round(
            originalPrice * (1 + VAT / 100)
        );

        // Ghi bằng WRITE account
        await WriteBook.create({
            productCode,
            name,
            price: originalPrice,
            priceAfterVAT
        });

        // Quay lại danh sách sách
        res.redirect("/books");

    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;