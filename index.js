const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const categoria = require("./controllers/categoria");
const cliente = require("./controllers/cliente");
const produto = require("./controllers/produto");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/", categoria);
app.use("/", cliente);
app.use("/", produto);
