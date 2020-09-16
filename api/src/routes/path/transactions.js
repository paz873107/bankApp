const estaAutenticado = require("../../Suppliers/authenticateFunction")
const server = require("express").Router();
const { Op } = require("sequelize");
const { User, Transaction, Wallet } = require("../../db.js");


server.post("/to/:idTo", estaAutenticado, async (req, res) => {
    const { idTo } = req.params
    const { transaction } = req.body
    const { id } = req.user

    //-------------------------------------------
    //              DECLARACIONES               |
    let nuevoSaldo;
    const userFrom = await User.findByPk(id)
    const userTo = await User.findByPk(idTo)
    const userfromWallet = await userFrom.getWallet()
    //-------------------------------------------
    //                PARSEOS                   |
    const floatTransaction = parseFloat(transaction) // convierto el numero a decimal
    const floatBalance = parseFloat(userfromWallet.dataValues.balance)
    //-------------------------------------------


    if(id === Number(idTo)) res.send('los usuarios son iguales')
    else if(!userFrom) res.send('usuario from inexistente')
    else if(!userTo) res.send('usuario to inexistente')
    else if(!floatTransaction) res.send('transaccion invalida')
    else if(!(floatTransaction > 100)) res.send('la transaccion debe ser de un monto minimo de 100$')
    else if(!(floatBalance > floatTransaction)) res.send('saldo insuficiente')      
    
    //-----------------------------------
    //     SI PASA TODOS LOS FILTROS
    //-----------------------------------
    else {
        Transaction.create({debit:id, deposit: idTo, value: floatTransaction})
            //  usuario FROM
            .then(() => userFrom.getWallet()) // cuando lo encuentro busco su billetera
            .then(async ()=> {
                nuevoSaldo = await userfromWallet.update({ // descuento el saldo de la transaccion
                    balance:(parseFloat(userfromWallet.dataValues.balance) - floatTransaction)
                })})

            //  usuario TO
            .then(() => userTo.getWallet()) // cuando lo encuentro busco su billetera
            .then(wallet => wallet.update({ // acredito el saldo de la transaccion
                balance:(parseFloat(wallet.dataValues.balance) + floatTransaction)
                }))
            .then(() => res.send(nuevoSaldo.dataValues)) // envio el saldo actual del usuario
            // ----------- ERRORES ----------------//
            .catch(err => res.send(err))}
})

// AGREGAR DINERO A LA BILLETERA
server.put('/recarge/wallet', estaAutenticado, async (req, res) => {
    const { balance } = req.body
    const { id } = req.user

    const user = await User.findByPk(id)
    
    if(!user) res.send('el usuario no existe')

    else {
        Transaction.create({ deposit: id, value: balance, transactions_type: 'recarga billetera' })
            .then(() => user.getWallet())
            .then(wallet => {
                wallet.update({
                    balance: balance + parseFloat(wallet.dataValues.balance)
                })
            .then((actualizo) => {
                res.send(actualizo 
                    ? `se agregaron ${balance}$ a tu billetera`
                    : 'no se actualizo')
            })
        })
    }
})

// TRAER TODAS LAS TRANSFERENCIAS DEL USUARIO
server.get('/get', estaAutenticado, (req, res) => {
    const { id } = req.user;

    Transaction.findAll({
        where: {
            [Op.or]:[
                {debit: id },
                {deposit: id }
            ]
        }
    })
        .then(transactions=>res.send(transactions))
        .catch(err=>res.send(err))
})

module.exports = server;