const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {auth, jwtSecret} = require('../middleware/auth');

router.get("/usuarios", auth, (req, res) => {
    Usuario.findAll({raw: true, order: [ ["id", "DESC"] ]}).then(response =>{
        res.sendStatus = 200;
        res.json(response);
    }).catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
});

router.post("/usuario", auth, (req, res) => {
    var email = req.body.email;
    var senha = req.body.senha;

    Usuario.findOne({
        where:{
            email: email
        }
    }).then(usuario => {
        if(usuario == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(senha, salt);

            Usuario.create({
                
                email: email,
                senha: hash

            }).then(() => {
                res.json(usuario);
                res.sendStatus = 200;
            }).catch((err) => {
                console.log(err);
                res.sendStatus(400);
            })
        }
        else{
            res.sendStatus(400);
        }
    }).catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
});

router.delete("/usuario/:id", auth, (req, res) => {
    var id = req.params.id;
    if(id != undefined){
        if(!isNaN(id)){
            Usuario.findOne({where: {
                id: id
            }}).then(response => {
                if(response == null || response == undefined){
                    res.sendStatus(404);
                }
                Usuario.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    res.sendStatus(200);
                }).catch(err => {
                    res.sendStatus(400);
                });
            }).catch(err => {
                res.sendStatus(400);
            })
        } else{
        res.sendStatus(400);
        }
    } else{
        res.sendStatus(400);
    }
});

router.post("/usuario/login", (req, res) => {
    var email = req.body.email;
    var senha = req.body.senha;

    Usuario.findOne({
        where: {
            email: email
        }
    }).then(usuario => {
        if(usuario != undefined){
          
            var correta = bcrypt.compareSync(senha, usuario.senha); 


            if(correta){

                jwt.sign({id: usuario.id, email: usuario.email}, jwtSecret, {expiresIn: '48h'}, (err, token) => {
                    if(err){
                        res.sendStatus(400);
                    }else{    
                        res.status(200);
                        res.json({token: token});
                    }
                });
                

            }else{
                res.sendStatus(404);
            }

        }else{
            res.sendStatus(400);
        }
    }).catch(err => {
        console.log(err);
        res.sendStatus(404);
    });
});


module.exports = router;