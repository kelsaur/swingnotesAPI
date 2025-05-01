const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

app.get("/", (req, res) => {
	res.send("API is running...");
});

//Routes
app.use("/swingnotes/auth", userRoutes);
app.use("/swingnotes/notes", noteRoutes);
app.use(errorHandler);

module.exports = app;
