/** LIST OPERATIONS 
 *  ->CREATE
 *  ->FINDALL
 *  ->DELETE
 *  ->DELETEALL
*/

module.exports = app => {
    const account = require("../controllers/account.controller.js");

    var router = require('express').Router();

    //Create account
    router.post("/", account.create);

    //Find All corresponding account
    router.get("/", account.findAll);

    //Find one corresponding username
    router.post("/login", account.findOne);

    //Delete corresponding account 
    router.delete("/:username", account.delete);

    //Delete all account 
    router.delete("/", account.deleteAll);

    app.use('/api/account', router);
}