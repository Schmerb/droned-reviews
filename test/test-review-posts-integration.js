const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const {Post} = require('../models/posts');

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

// Seeds database with random review post data
function seedPostData() {
    console.log('Seeding review post data');
    const seedData = [];

    for (let i = 0; i < 10; i++) {
        seedData.push(generatePostData());
    }

    return Post.insertMany(seedData);
}

// generates mock review post with random data
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


describe('Droned /Posts API resource', function() {

    // Runs once before all tests begin
    // to start server
    before(function() {
      return runServer(TEST_DATABASE_URL);
    });

    // Runs before each and every test to seed database
    // with fresh data
    beforeEach(function() {
      return seedPostData(); 
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
    describe('GET endpoint', function() {

        it('should return success status code', function() {
            return chai.request(app)
                .get('/')
                .then(function(res) {
                    res.should.have.status(200);
                });
        });
        
        it('should return all review posts', function() {
            // strategy:
            //    1. get back all posts returned by by GET request to `/posts`
            //    2. prove res has right status, data type
            //    3. prove the number of posts we got back is equal to number
            //       in db
            let res;
            return chai.request(app)
                .get('/posts')
                .then(function(_res) {
                    res = _res;
                    res.should.have.status(200);
                    res.body.posts.should.have.length.of.at.least(1);
                    return Post.count();
                })
                .then(function(count) {
                    res.body.posts.should.have.lengthOf(count);
                });
        });
        
        it('should return all review posts with correct fields', function() {
            // Strategy: Get back all posts, and ensure they have expected keys
            let resPost;
            return chai.request(app)
                .get('/posts')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.posts.should.be.a('array');
                    res.body.posts.should.have.length.of.at.least(1);

                    res.body.posts.forEach(function(post) {
                        post.should.be.a('object');
                        post.should.include.keys(
                            'id', 'title', 'drone', 'content', 'author', 'rating', 'created'
                        );
                    });
                    resPost = res.body.posts[0];
                    return Post.findById(resPost.id).exec();
                })
                .then(function(post) {
                    resPost.id.should.equal(post.id);
                    resPost.title.should.equal(post.title);
                    resPost.content.should.equal(post.content);
                    resPost.author.username.should.equal(post.author.username);
                    resPost.drone.make.should.equal(post.drone.make);
                    resPost.drone.model.should.equal(post.drone.model);
                    resPost.rating.should.equal(post.rating);

                    // let resDate = Date.parse(resPost.created);
                    let resDate = normalizeResDate(resPost.created);
                    // let dbDate = post.created.getTime();
                    let dbDate = normalizeDbDate(post.created);

                    console.log('Res: ', resPost.created, typeof(resPost.created));
                    console.log('DB: ', post.created, typeof(post.created));
                    console.log('Date.parse(RES): ', resDate, typeof(resDate));
                    console.log('DB.getTime(): ', dbDate, typeof(dbDate));

                    resDate.should.equal(dbDate);
                });   
        });

        it('should return specific post by ID', function() {
            // strategy
            //   1. Get random post id from db
            //   2. Prove GET request to /posts/:id res 
            //      is same as one from db
            return Post
                .findOne()
                .exec()
                .then(function(post) {
                    return chai.request(app)
                        .get(`/posts/${post._id}`)
                        .then(function(res) {
                            res.should.have.status(200);
                            // db._id is 'Object', res.id is 'String', need to convert _id to string to compare
                            res.body.id.should.equal(post._id.toString());
                            res.body.content.should.equal(post.content);
                            normalizeResDate(res.body.created).should.equal(normalizeDbDate(post.created));
                        });
                });
        });
        
    });

    // POST -- CREATE
    describe('POST endpoint', function() {
        
        it('should add a new review post', function() {
            // strategy: make a POST request with data,
            // then prove that the post we get back has
            // right keys, and that `id` is there (which means
            // the data was inserted into db)
            const newPost = generatePostData();
            
            let res;
            return chai.request(app)
                .post('/posts')
                .send(newPost)
                .then(function(_res) {
                    res = _res;
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys(
                        'id', 'title', 'drone', 'content', 'author', 'rating', 'created'
                    );
                    res.body.title.should.equal(newPost.title);
                    res.body.content.should.equal(newPost.content);
                    res.body.drone.model.should.equal(newPost.drone.model);
                    res.body.author.username.should.equal(newPost.author.username);
                    res.body.rating.should.equal(newPost.rating);
                    res.body.id.should.not.be.null;
                    return Post.findById(res.body.id).exec();
                })
                .then(function(post) {
                    post.title.should.equal(newPost.title);
                    post.content.should.equal(newPost.content);
                    post.author.username.should.equal(newPost.author.username);
                    post.drone.model.should.equal(newPost.drone.model);
                    post.drone.make.should.equal(newPost.drone.make);
                    post.created.getTime().should.equal(Date.parse(res.body.created));
                });
        });
    })

    // PUT -- UPDATE
    describe('PUT endpoint', function() {
        // strategy:
        //  1. Get an existing post from db
        //  2. Make a PUT request to update that post
        //  3. Prove post returned by request contains data we sent
        //  4. Prove post in db is correctly updated

    });

    // DELETE -- DESTROY
    describe('DELETE endpoint', function() {
        // strategy:
        //  1. get a post
        //  2. make a DELETE request for that post's id
        //  3. assert that response has right status code
        //  4. prove that post with the id doesn't exist in db anymore
        
    });
});


// Yee BRANCH