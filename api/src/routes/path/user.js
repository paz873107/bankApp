const server = require("express").Router();
/* const bcrypt = require("bcryptjs"); */
/* const passport = require("passport"); */
/* const LocalStrategy = require("passport-local").Strategy; */
const { User, Wallet } = require("../../db.js");

server.post('/login', (req, res) => {

    res.send('hola')
})

server.post('/register', (req, res) => {
    const { //me traigo todos los valores del usuario
        firstName, 
        lastName,
        email,
        documentType,
        documentNumber,
        birth,
        phoneNumber,
        password,
        access
    } = req.body;

    User.create({
        firstName, 
        lastName,
        email,
        documentType,
        documentNumber,
        birth,
        phoneNumber,
        password,
        access
    })
        .then(user => {
            console.log(user.dataValues)
            /* user.setWallet().then(
                wallet => console.log(wallet),
                err => {
                    console.log('estoy en el error')
                    res.send(err)
                }
            ) */
            res.send(user)
        })
        .catch(err => {
            if(err.parent && err.parent.code === "23505") res.send('el usuario ya existe')
            res.send(err)
        })
})

module.exports = server;