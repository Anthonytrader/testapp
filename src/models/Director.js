const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Director = sequelize.define('director', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    nationality: {
        type: DataTypes.STRING,
         allowNull: false
    },
    image: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
         allowNull: false
    }
});

module.exports = Director;