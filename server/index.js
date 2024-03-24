const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const { errorHandler } = require("./middleware/errorHandler");
const { connectDB } = require("./config/db");
const PORT = process.env.PORT || 5000;

const bcrypt = require("bcryptjs");
// server
const app = express();

// Allow all origins
app.use(
  cors({
    origin: "https://ticket-app-client.vercel.app",
    preflightContinue: true,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// connect to database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);

app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.status(201).send({ message: "Welcome to my ticket app" });
});

// error page
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
