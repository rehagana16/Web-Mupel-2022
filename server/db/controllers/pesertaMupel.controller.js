/** LIST OPERATIONS 
 *  ->CREATE
 *  ->FINDALL
 *  ->DELETE
 *  ->DELETEALL
*/

const db = require('../models');
const PesertaMupel = db.pesertaMupels;
const Op = db.Sequelize.Op;
const {cloudinary} = require('../../util/cloudinary');

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
        klasis: req.body.klasis,
        pesertaId: req.body.pesertaId, 
        runggun: req.body.runggun,
        jenisKelamin: req.body.jenisKelamin,
        noTelp: req.body.noTelp,
        utusan: req.body.utusan,
        status: req.body.status,
        foto: req.body.foto, 
        isConfirmed: req.body.isConfirmed,
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
    const nama = req.query.klasis;
    var condition = nama ? {klasis: { [Op.like] : `%${nama}%`}} : null;

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

exports.updatePesertaId = (req, res) => {
    const id = req.body.id;
    const pesertaId = req.body.pesertaId;
    PesertaMupel.update({"pesertaId": pesertaId}, {
        where: {
            id : id,
        }
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || " Some error occured"
        });
    });
}

exports.upload = async (req, res) => {
    try{
        const fileStr = req.body.data;
        const uploadedResponse = await cloudinary.uploader
            .upload(fileStr, {
                upload_preset: 'ml_default'
            })
        console.log(uploadedResponse);
        res.json(uploadedResponse);
    } catch(error) {
        console.log("ERROR UPLOAD");
        console.error(error);
        res.status(500).json({err:"something went wrong"})
    }
}

