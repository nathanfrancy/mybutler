let MyButler = require('./../lib'); //require('mybutler');

let butler = MyButler({
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test'
    },
    tables: [
        "user"
    ],
    log: true
});

butler.user.insert({
    email: "john@something.com",
    status: 1
}).then((user) => {
    butler.__log(user);
    return butler.user.getOneWhere({ email: user.email });
}).then((user) => {
    butler.__log(user);
    return butler.user.getAllByField("status", 1);
}).then((users) => {
    butler.__log(users);
    return butler.user.getCountWhere({ status: 1 });
}).then((count) => {
    butler.__log(`Count: ${count}`);
    return butler.user.updateWhere(
        { email: "joe@something.com" },
        { email: "john@something.com"});
}).then((result) => {
    butler.__log(`Affected rows: ${result.affectedRows}`);
    return butler.user.deleteWhere({ email: "joe@something.com" });
}).then((result) => {
    butler.__log(`Affected rows: ${result.affectedRows}`);
    process.exit();
}).catch((err) => {
    butler.__log(err);
    process.exit();
});