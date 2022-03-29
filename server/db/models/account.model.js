module.exports = (sequelize, Sequelize) => {
    const account = sequelize.define("account", {
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        klasis: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return account;
};