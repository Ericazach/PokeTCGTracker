require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use("/api/v1", require("./config/routes.config"));

app.listen(3001, () => {
    console.log(`Servidor ejecutándose en 3001`);
});

