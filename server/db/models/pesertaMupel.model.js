module.exports = (sequelize, Sequelize) => {
    const pesertaMupel = sequelize.define("pesertaMupel", {
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        klasis: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        pesertaId: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        runggun: {
            type: Sequelize.STRING,
            allowNull: false
        },
        jenisKelamin: {
            type: Sequelize.STRING,
            allowNull: false
        },
        noTelp: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        utusan: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        foto: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        isConfirmed: {
            type: Sequelize.BOOLEAN,
            allowNull:false
        },
    });

    return pesertaMupel;
};