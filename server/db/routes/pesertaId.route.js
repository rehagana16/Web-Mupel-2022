module.exports = app => {
    const pesertaId = require("../controllers/pesertaId.controller");

    var router = require("express").Router();

    router.get("/", pesertaId.findAll);

    router.post("/", pesertaId.write);

    app.use('/api/pesertaId', router);
}