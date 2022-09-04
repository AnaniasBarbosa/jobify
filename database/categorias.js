const { Sequelize } = require("sequelize");
const database = require("./database");

const categorias = database.define("CATEGORIAS", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  categoria: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

categorias.sync({ force: false }).then(() => {});

module.exports = categorias;
