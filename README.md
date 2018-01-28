# my(sql)butler 🕴️

When all you need is simple mysql queries to get it done.

## Install 

``` bash
npm install --save mybutler
```

## Setup

If you don't already, you'll need to install mysql and create your database and tables.

Refer to the `samples` folder for some examples. Otherwise this is basically all you need to get started: 

```javascript
let MyButler = require('mybutler');

let butler = MyButler({
    connection: {           // Put your connection variables here.
        host: '',
        user: '',
        password: '',
        database: ''
    },
    tables: [               // Put all of the tables you want access to here
        "users", 
        "user_logs"
    ],
    log: true,              // Optionally, turn mybutler's internal logging on
    logger: console.log     // Optionally, replace the logging function, this only applies if you have set "log" to true
});
```

## Usage
You can do this differently, but I new up the object above in a separate file, then require it to other places I want to use it, and use the helper methods like this: 

```javascript
let butler = require('./path/to/butler');

// Each table is namespaced by the name you gave in the config.
butler.users.insert(...)...
butler.user_logs.getOneWhere(...)...
```

## API
Call methods om the api like so: `butler.users.methodName`. All methods return a promise, and you can access the data you're expecting to come back in: `.then(function(data) {...})`.

### insert(data)
Inserts a record

| Parameter | Type |
| --- | --- |
| data | object |

```javascript
butler.users.insert({
    name: "Alfred Pennyworth",
    email: "alfred@waynemanor.com",
    status: 1,
    title: "Butler"
}).then...
```

### getById
Gets a record by the 'id' value. Uses `getByUniqueField` internally, so if you need to use a different field, use that instead.

| Parameter | Type |
| --- | --- |
| id | string or int |

```javascript
butler.users.getById(3454).then...
```

### getByUniqueField
Gets a single record by a unique field. Using this on a non-unique field is not recommended and may give unexpected results.

| Parameter | Type |
| --- | --- |
| field | string |
| value | string |

```javascript
butler.users.getByUniqueField("email", "alfred@waynemanor.com").then...
```

### getAllByField
Gets all records with a single matching field.

| Parameter | Type |
| --- | --- |
| field | string |
| value | string |

```javascript
butler.users.getByUniqueField("title", "Butler").then...
```

### getWhere
Like `getAllByField`, but you can include an object to match multiple fields, and will return all that match.

| Parameter | Type |
| --- | --- |
| data | object |

```javascript
butler.users.getWhere({
    title: "Butler"
}).then...
```

### getOneWhere
Like `getWhere`, but will return a single result instead of an array.

| Parameter | Type |
| --- | --- |
| data | object |

```javascript
butler.users.getOneWhere({
    title: "Butler",
    status: 1
}).then...
```

### getCountWhere
Gets the number of rows that match

| Parameter | Type |
| --- | --- |
| data | object |

```javascript
butler.users.getCountWhere({
    title: "Butler",
    status: 1
}).then...
```

### updateWhere
Updates a record where, given a set of fields match

| Parameter | Type | |
| --- | --- | --- |
| updatedFields | object | Fields to be updated |
| whereFields | object | Fields to match |

```javascript
butler.users.updateWhere(
    { status: 2 },
    { email: "alfred@waynemanor.com"} 
).then...
```

### deleteWhere
Deletes a record where, given a set of fields match. If you don't pass in a valid object of fields to match, this function will return `Promise.resolve()` and will not delete anything. If you want to delete all the rows in the table use `deleteAll` instead.

| Parameter | Type | |
| --- | --- | --- |
| whereFields | object | Fields to match |

```javascript
butler.users.deleteWhere(
    { email: "alfred@waynemanor.com" }
).then...
```

### deleteAll
Deletes all records in the table. Obviously, be careful with this one. :)

```javascript
butler.user_logs.deleteAll().then...
```