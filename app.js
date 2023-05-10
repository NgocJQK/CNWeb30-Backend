const express = require("express");
const app = express();
const mongoose = require("mongoose");

//configure mongoose
mongoose.set('strictQuery', false);
mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://admin:admin@cnwebcluster.obhhajd.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

//middleware
app.use(express.json());

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;
