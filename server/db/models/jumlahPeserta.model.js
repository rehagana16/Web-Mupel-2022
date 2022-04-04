module.exports = (sequelize, Sequelize) => {
    const jumlahPeserta = sequelize.define("jumlahPeserta", {
        klasis: {
            type: Sequelize.STRING,
            allowNull: false
        },
        jumlahPeserta: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    return jumlahPeserta;
};