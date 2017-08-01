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
//
// Seeds database with random comment data
//
function seedCommentData() {
    console.log('Seeding review post comments data');
    const seedData = [];

    for (let i = 0; i < 10; i++) {
        // normal post comments
        seedData.push(generateCommentData());
    }
    return Comment.insertMany(seedData);
}

//
// Seeds database with random post data
//
function seedPostData() {
    console.log('Seeding random post data');
    const seedPostData = [];

    for (let i = 0; i < 10; i++) {
        // posts
        seedPostData.push(generatePostData());
    }
    return Post.insertMany(seedPostData);
}

//
// Seeds database with random comments for a specific post id
//
function seedCommentsForPostData(postId) {
    console.log(`Seeding comments for specific post, ${postId}`);
    const seedData = [];

    for (let i = 0; i < 10; i++) {
        seedData.push(generateCommentData(postId));
    }
    return Comment.insertMany(seedData);
}

//
// Seeds database with random reply comment data
//
function seedReplyCommentData(commentId) {
    console.log('Seeding reply comments data');
    const seedData = [];
     for (let i = 0; i < 10; i++) {
        // reply comments
        seedData.push(generateReplyCommentData(commentId));
     }
    console.log("INSERT MANY");
    return Comment.insertMany(seedData);
}

//
// generates mock review comment with random data
//
function generateCommentData(id = faker.random.uuid()) {
    // console.log(`Generating comments for, ${id}`);
    return {
        postId: id,
        content: faker.lorem.paragraph(),
        author: {
            username: faker.internet.email()
        }
    };
}

//
// generates mock reply comment with random data
//
function generateReplyCommentData(id = faker.random.uuid()) {
    return {
        commentId: id,
        content: faker.lorem.paragraph(),
        author: {
            username: faker.internet.email()
        }
    };
}

//
// generates mock review post with random data
//
function generatePostData() {
    return {
        title: faker.name.title(),
        drone: {
            make: faker.company.companyName(),
            model: faker.commerce.product()
        },
        content: faker.lorem.paragraph(),
        author: {
            username: faker.internet.email()
        },
        rating: faker.random.number()
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
            console.log('\n\n\n\n\n');
            let res;
            return chai.request(app)
                .get('/posts/comments')
                .then(function(_res) {
                    res = _res;
                    res.should.have.status(200);
                    res.body.comments.should.have.length.of.at.least(1);
                    return Comment.count();
                }) 
                .then(function(count) {
                    res.body.comments.should.have.lengthOf(count);
                })
        });

        it('should return comments for specific post ID', function() {
            // strategy:
            //    1. Create a post 
            //    2. Create comments with post id
            //    3. Get post from db and get its id
            //    4. make GET request to '/posts/:id/comments' to get 
            //       back comments associated with that id
            //    5. confirm a comment we get back has same postId as 
            //       Post id we fetched from db
            console.log('\n\n\n\n\n');
            let id;
            return seedPostData()
                .then(function() {
                    Post
                    .findOne()
                    .exec()
                    .then(function(post) {
                        id = post._id.toString();
                        console.log("id: ", id, typeof(id));
                        return seedCommentsForPostData(id)
                        //     .then(function() {
                        //     console.log("AFTER DB SEED", id);
                        //     return chai.request(app)
                        //         .get(`/posts/${id}/comments`)
                        //         .then(function(res) {
                        //             console.log('INSIDE GET REQ', res.body.comments[0]);
                        //             res.should.have.status(200);
                        //             res.body.comments[0].postId.should.equal(id);
                        //         });
                        // });
                    })
                    .then(function(){
                        console.log("THEN");
                    });
                });
        });
        
        // it('should return reply comments for a specific post comment ID', function() {
        //     // strategy:
        //     //   1. Get a random post comment's id
        //     //   2. make GET request to '/posts/comments/:id/comments'
        //     //      and get back reply comments associated with id
        //     //   3. confirm one of the reply comments returned has same
        //     //      comment id as post comment from db
        //     console.log('\n\n\n\n\n');
        //     Comment
        //         .findOne({}, {postId: 1})
        //         .exec()
        //         .then(function(comment) {
        //             let id = comment._id;
        //             return chai.request(app)
        //                 .get(`/posts/comments/${id}/comments`)
        //                 .then(function(res) {
        //                     res.status.should.be(200);
        //                 })
        //         })

        // });

    });
});