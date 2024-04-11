const express = require("express");
const cookieParser = require("cookie-parser");
const middleware = require("./middleware/error");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Route imports
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);

// Additional middleware or configurations
// For example, setting up a static directory
app.use(express.static("public"));

// Custom error handling middleware
app.use(middleware);

module.exports = app;
