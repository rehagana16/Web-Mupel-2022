const db = require('../models');
const JumlahPeserta = db.jumlahPeserta;
const Op = db.Sequelize.Op;

exports.create = (req,res) => {
    if(!req.body.klasis) { 
        res.status(400).send({
            message: "content cannot be empty!"
        });
        return;
    }

    //create peserta mupel 
    const jumlahPeserta = {
        klasis: req.body.klasis,
        jumlahPeserta: 0,
    };
    JumlahPeserta.create(jumlahPeserta)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(jumlahPeserta);
            res.status(500).send({
                message: 
                    err.message || "Some error occured"
            });
        });
    
};

exports.findAll = (req,res) => {
    const nama = req.query.klasis;
    var condition = nama ? {nama: { [Op.like] : `%${nama}%`}} : null;

    JumlahPeserta.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || " Some error occured"
            });
        });
};

exports.updateJumlah = (req, res) => {
    const jumlahPeserta = req.body.jumlahPeserta;
    const klasis = req.body.klasis;
    JumlahPeserta.update({"jumlahPeserta": jumlahPeserta}, {
        where: {
            klasis : klasis,
        }
    })
    .then(data => {
        console.log("TEST");
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || " Some error occured"
        });
    });
}

exports.findOne = (req, res) => {
    console.log("TESTT")
    const klasis = req.params.klasis;

    JumlahPeserta.findOne({where : {klasis : klasis}})
    .then((data) => {
        console.log(data);
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || " Some error occured"
        });
    })
}

exports.deleteAll = (req, res) => {
    JumlahPeserta.destroy({
        where: {},
        truncate: true,
        restartIdentity: true,
    })
        .then(nums => {
            res.send({message: `${nums} Tutorials were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occured"
            });
        });
};