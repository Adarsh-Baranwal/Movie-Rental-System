const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();
const cors = require("cors");

app.use(cors());

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod");

app.get("/", (req, res) => {
  res.send("WeLCoMe tO MoVie WoRLd!!!!");
});

//port
const port = process.env.PORT || 3900;
app.listen(port, () => console.log(`Server is running on ${port}`));
