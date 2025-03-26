const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Servidor Node.js do AgroTemp 🚀");
});

module.exports = app;