require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const TodosRouter = require("./routes/todos");

const PORT = process.env.PORT || 5000;
const DB = process.env.MONGODB_CONNECTION_URL;
const DB_NAME = process.env.DATABASE_NAME;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ConnectDB = async () => {
  await mongoose.connect(DB, {
    dbName: DB_NAME,
  });
  console.log("Database Connected");
};
ConnectDB().catch((err) => {
  console.log(err);
});

app.get("", (req, res) => {
  res.send("Hello World");
});

app.use("/todos", TodosRouter);

app.listen(PORT, () => {
  console.log(`server currently running at port ${PORT}`);
});
