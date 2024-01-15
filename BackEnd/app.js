const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Sequelize} = require('sequelize');

const attendanceRoute = require('./Routes/attendanceRoute.js');

const sequelize = require('./util/db.js');
const StudentModel = require('./model/student.js');
const DateModel = require('./model/date.js');
const AttendanceModel = require('./model/attendance.js');
//--------------------------------------------------
const app = express();

app.use(cors());

app.use(bodyParser.json({extended:false}));



app.use('/attendance', attendanceRoute);

//-------------------------------------------------
AttendanceModel.belongsTo(StudentModel);
AttendanceModel.belongsTo(DateModel);
StudentModel.belongsToMany(DateModel, {through:AttendanceModel});
DateModel.belongsToMany(StudentModel, {through:AttendanceModel});


sequelize
    // .sync({force:true})
    .sync()
    .then(result=>{
        app.listen(9000);
    })
    .catch(err=>console.error(err));

