require("dotenv").config();
require("./config/db.config");

const PORT = process.env.PORT || 3001;

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));



app.use(logger("dev"));
app.use(express.json());
app.use("/api/v1", require("./config/routes.config"));

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en 3001`);
});

