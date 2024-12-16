require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
});