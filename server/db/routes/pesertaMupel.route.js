/** LIST OPERATIONS 
 *  ->CREATE
 *  ->FINDALL
 *  ->DELETE
 *  ->DELETEALL
*/

module.exports = app => {
    const pesertaMupel = require("../controllers/pesertaMupel.controller");

    var router = require('express').Router();

    //Create peserta 
    router.post("/", pesertaMupel.create);

    //Find All corresponding peserta 
    router.get("/", pesertaMupel.findAll);

    //Delete corresponding peserta 
    router.delete("/:id", pesertaMupel.delete);

    //Delete all peserta 
    router.delete("/", pesertaMupel.deleteAll);

    router.put("/updatePesertaId", pesertaMupel.updatePesertaId);

    router.post("/upload", pesertaMupel.upload)

    app.use('/api/pesertaMupels', router);
}