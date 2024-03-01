const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')
const { log } = require('util')
require("dotenv").config(); // Load the .env values into process.env
const app = express();
const port = process.env.PORT

app.use(cookieParser()); // Handle cookies in the application

app.use(cors({ credentials: true, origin: "http://localhost:5173"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");
require("./routes/user.route")(app);
require("./routes/tricycle.routes")(app)

app.listen(port, () => console.log(`Listening on port ${port}`));