const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const clienteController = require("./controllers/Cliente");
const produtoController = require("./controllers/Produto");
const connection = require('./database/database');
const usuarioController = require("./controllers/Usuario");

app.use(session({
    secret: "hdwfwueihfiuwesvfgrbht",
    cookie: { maxAge: 300}

}));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', clienteController);
app.use('/', produtoController);
app.use('/', usuarioController);

connection
    .authenticate()
    .then(() => {
        console.log("conectado com sucesso");
    })
    .catch((error) => {
        console.log(error);
    });
    
    
app.listen("3000", () => { console.log("servidor ok"); });