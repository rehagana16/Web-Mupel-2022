/** LIST OPERATIONS 
 *  ->CREATE
 *  ->FINDALL
 *  ->DELETE
 *  ->DELETEALL
*/

module.exports = app => {
    const account = require("../controllers/absen.controller.js");

    var router = require('express').Router();

    //Find one corresponding username
    router.post("/login", account.findOne);

    app.use('/api/absen', router);
}