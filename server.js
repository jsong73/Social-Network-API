const express = require("express");
const db = require("./config/connection");
const validator = require("validator");

const { User , Thought, Reaction } = require("./models");

const PORT = process.env.PORT || 3005;
const app = express();

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
    });
});