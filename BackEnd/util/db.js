const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('attendanceTracker','root','Salman@121',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;