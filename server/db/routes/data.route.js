const dataKlasis = require("../data/data.klasis");

module.exports = app => {

    var router = require('express').Router();

    // //Create peserta 
    // router.post("/", pesertaMupel.create);

    //Find All corresponding peserta 
    router.get("/klasis", (req,res) => {
        res.json(dataKlasis);
    });

    // //Delete corresponding peserta 
    // router.delete("/:nama", pesertaMupel.delete);

    // //Delete all peserta 
    // router.delete("/", pesertaMupel.deleteAll);

    // router.update("/uploadPesertaId", pesertaMupel.updatePesertaId);

    // router.post("/upload", pesertaMupel.upload)

    app.use('/api/data', router);
}