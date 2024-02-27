const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
require("dotenv").config(); // Load the .env values into process.env

const cookieParser = require("cookie-parser");
app.use(cookieParser()); // Handle cookies in the application

app.use(cors({ credentials: true, origin: "http://localhost:5173"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");

require("./routes/user.route")(app);
app.listen(port, () => console.log(`Listening on port ${port}`));