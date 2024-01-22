const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Actor = sequelize.define('actor', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
lastname: {
    type: DataTypes.STRING,
    allowNull: false // Asumiendo que el apellido es obligatorio
},
nationality: {
    type: DataTypes.STRING, // Puedes ajustar el tipo de dato según tus necesidades
     allowNull: false 
},
image: {
    type: DataTypes.STRING, // Puedes ajustar el tipo de dato según tus necesidades (URL, ruta de archivo, etc.)
     allowNull: false
},
birthday: {
    type: DataTypes.STRING, // O DATEONLY, dependiendo de si quieres almacenar solo la fecha o fecha y hora
     allowNull: false 
}   
});

module.exports = Actor;