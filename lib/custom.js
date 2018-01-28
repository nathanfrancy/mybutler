let _log = require('comb').logger('na.dao.custom');
let mysql = require('mysql');
let db = require('./pool');
let tables = require('./../config/constants/db').tables;
let crypto = require('./../helpers/encryption');
let moment = require('moment');

let getConnection = module.exports.getConnection = async () => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            if (err) reject(err);
            else resolve(connection);
        });
    });
};