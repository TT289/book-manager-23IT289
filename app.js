require("dotenv").config();

const express = require("express");
const { engine } = require("express-handlebars");

const bookRoutes = require("./routes/books");
const sessionMiddleware = require("./config/session");

const app = express();

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session lưu trên MongoDB Atlas
app.use(sessionMiddleware);

// Trang chủ
app.get("/", (req, res) => {
    res.send("Book Manager - 23IT289 - PhungTienTrung");
});

// Test session
app.get("/session", (req, res) => {
    if (!req.session.visits) {
        req.session.visits = 0;
    }

    req.session.visits++;

    res.json({
        message: "Session stored in MongoDB Atlas",
        visits: req.session.visits,
        sessionID: req.sessionID
    });
});

// Book routes
app.use("/", bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});