const chai     = require('chai'),
      chaiHttp = require('chai-http'),
      faker    = require('faker'),
      mongoose = require('mongoose');

const should = chai.should();
const expect = chai.expect;

const { User } = require('models/user');

const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL }           = require('config/database');

chai.use(chaiHttp);

// Seeds database with random users
function seedUserData() {
    console.log('Seeding user data');
    // const seedData = [];

    // for (let i = 0; i < 10; i++) {
    //     seedData.push(generateUserData());
    // }
    let pwdA;
    return User.hashPassword('password')
        .then(password => {
            pwdA = password;
            return User.hashPassword('12345678')
        })
        .then(pwdB => {
            const seedData = [
                {
                    username: 'testA',
                    password: pwdA,
                    email: 'testA@example.com'
                },
                {
                    username: 'userB',
                    password: pwdB,
                    email: 'userB@example.com'
                }
            ];
            User.insertMany(seedData);
        })
}

// User.create({
//     username: 'test',
//     password,
//     email: 'test@example.com'
// })

// generates data for fake user accounts
// function generateUserData() {
//     let username = faker.internet.userName(),
//         password = User.hashPassword(faker.internet.password()),
//         email    = faker.internet.email();
//     return {
//         username,
//         email,
//         password
//     };    
// }


// tears down db after each test completes
function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}
  

describe('Droned /users API resource', function() {



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
        // return tearDownDb();
    });

    // Runs once after all tetsts have finished to 
    // shut down server
    after(function() {
        return closeServer();
    });

    // GET -- READ
    describe('GET endpoints', function() {

        it('should return all users', function() {
            // strategy:
            //    1. get back all users returned by by GET request to `/users`
            //    2. prove res has right status, data type
            //    3. prove the number of users we get back is equal to number
            //       in db
            let res;
            return chai.request(app)
                .get('/users')
                .then(function(_res) {
                    res = _res;
                    res.should.have.status(200);
                    console.log('\n\n\n\n USERS', res.body.users);
                    res.body.users.should.have.length.of.at.least(1);
                    return User.count();
                })
                .then(function(count) {
                    res.body.users.should.have.lengthOf(count);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                    const res = err.response;
                    expect(res).to.have.status(401);
                });
        });

        it('should return user info when logged in to session', function() {
            // strategy
            //   1. Log 'testA' user in to session
            //   2. make a GET request to '/users/me'
            //   3. make sure res user object is the same
            // const agent = chai.request.agent(app);
            // return agent
            //     .post('/users/login')
            //     .auth('testA', 'password')
            //     .then((res) => {
            //         console.log('LOGIN res:', res.body);
            //         return agent.get('/users/me')
            //             .then(res => {
            //                 console.log('\n\n\n /users/me RES:', res.body);
            //                 res.should.have.status(200);
            //                 res.body.should.be.json;
            //             })
            //     })
            //     .catch(err => {
            //         if (err instanceof chai.AssertionError) {
            //             throw err;
            //         }
            //         const res = err.response;
            //         expect(res).to.have.status(401);
            //     });
        });
    });

    // POST -- CREATE
    describe('POST endpoints', function() {

        const username = "mike",
              password = "password",
              email    = "mike@example.com";
     
        // Create New User
        it('should create a new user', function() {
            // strategy:
            //    1. create a new user and make POST req to '/users'
            //    2. prove res has right status and same usersame / email
            //    3. prove the user exists in the db

            let res;
            return chai.request(app)
                .post('/users')
                .send({
                    username,
                    email,
                    password
                })
                .then(function(_res) {
                    res = _res;
                    console.log(res.body);
                    res.should.be.json;
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.include.keys(
                        'id', 'email', 'username', 'password'
                    );
                    res.body.email.should.equal(email);
                    res.body.username.should.equal(username);
                    return User.findById(res.body.id).exec()
                })
                .then(user => {
                    user.username.should.equal(res.body.username);
                    user.email.should.equal(res.body.email);
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                    const res = err.response;
                    expect(res).to.have.status(401);
                });
        });

        // Log User In
        it('should log user in', function() {
            
            return chai.request.agent(app)
                .post('/users/login')
                .auth('testA', 'password')
                .then(function(res) {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.status.should.equal(true);
                    res.body.message.should.equal('success');
                })
                .catch(err => {
                    if (err instanceof chai.AssertionError) {
                        throw err;
                    }
                    const res = err.response;
                    expect(res).to.have.status(401);
                });
        });
    });

});
