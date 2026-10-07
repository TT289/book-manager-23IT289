require("dotenv").config();

const express = require("express");
const bookRoutes = require("./routes/books");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Book Manager - 23IT289 - PhungTienTrung");
});

app.use("/", bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});