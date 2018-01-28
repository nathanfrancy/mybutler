let generics = require('./generics');

class GenericsFactory {
    constructor(table, pool) {
        this.table = table;
        this.pool = pool;
    }

    /**
     * Tests that the table exists.
     */
    test() {
        return generics.test(this.pool, this.table);
    }

    /**
     * Gets a resource by ID value.
     * @param id
     * @returns {Promise.<*|comb.Promise|Promise.<TResult>>}
     */
    getById(id) {
        return this.getByUniqueField('id', id);
    }

    /**
     * Gets a row by a unique field.
     * @param field
     * @param value
     * @returns {Promise.<*|comb.Promise|Promise.<TResult>>}
     */
    async getByUniqueField(field, value) {
        return generics.getByField(this.pool, this.table, field, value).then((results) => {
            if (!results || results.length === 0) return null;
            else return results[0];
        });
    }

    /**
     * Gets rows by matching field.
     * @param field
     * @param value
     * @returns {Promise.<void>}
     */
    getAllByField(field, value) {
        return generics.getByField(this.pool, this.table, field, value);
    }

    /**
     * Gets results based on fields
     * @param fields
     * @returns {Promise.<void>}
     */
    getWhere(fields) {
        return generics.getWhere(this.pool, this.table, fields);
    }

    /**
     * Gets the length of results based on criteria
     * @param fields
     * @returns {Promise.<void>}
     */
    getCountWhere(fields) {
        return generics.getCountWhere(this.pool, this.table, fields);
    }

    /**
     *
     * @param fields
     * @returns {Promise.<*|comb.Promise|Promise.<TResult>>}
     */
    getOneWhere(fields) {
        return this.getWhere(fields).then((rows) => {
            if (rows.length > 0) return rows[0];
            else return null;
        });
    }

    /**
     * Inserts data into the database.
     * @param data
     * @returns {Promise.<*|comb.Promise|Promise.<TResult>>}
     */
    insert(data) {
        return generics.insert(this.pool, this.table, data).then((results) => {
            return data;
        });
    }

    /**
     * Updates rows based on condition(s)
     * @param updatedFields
     * @param whereFields
     * @returns {Promise.<void>}
     */
    updateWhere(updatedFields, whereFields) {
        return generics.updateWhere(this.pool, this.table, updatedFields, whereFields);
    }

    /**
     * Deletes rows based on condition(s)
     * @param whereFields
     * @returns {Promise.<void>}
     */
    deleteWhere(whereFields) {
        return generics.deleteWhere(this.pool, this.table, whereFields);
    }
}

module.exports = GenericsFactory;