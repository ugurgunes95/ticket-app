require("dotenv").config();
const PORT = process.env.PORT || 3500;

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const verifyJwt = require("./helpers/verifyJwt");
const initialize = require("./helpers/initialize");

// Middlewares
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Public Routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/logout", require("./routes/logout"));
app.use("/refresh", require("./routes/refresh"));

// Private routes
app.use(verifyJwt);

// Error Handler
app.use(errorHandler);

app.listen(PORT, async () => {
  await initialize();
  console.log(`Server ${PORT} portunda çalışmaya başladı`);
});
