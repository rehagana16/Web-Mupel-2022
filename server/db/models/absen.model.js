module.exports = (sequelize, Sequelize) => {
    const absen = sequelize.define("absen", {
        pesertaId: {
            type: Sequelize.STRING,
            primaryKey: true
        }, 
        password:{
            type: Sequelize.STRING,
        },
        jumatMalam: {
            type: Sequelize.BOOLEAN,
        }, 
        sabtuPagi: {
            type: Sequelize.BOOLEAN,
        }, 
        sabtuSiang: {
            type: Sequelize.BOOLEAN,
        }, 
        sabtuMalam: {
            type: Sequelize.BOOLEAN,
        }, 
        mingguPagi: {
            type: Sequelize.BOOLEAN,
        }, 
        mingguSiang: {
            type: Sequelize.BOOLEAN,
        },
        paripurna12: {
            type: Sequelize.BOOLEAN,
        }, 
        paripurna3: {
            type: Sequelize.BOOLEAN,
        }, 
        sidangKomisi: {
            type: Sequelize.STRING,
        }, 
        paripurna4: {
            type: Sequelize.BOOLEAN,
        }, 
        paripurna5: {
            type: Sequelize.BOOLEAN,
        },  
    });

    return absen;
};