const assert = require('assert');
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;

const queriesBuilder = require('./../src/v1/repositories/queries-builder')();

describe('Queries builder', () => {
    it('should build correct query for finding client details by id', () => {
        const givenId = '123456789012';
        const expectedQuery = {_id: new ObjectId(givenId)};
        const actualQuery = queriesBuilder.getByIdQuery(givenId);
        assert.deepEqual(actualQuery, expectedQuery);
    });
});