const { DataTypes } = require('sequelize');
// Exportar una función que define el modelo
// Luego injectar la conexión a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('type', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, { timestamps: false });
};