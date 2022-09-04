const { Sequelize } = require("sequelize");
const database = require("./database");

const vagas = database.define("VAGAS", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  categoria: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

vagas.sync({ force: false }).then(() => {});

module.exports = vagas;
