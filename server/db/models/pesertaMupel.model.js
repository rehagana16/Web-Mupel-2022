module.exports = (sequelize, Sequelize) => {
    const pesertaMupel = sequelize.define("pesertaMupel", {
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        runggun: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bidang: {
            type: Sequelize.STRING,
            allowNull: false
        },
        jenisKelamin: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        jabatan: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        foto: {
            type: Sequelize.STRING
        }
    });

    return pesertaMupel;
};