const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/threadDB")
  .then(() => console.log("MongoDB Connected"));

app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.listen(5000, () => console.log("Server running on 5000"));
