const express = require("express");
const app = express();
const mongoose = require("mongoose");
const quizRouter = require("./routes/QuizRoutes");
const classRouter = require("./routes/ClassRoutes");
// const { swaggerDocs } = require("./resources/swagger");
const swaggerRouter = require("./resources/swaggerRoutes");

//configure mongoose
mongoose.set('strictQuery', false);
mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://admin:admin@cnwebcluster.obhhajd.mongodb.net/QuizDB?retryWrites=true&w=majority",
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
app.use("/api/quizs", quizRouter);
app.use("/api/classes", classRouter);
app.use("/api/swagger", swaggerRouter);

app.listen(3005, () => {
  console.log("Server is running on port 3005");
  console.log(
    `Docs are available on http://localhost:3005/api/swagger`
  );
  // swaggerDocs(app, 3005);
});

module.exports = app;
