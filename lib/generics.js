let mysql = require('mysql');

let getConnection = module.exports.getConnection = (pool) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            else resolve(connection);
        });
    });
};

module.exports.test = (pool, table) => {
    return new Promise((resolve, reject) => {
        getConnection(pool).then((connection) => {
            connection.query(`SELECT 1 FROM ${table} limit 1`, function (error, results, fields) {
                connection.release();
                if (error) reject(error);
                else resolve(table);
            });
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports.getByField = (pool, table, field, value) => {
    return new Promise((resolve, reject) => {
        getConnection(pool).then((connection) => {
            connection.query(`SELECT * FROM ${table} WHERE ${field} = ?`, [value], function (error, results, fields) {
                connection.release();
                if (error) reject(error);
                else resolve(results);
            });
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports.getWhere = (pool, table, fields) => {
    let sql = "SELECT * FROM ?? ";
    let inserts = [table];
    let whereClauseTemplate = ` ?? = ? `;
    let wheres = [];

    Object.keys(fields).forEach((field) => {
        wheres.push(whereClauseTemplate);
        inserts.push(field, fields[field]);
    });

    if (wheres.length > 0)
        sql = `${sql} WHERE ${wheres.join(' AND ')}`;
    sql = mysql.format(sql, inserts);

    return new Promise((resolve, reject) => {
        getConnection(pool).then((connection) => {
            connection.query(sql, function (error, results, fields) {
                connection.release();
                if (error) reject(error);
                else resolve(results);
            });
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports.updateWhere = (pool, table, updatedFields, whereFields) => {
    let sql = "UPDATE ??";
    let inserts = [table];
    let whereClauseTemplate = ` ?? = ? `;
    let wheres = [];
    let updates = [];

    Object.keys(updatedFields).forEach((field) => {
        updates.push(whereClauseTemplate);
        inserts.push(field, updatedFields[field]);
    });
    if (updates.length > 0)
        sql = `${sql} SET ${updates.join(', ')} `;

    Object.keys(whereFields).forEach((field) => {
        wheres.push(whereClauseTemplate);
        inserts.push(field, whereFields[field]);
    });

    if (wheres.length > 0)
        sql = `${sql} WHERE ${wheres.join(' AND ')}`;
    sql = mysql.format(sql, inserts);

    return new Promise((resolve, reject) => {
        getConnection(pool).then((connection) => {
            connection.query(sql, function (error, results, fields) {
                connection.release();
                if (error) reject(error);
                else resolve(results);
            });
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports.insert = (pool, table, data) => {
    return new Promise((resolve, reject) => {
        getConnection(pool).then((connection) => {
            connection.query(`INSERT INTO ${table} SET ?`, data, function (error, results, fields) {
                connection.release();
                if (error) reject(error);
                else {
                    results.id = results.insertId;
                    resolve(results);
                }
            });
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports.deleteWhere = (pool, table, fields, deleteAllOverride = false) => {
    let sql = "DELETE FROM ?? ";
    let inserts = [table];
    let whereClauseTemplate = ` ?? = ? `;
    let wheres = [];

    Object.keys(fields).forEach((field) => {
        wheres.push(whereClauseTemplate);
        inserts.push(field, fields[field]);
    });

    if (wheres.length > 0)
        sql = `${sql} WHERE ${wheres.join(' AND ')}`;
    // Don't allow delete all unless pass in override
    else if (!deleteAllOverride) return Promise.resolve();
    sql = mysql.format(sql, inserts);

    return new Promise((resolve, reject) => {
        getConnection(pool).then((connection) => {
            connection.query(sql, function (error, results, fields) {
                connection.release();
                if (error) reject(error);
                else resolve(results);
            });
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports.getCountWhere = (pool, table, fields) => {
    let sql = "SELECT COUNT(id) as numberrows FROM ?? ";
    let inserts = [table];
    let whereClauseTemplate = ` ?? = ? `;
    let wheres = [];

    Object.keys(fields).forEach((field) => {
        wheres.push(whereClauseTemplate);
        inserts.push(field, fields[field]);
    });

    if (wheres.length > 0)
        sql = `${sql} WHERE ${wheres.join(' AND ')}`;
    sql = mysql.format(sql, inserts);

    return new Promise((resolve, reject) => {
        getConnection(pool).then((connection) => {
            connection.query(sql, function (error, results, fields) {
                connection.release();
                if (error) reject(error);
                else resolve(results[0].numberrows);
            });
        }).catch((err) => {
            reject(err);
        });
    });
};