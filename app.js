const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const swaggerUI = require("swagger-ui-express");
const apiDocs = require("./docs/docs.json");

app.use(express.json());
app.use("/swingnotes/docs", swaggerUI.serve);

app.get("/swingnotes/docs", swaggerUI.setup(apiDocs));

//app.get("/", (req, res) => {
//	res.send("API is running!");
//});

//Routes
app.use("/swingnotes/auth", userRoutes);
app.use("/swingnotes/notes", noteRoutes);
app.use(errorHandler);

module.exports = app;
