/** LIST OPERATIONS 
 *  ->CREATE
 *  ->FINDALL
 *  ->DELETE
 *  ->DELETEALL
*/

const db = require('../models');
const jwt = require('jsonwebtoken')
const accessTokenSecret = "youraccesstokensecret";
const Absen = db.absen;
const Op = db.Sequelize.Op;

exports.findOne = (req,res) => {
    const username = req.body.pesertaId;
    const password = req.body.password;

    Absen.findOne({where: {username: username, password:password}})
        .then((data) => {
            const accessToken = jwt.sign({"klasis": data.klasis}, accessTokenSecret);
            res.send(accessToken);
        })
        .catch(err=> { //username salah
            console.log("ERROR")
            res.send(err.message)
        });
};
