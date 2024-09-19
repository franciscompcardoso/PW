const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");
const connect = require('../config/connect');

module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        //tipo: {
        //    type: Sequelize.TEXT
        //},
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nome:{
            type: Sequelize.STRING,
            notEmpty: true
            
        },
        apelido:{
            type: Sequelize.STRING,
            notEmpty: true
            
        }
        //last_login: {
        //    type: Sequelize.DATE
        //},
        //status: {
        //    type: Sequelize.ENUM('active', 'inactive'),
        //    defaultValue: 'active'
        //}
    });
    return User;
};

const path = require('path')



function read(req,res){
    const query = connect.con.query('SELECT * FROM users', function (err, rows,fields){
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
                console.log("Info" + query);
            }
        }
    });
}

function readUserInfo(req, res){
    const id = req.sanitize('email').escape();
    const post = {email: id};
    const query = connect.con.query ('SELECT email, nome, apelido FROM users where ?', post, function(err, rows, fields){
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
}

module.exports = {
    read: read,
    readUserInfo: readUserInfo
}