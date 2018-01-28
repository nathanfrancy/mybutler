let GenericFactory = require('./genericFactory'),
    mysql = require('mysql');

let MyButler = function(config) {
    this.__pool = mysql.createPool({
        host: config.connection.host,
        user: config.connection.user,
        password: config.connection.password,
        database: config.connection.database
    });

    // Initialize internal logger. User can pass in whether 
    // it will log and can provide own logger.
    this.__log = config.log ? config.logger || console.log : function(msg) {};
    this.__log(`Initializing tables... ${JSON.stringify(config.tables)}`);

    let tableTestPromises = [];

    for (table of config.tables) {
        this[table] = new GenericFactory(table, this.__pool);

        // Test that the table exists and can query from it.
        tableTestPromises.push(
            this[table].test()
                .then((table) => {
                    this.__log(`+ "${table}" table initialized`);
                })
                .catch((err) => {
                    this.__log(`! ${err.message}`);
                })
        );
    }

    Promise.all(tableTestPromises).then(() => {
        this.__log(`\nTables initialized.`);
        this.__log(`================================\n`);
    }).catch((err) => {
        this.__log(err);
    });

    return this;
};

module.exports = MyButler;