const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
      openapi: "3.0.0",
      info: { title: "Crossfit WOD API", version: "1.0.0" },
    },
    apis: ["./src/v1/routes/workoutRoutes.js", "./src/database/Workout.js"],
  };

  const swaggerSpec = swaggerJSDoc(options);

  const swaggerDocs = (app, port) => {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(
      `Docs are available on http://localhost:${port}/api/swagger`
    );
  };
  
  module.exports = { swaggerDocs };