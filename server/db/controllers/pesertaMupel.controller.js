/** LIST OPERATIONS 
 *  ->CREATE
 *  ->FINDALL
 *  ->DELETE
 *  ->DELETEALL
*/

const db = require('../models');
const PesertaMupel = db.pesertaMupels;
const Op = db.Sequelize.Op;

exports.create = (req,res) => {
    if(!req.body.nama) { 
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    //create peserta mupel 
    const pesertaMupel = {
        nama: req.body.nama,
        runggun: req.body.runggun,
        klasis: req.body.klasis, 
        bidang: req.body.bidang,
        jenisKelamin: req.body.jenisKelamin,
        jabatan: req.body.jabatan,
        status: req.body.status,
        foto: req.body.foto
    };
    PesertaMupel.create(pesertaMupel)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occured"
            });
        });
    
};

exports.findAll = (req,res) => {
    const nama = req.query.nama;
    var condition = nama ? {nama: { [Op.like] : `%${nama}%`}} : null;

    PesertaMupel.findAll({where: condition})
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

exports.delete = (req,res) => {
    const nama = req.params.nama;

    PesertaMupel.destroy({
        where: {nama: nama}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    PesertaMupel.destroy({
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

