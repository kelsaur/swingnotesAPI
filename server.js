const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

//load .env before using process.env
dotenv.config();

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("MongoDB connected"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
