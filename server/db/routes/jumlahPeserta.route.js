module.exports = app => {
    const jumlahPeserta = require("../controllers/jumlahPeserta.controller");

    var router = require('express').Router();

    router.post("/", jumlahPeserta.create);

    router.get("/", jumlahPeserta.findAll);

    router.put("/", jumlahPeserta.updateJumlah);

    router.get("/:klasis", jumlahPeserta.findOne);

    router.delete("/", jumlahPeserta.deleteAll);

    app.use('/api/jumlahPeserta/', router);
}