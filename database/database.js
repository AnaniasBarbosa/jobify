const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("JOBIFY", "root", "246813@ABGgba", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
