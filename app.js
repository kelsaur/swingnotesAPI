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
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/notes", noteRoutes);
app.use(errorHandler);

module.exports = app;
