/******************************************
 * Require Statements
 *****************************************/
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoDB = require("./db/mongo.js");
<<<<<<< HEAD
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");
=======
>>>>>>> 924870b (removed swagger routes from server.js)
const routes = require("./routes");

/******************************************
 * Middleware
 ******************************************/
// Use cors middleware
app.use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }));
app.use(cors({ origin: "*" }));

// Use bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up headers middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
});

// Use express.json() and express.urlencoded() middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
// Middleware to serve Swagger UI
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument));

=======
>>>>>>> 924870b (removed swagger routes from server.js)
/******************************************
 * Routes
 *****************************************/
app.use("/", routes);

/******************************************
 * Server Setup
 ******************************************/
const PORT = process.env.PORT || 7100;

// Use the Mongoose connection from mongo.js
mongoDB
    .connectToMongoDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error starting the application:", err);
    });
