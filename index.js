const connection = require("./database/database");
const Categorias = require("./database/categorias");
const Vagas = require("./database/vagas");

connection
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((error) => {
    console.log("ERRO AO CONECTAR NO BANCO DE DADOS: ", error);
  });

async function consultaBD() {
  const vagas = await Vagas.findAll({ raw: true });
  const categorias = await Categorias.findAll({ raw: true });

  const conjunto = categorias.map((cat) => {
    return {
      cat,
      vagas: vagas.filter((vg) => vg.categoria === cat.id),
    };
  });

  console.log(conjunto[1].vagas);
}

consultaBD();
