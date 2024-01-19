const { Sequelize, DataTypes } = require("sequelize");
// const productModel = require("./product.models");
const taskModel = require("./task.model");

const DB_URL = process.env.DB_URL;

const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// # creating instane for models
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// product related db
db.taskModel = taskModel(sequelize, DataTypes);

// instantiate sequelize db
// db.sequelize.sync({ force: true });

module.exports = db;
