const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const {Comment} = require('../models/comments');
const {Post} = require('../models/posts')

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

// Seeds database with random review post data
function seedCommentData() {
    console.log('Seeding review post comments data');
    const seedData = [];

    for (let i = 0; i < 10; i++) {
        seedData.push(generateCommentData());
    }

    return Comment.insertMany(seedData);
}

// generates mock review comment with random data
function generateCommentData() {
    return {
        postId: faker.random.uuid(),
        content: faker.lorem.paragraph(),
        author: {
            username: faker.internet.email()
        }
    };
}

// tears down db after each test completes
function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

// Returns integer representation of date
// object (mongo stores dates as objects)
function normalizeDbDate(dbDate) {
    return dbDate.getTime();
}

// Returns integer representation of date
// string (response gives Date as string)
function normalizeResDate(resDate) {
    return Date.parse(resDate);
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
      return seedCommentData(); 
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

        it('should return all comments', function() {
            // strategy:
            //    1. get back all comments returned by by GET request to `/posts/comments`
            //    2. prove res has right status, data type
            //    3. prove the number of comments we got back is equal to number
            //       in db
            let res;
            return chai.request(app)
                .get('/posts/comments')
                .then(function(_res) {
                    res = _res;
                    res.should.have.status(200);
                    res.body.comments.should.have.length.of.at.least(1);
                    return Comment.count()
                }) 
                .then(function(count) {
                    res.body.comments.should.have.lengthOf(count);
                })
        });

        it('should return comments for specific post ID', function() {
            // strategy:
            //    1. Get a random posts  id
            //    2. get back comments associated with that id
            //    3. confirm a comment we get back has same postId as Post id we fetched from db
            Post
                .findOne()
                .exec()
                .then(function(post) {
                    return chai.request(app)
                        .get(`/posts/${post.postId}/comments`)
                        .then(function(res) {
                            res.should.have.status(200);
                            res.body.comments[0].postId.should.equal(post._id.toString());
                        })
                });
        });
    });
});
