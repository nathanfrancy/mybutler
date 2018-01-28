# mybutler

When all you need is simple mysql queries to get it done.

## Setup

Refer to the `samples` file for some examples. Otherwise this is basically all you need to get started: 

```javascript
let MyButler = require('mybutler');

let butler = MyButler({
    connection: {
        host: '',
        user: '',
        password: '',
        database: ''
    },
    tables: [
        "table1", "table2"
    ],
    log: true
});
```

## Usage
You can do this differently, but I new up the object above in a separate file, then require it to other places I want to use it, and use the helper methods like this: 

```javascript
let butler = require('./path/to/butler');
butler.table1.insert(...)...
butler.table2.getOneWhere(...)...
```

## API
TODO: update readme api.

### insert

### getById

### getByUniqueField

### getAllByField

### getWhere

### getCountWhere

### getOneWhere

### insert

### updateWhere

### deleteWhere