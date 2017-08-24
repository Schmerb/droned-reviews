const chai     = require('chai'),
      chaiHttp = require('chai-http'),
      faker    = require('faker'),
      mongoose = require('mongoose'),
      fs       = require('fs');

const should = chai.should();
const expect = chai.expect;

const {User} = require('../models/user');

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config/database');

chai.use(chaiHttp);

function seedDataBase() {

}

// tears down db after each test completes
function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
  }
  


describe('Droned /file API resource', function() {
    
    
    
        // Runs once before all tests begin
        // to start server
        before(function() {
            return runServer(TEST_DATABASE_URL);
        });
    
        // Runs before each and every test to seed database
        // with fresh data
        beforeEach(function() {
            return seedDataBase();
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

         // POST -- CREATE
        describe('POST endpoints', function() {
            it('should upload a file', function() {
                let fileName = 'typhoonh-compressor.png';
                chai.request(app)
                    .post('/file/img')
                    .attach('file', fs.readFileSync(__dirname + '/../public/assets/drones/' + fileName), fileName)
                    .then(res => {
                        console.log('\n\n\nFILEE\n\n\n\n', res.body.file);
                        res.should.have.status(201);
                        res.body.should.be.json;
                        res.body.name.should.equal(fileName);
                    })
            });
        });
});    