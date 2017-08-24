const chai     = require('chai'),
      chaiHttp = require('chai-http'),
      faker    = require('faker'),
      mongoose = require('mongoose');

const should = chai.should();

const {Comment} = require('../models/comments');
const {Post} = require('../models/posts')

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config/database');

chai.use(chaiHttp);

let testId;

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
        },
        created: Date.now()
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
      return seedCommentData()
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
        });
        
        it('should return reply comments for a specific post comment ID', function() {
            // strategy:
            //   1. Get a random post comment's id
            //   2. make GET request to '/posts/comments/:id/comments'
            //      and get back reply comments associated with id
            //   3. confirm one of the reply comments returned has same
            //      comment id as post comment from db
            console.log('\n\n\n\n\n');
            Comment
                .findOne({}, {postId: 1})
                .exec()
                .then(function(comment) {
                    let id = comment._id;
                    return chai.request(app)
                        .get(`/posts/comments/${id}/comments`)
                        .then(function(res) {
                            res.should.have.status(200);
                            
                        })
                })

        });

    });

    // POST -- CREATE
    describe('POST endpoints', function() {

        it('should add a new comment', function() {
            // strategy:
            //   1. Create a new comment
            //   2. Make a POST request to '/posts/comments'
            //      and send new comment
            //   3. Check it returns proper respone
            //   4. lookup comment in db and compare to new comment

            let newComment = generateCommentData();
            let res;
            return chai.request(app)
                .post('/posts/comments')
                .send(newComment)
                .then(function(_res) {
                    res = _res;
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys(
                        'id', 'author', 'content', 'created', 'postId'
                    );
                    res.body.author.username.should.equal(newComment.author.username);
                    res.body.content.should.equal(newComment.content);
                    return Comment.findById(res.body.id).exec()
                })
                .then(function(comment) {
                    comment.author.username.should.equal(newComment.author.username);
                    comment.content.should.equal(newComment.content);
                    comment.id.should.equal(res.body.id);
                });
        });

    });

    describe('PUT endpoints', function() {

        it('should update comment', function() {
            // strategy:
            //   1. Get comment from db
            //   2. Update comment and send to db
            //   3. check proper response
            //   4. look up comment in db to confirm changes
            let updateComment = {
                content: "Updated comment!",
                likes: 20
            };
            return Comment
                .findOne()
                .exec()
                .then(function(comment) {
                    updateComment.id = comment.id;
                    return chai.request(app)
                        .put(`/posts/comments/${comment.id}`)
                        .send(updateComment);
                })
                .then(function(res) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys(
                        'id', 'author', 'content', 'created'
                    );
                    return Comment.findById(res.body.id).exec()
                })
                .then(function(comment) {
                    comment.content = updateComment.content;
                    comment.likes = updateComment.likes;
                });
        });

    });
});
