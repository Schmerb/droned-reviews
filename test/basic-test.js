const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

const {app} = require('../server');

chai.use(chaiHttp);

// describe('Testflight API resource', function() {
//     before(function() {

//     });

//     beforeEach(function() {

//     });

//     afterEach(function() {

//     });

//     after(function() {

//     });
// });

describe('GET endpoint', function() {

    it('should return success status code', function() {
        return chai.request(app)
            .get('/')
            .then(function(res) {
                res.should.have.status(200);
            })
    });
});