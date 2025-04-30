const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

//load .env before using process.env -> so i can sue process.env.JWT_secret anywhere in my code. otherwise it will throw undefined
dotenv.config();

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("MongoDB connected"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
