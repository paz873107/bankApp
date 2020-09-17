const { Router } = require("express");

//----------------------------------------------------------------------------//
//---------------------------MODULES-IMPORTS----------------------------------//
//----------------------------------------------------------------------------//
const transactionsPath = require("./path/transactions")
const userPath = require("./path/user")
const addPath = require("./path/add")
const authUserPath = require("./path/auth")
const emailPath = require("./path/email")

//----------------------------------------------------------------------------//
//---------------------------MODULES-IMPORTS----------------------------------//
//-------------------------------API-REST-------------------------------------//
//----------------------------------------------------------------------------//
const apiLocationPath = require("./api/location")

//----------------------------------------------------------------------------//
//-----------------------MIDDLEWARES-FUNCIONAL--------------------------------//
//----------------------------------------------------------------------------//
const router = Router();

//----------------------------------------------------------------------------//
//-----------------------MIDDLEWARES-ROUTES-----------------------------------//
//----------------------------------------------------------------------------//

router.use('/user/auth', authUserPath)
router.use('/user', userPath)
router.use('/add', addPath)
router.use('/transactions', transactionsPath)
router.use('/email', emailPath)

//--------API-Rest----------//

router.use('/api/location', apiLocationPath)

//-------------------------//

module.exports = router;