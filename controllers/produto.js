const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');
const slugify = require('slugify');

router.get("/produtos/:slug", (req, res) => {
    var slug = req.params.slug;
    Cliente.findOne({
        where: {slug: slug},
        include: [{model : Produto}]
    }).then(produto =>{
        if(produto != undefined){
            Cliente.findAll().then(cliente => {
                res.statusCode = 200;
                res.json(produto.produtos);
            });
        }else{
            res.sendStatus(400);
        }
    }).catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
});

router.get("/produto/:id", (req, res) => {
    var id = req.params.id;
    Produto.findOne({where: {id: id}}).then(produto => {
        if(produto != undefined){
            res.statusCode = 200;
            res.json(produto);
        }else{
            res.sendStatus(400);
        }
    }).catch(err => {
        console.log(err);
        res.sendStatus(400);
    })
});

router.post("/produto/:id", (req, res) => {
    var id = req.params.id;

    if(id != undefined){
            Cliente.findAll({where: {id: id}}).then(response =>  {
                if(response != " "){ 
                    var {nome, quantidade, kg, preco} = req.body;
                   2 
                    if(nome != undefined && quantidade != undefined && kg != undefined && preco != undefined){
                        Produto.create({
                            name: nome,
                            slug: slugify(nome),
                            quantity: quantidade,
                            kg: kg,
                            amount: preco,
                            clienteId: id
                        }).then(() => {
                            res.sendStatus(200);
                        }).catch((err) => {
                            console.log(err);
                            res.sendStatus(400);
                        });
                    }else{
                        res.sendStatus(400);
                    }
                }else{
                    res.sendStatus(404);
                }
            }).catch(err => {
                console.log(err)
                res.sendStatus(400);
            });
        }else{
            res.sendStatus(400);
        }
});

router.put("/produto/:id", (req, res) => {
    var id = req.params.id;
    
    if(id != undefined){
        if(!isNaN(id)){
            Produto.findAll({where: {id: id}}).then(response => {
                if(response == ""){
                    res.sendStatus(404);
            
                }
                var {nome, quantidade, kg, preco} = req.body;
                if(nome != undefined && quantidade != undefined && kg != undefined && preco != undefined){
                    Produto.update({name: nome, slug: slugify(nome), quantity: quantidade, kg: kg, amount: preco},
                        {where: {
                            id: id
                        }
                    }).then(() => {
                         res.sendStatus(200);
                       
                    }).catch(err => {
                        console.log(err);
                        res.sendStatus(400);
                    });
                }else{
                    res.sendStatus(400);
                }
            }).catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
        }else{
            res.sendStatus(400);
        }
    }else{
        res.sendStatus(400);
    }
});


router.delete("/produto/:id", (req, res) => {
    var id = req.params.id;
    if(id != undefined){
        if(!isNaN(id)){
            Produto.destroy({ where: {id: id}}).then(response => {
                if(response == ""){
                    res.sendStatus(404);
                }
                res.sendStatus(200);
            }).catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
        }else{
            res.sendStatus(400);
        }
    }else{
        res.sendStatus(400);
    }
});

module.exports = router;