const mongoose = require("mongoose");

const {
    readConnection,
    writeConnection
} = require("../config/database");

const bookSchema = new mongoose.Schema({
    productCode: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    priceAfterVAT: {
        type: Number,
        required: true
    }
}, {
    collection: "books",
    timestamps: true
});

const ReadBook = readConnection.model("Book", bookSchema);
const WriteBook = writeConnection.model("Book", bookSchema);

module.exports = {
    ReadBook,
    WriteBook
};