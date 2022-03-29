/** LIST OPERATIONS 
 *  ->CREATE
 *  ->FINDALL
 *  ->DELETE
 *  ->DELETEALL
*/

const db = require('../models');
const jwt = require('jsonwebtoken')
const accessTokenSecret = "youraccesstokensecret";
const Account = db.accounts;
const Op = db.Sequelize.Op;

exports.create = (req,res) => {
    if(!req.body.username) { 
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    //create peserta mupel 
    const account = {
        username: req.body.username,
        password: req.body.password,
        klasis: req.body.klasis
    };
    Account.create(account)
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
    const username = req.query.username;
    var condition = username ? {username: { [Op.like] : `%${username}%`}} : null;

    Account.findAll({where: condition})
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

exports.findOne = (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    Account.findOne({where: {username: username, password:password}})
        .then((data) => {
            const accessToken = jwt.sign({"klasis": data.klasis}, accessTokenSecret);
            res.send(accessToken);
        })
        .catch(err=> { //username salah
            console.log("ERROR")
            res.send(err.message)
        });
};

exports.delete = (req,res) => {
    const username = req.params.username;

    Account.destroy({
        where: {username: username}
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
    Account.destroy({
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

