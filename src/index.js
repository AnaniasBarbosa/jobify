const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const connection = require("../database/database");
const Categorias = require("../database/categorias");
const Vagas = require("../database/vagas");

connection
  .authenticate()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((error) => {
    console.log("ERRO AO CONECTAR NO BANCO DE DADOS: ", error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const vagasBd = await Vagas.findAll({ raw: true });
  const categoriasBd = await Categorias.findAll({ raw: true });

  const categorias = categoriasBd.map((cat) => {
    return {
      ...cat,
      vagas: vagasBd.filter((vg) => vg.categoria === cat.id),
    };
  });
  console.log(categorias);
  res.render("home", {
    categorias,
  });
});

app.get("/vaga/:id", async (req, res) => {
  const idVaga = req.params.id;

  const vaga = await Vagas.findByPk(idVaga, { raw: true });
  const categoria = await Categorias.findByPk(vaga.categoria, { raw: true });

  return res.render("vaga", {
    vaga,
    categoria,
  });
});

app.get("/admin", async (req, res) => {
  res.render("admin/home.ejs");
});

app.get("/admin/vagas", async (req, res) => {
  const vagas = await Vagas.findAll({ raw: true });
  res.render("admin/vagas", {
    vagas,
  });
});
app.get("/admin/categorias", async (req, res) => {
  res.render("admin/categorias");
});

app.get("/admin/vagas/remover/:id", async (req, res) => {
  const vagaId = req.params.id;
  const vaga = await Vagas.findByPk(vagaId);
  await vaga.destroy();
  res.redirect("/admin/vagas");
});

app.get("/admin/vagas/criarVaga/", async (req, res) => {
  const categorias = await Categorias.findAll({ raw: true });
  res.render("admin/nova-vaga", {
    categorias,
  });
});

app.post("/admin/vagas/criarVaga/", async (req, res) => {
  const { categoria, nome, descricao } = req.body;

  await Vagas.create({
    categoria,
    nome,
    descricao,
  });
  return res.redirect("/admin/vagas/");
});

app.get("/admin/vagas/editar/:id", async (req, res) => {
  const idVaga = req.params.id;
  const vaga = await Vagas.findByPk(idVaga);
  const categorias = await Categorias.findAll({ raw: true });
  res.render("admin/editar-vaga", {
    categorias,
    vaga,
  });
});

app.post("/admin/vagas/editar/:id", async (req, res) => {
  const { categoria, nome, descricao } = req.body;
  const { id } = req.params;

  const vaga = await Vagas.findByPk(id);
  vaga.descricao = descricao;
  vaga.nome = nome;
  vaga.categoria = categoria;

  await vaga.save();
  res.redirect("/admin/vagas/");
});

app.listen(port, (err) => {
  if (!err) {
    console.log("SERVIDOR EM EXECUÇÃO");
  }
});
