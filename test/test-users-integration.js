const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const {User} = require('../models/users');

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config/database');

chai.use(chaiHttp);

// tears down db after each test completes
function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
  }
  

describe('Droned /Comments API resource', function() {
    
        // Runs once before all tests begin
        // to start server
        before(function() {
          return runServer(TEST_DATABASE_URL);
        });
    
        // Runs before each and every test to seed database
        // with fresh data
        beforeEach(function() {
          return seedUserData()
        });
    
        // Runs after each and every test to clear database
        afterEach(function() {
          return tearDownDb();
        });
    
        // Runs once after all tetsts have finished to 
        // shut down server
        after(function() {
          return closeServer();
        });
    
        // GET -- READ
        describe('GET endpoints', function() {

        });

});