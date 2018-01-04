const assert = require('assert');
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;
const request = require('supertest');
const nock = require('nock');

require('dotenv').config();

const {
    MONGODB_URI,
    MONGO_HOST = 'localhost',
    MONGO_PORT = '27017',
    DB_NAME = 'iosr2017-orders',
    PORT = '3001',
    MENU_SERVICE_URL = 'menu-service'
} = process.env;

const MongoClient = require('mongodb').MongoClient;
const mongoUrl = createMongoUrl();

function createMongoUrl() {
    const customUrl = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`
    return MONGODB_URI || customUrl;
}

describe('New orders', () => {
  let app;
  let mongodb;
  before(function (done) {
    MongoClient.connect(mongoUrl)
        .then(result => {
            app = require('../../src/app')(result);
            mongodb = result;
            done();
        })
        .catch(error => {
            done(error);
        });
  });

  after(function() {
    mongodb.close();
  });


  describe('Order with unexisting menu item', () => {
    const menuItemId = 1
    const getMenuByIdUrl = `http://${MENU_SERVICE_URL}/v1/menu/items/${menuItemId}`;
    beforeEach(function(){
        nock(`http://${MENU_SERVICE_URL}`).get(`/v1/menu/items/${menuItemId}`).reply(200, []);
    });
    it('fails',  (done) => {
      request(app).post("/v1/orders/").expect(400).end(function(err, res){
        if(err) return done(err);
        assert(res.body.message, 'New order details cannot be empty and have to contain id of the menu item to place the order.')
        done();
      });
    });
  });
});