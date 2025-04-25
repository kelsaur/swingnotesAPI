const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const noteRoutes = require("./routes/noteRoutes");

app.use(express.json());

app.get("/", (req, res) => {
	res.send("API is running...");
});

//Routes
app.use("/api/v1/notes", noteRoutes);

module.exports = app;
