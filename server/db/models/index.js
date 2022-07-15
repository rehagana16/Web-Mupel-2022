const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize')

let rawData = fs.readFileSync(path.resolve(__dirname, '../config/config.json'))
let dbConfig = JSON.parse(rawData)

let dbTest = dbConfig.test
let dbDev = dbConfig.development

const sequelize = new Sequelize (dbTest.database, dbTest.username, dbTest.password, {
    host : dbTest.host,
    dialect : dbTest.dialect,
    operatorsAliases : false,

});

// const sequelize = new Sequelize (dbDev.database, dbDev.username, dbDev.password, {
//     host : dbDev.host,
//     dialect : dbDev.dialect,
//     operatorsAliases : false,
// });


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pesertaMupels = require('./pesertaMupel.model.js')(sequelize, Sequelize);
db.accounts = require('./account.model.js')(sequelize, Sequelize);
db.jumlahPeserta = require('./jumlahPeserta.model')(sequelize, Sequelize);
db.absen = require('./absen.model')(sequelize,Sequelize);

db.pesertaMupels.hasOne(db.absen, {
    foreignKey: 'pesertaId'
});
db.absen.belongsTo(db.pesertaMupels);

module.exports = db;