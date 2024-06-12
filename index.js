require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models");
const cors = require("cors");

const router = require("./router/index");
const errorHandler = require("./middleware/error");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Сервер запущен на порті ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
