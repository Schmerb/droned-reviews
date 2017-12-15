# Droned Reviews
Node Backend Capstone Project from [Thinkful's](https://www.thinkful.com/) Fullstack Web Development program. 

## Project Requirements
* The capstone project for this course is largely open ended. You'll use Node and Express to create a backend that serves your static files and a REST API. You'll also create a client app that utilizes the API. The user experience is open ended and up to you, but ultimately, your app should do something interesting or valuable for your intended users. 
  * Create a Client 
  * Serve Static Files
  * Implement a REST API with all four CRUD operations
  * Comprehensive Tests for the API Layer
  * Use Continuous Integration
* Polish: Your polished client should have compelling design and be responsive and follow accessibility best practices.

## Screenshots

Project Landing Page

![Landing Page](./working-screenshots/landing.png?raw=true "Landing Page")

Homepage

![Home Page](./working-screenshots/homepage.png?raw=true "Home Page")

Mission Page w/ user signed in

![Signin Home Page](./working-screenshots/mission-user.png?raw=true "Signin Home Page")

Write Review Form

![Review Form](./working-screenshots/write-review.png?raw=true "Review Form")

Review Page

![Reviews](./working-screenshots/reviews.png?raw=true "Reviews")

Comments

![Review Comments](./working-screenshots/comments.png?raw=true "Review Comments")

Drone Model Specs

![Specs](./working-screenshots/specs.png?raw=true "Specs")

Drone Make/Model Page

![Drone Models](./working-screenshots/drone-model.png?raw=true "Drone Models")

Mobile Menu

![Mobile Menu](./working-screenshots/mobile-menu.png?raw=true "Mobile Menu") 

Mobile Review Page

![Mobile Review](./working-screenshots/mobile-review.png?raw=true "Mobile Review")

## Live [DEMO](http://www.droned.reviews/)

## Description
Droned Reviews is a user sourced drone review website that provides a platform for users to share personal knowledge and experiences with quadcopters as well as others to come and read up on first hand information on the latest drone makes and models provided by real drone pilots and hobbyists such as myself. Users can also navigate through images and technical specifications of some of the top models manufactured by the most trusted names in the personal drone industry. Purchase links are also provided for each drone model directed to [Amazon](https://www.amazon.com/) products as part of the Amazon Affiliates Program.

## Built With
* Front-end
  * HTML5 
  * CSS3
  * JavaScript
  * jQuery
     * [Slick](http://kenwheeler.github.io/slick/) - Responsive carousel jQuery plugin
* Back End ~ Server-side technologies and Node modules
    * [Node.js](https://nodejs.org/en/)
        * JavaScript runtime built on Chrome's V8 JavaScript engine
    * [Express.js](https://expressjs.com/)
        * Express 4.15.3 - A minimalist web framework for Node.js
    * [EJS](https://www.npmjs.com/package/ejs) (Embedded JavaScript) - templating engine
        * [EJS-Mate](https://www.npmjs.com/package/ejs-mate) - Node module to provide layouts, partials and block template functions for EJS templating engine
    * [MongoDB](https://www.mongodb.com/?_ga=2.47578087.1554352097.1503448576-1150300201.1500135506)
        * database for storing user information, posts, comments, and images
    * [Mongoose.js](http://mongoosejs.com/)
        * A MongoDB object modeling tool designed to work in an asynchronous environment.   
        * [GridFS](https://docs.mongodb.com/manual/core/gridfs/)
            * MongoDB specification for storing and serving large files. In this case specifically, user uploaded images
    * [connect-mongo](https://www.npmjs.com/package/connect-mongo)
        * MongoDB session store for Express to allow persistant user sessions
    * [Passport.js](http://passportjs.org/docs)
        * Authentication middleware for Node
        * [passport-http](https://github.com/jaredhanson/passport-http)
            * provides HTTP Basic authentication strategies for Passport and Node.js
    * [bcryptjs](https://www.npmjs.com/package/bcryptjs)
        * JavaScript library that implements bcrypt, a popular password hashing function. 
    * [express-session](https://github.com/expressjs/session)
        * Simple session middleware for Express to help with user authentication
    * [body-parser](https://github.com/expressjs/body-parser)
        * Node.js body parsing middleware 
    * [busboy-body-parser](https://www.npmjs.com/package/busboy-body-parser)
        * Body parsing for multipart/form-data in Express -- exposes user file uploads at req.files
    * [cookie-parser](https://github.com/expressjs/cookie-parser)
        * Express middleware to parse cookies sent in requests
    * [morgan](https://github.com/expressjs/morgan)
        * HTTP request logger middleware for node.js

    * Development technologies:
        * [Mocha.js](https://mochajs.org/)
            * A JavaScript test framework running on Node.js and in the browser, handles asynchronous testing with ease
        * [Chaijs](http://chaijs.com/)
            * A BDD / TDD assertion library for node and the browser, works seamlessly with Mocha testing framework among others
            * [chai-http](http://chaijs.com/plugins/chai-http/) 
                * A plugin for Chaijs that integrates HTTP testing with Chai assertions
        * [faker.js](https://github.com/marak/Faker.js/)
            * Node package, JavaScript library that generates fake data to be used in testing API
        * [TravisCI](https://travis-ci.org/)
            * Continuous Integration testing that tests latest build before deploying to production environment
        * [Gulp](https://gulpjs.com/)
            * Task manager
            * [gulp-nodemon](https://www.npmjs.com/package/gulp-nodemon) 
                * Node package that restarts server and made for use with Gulp tasks
        * [Browsersync](https://www.browsersync.io/)
            * Automation tool to make the development process faster. 
            * Allows for multiple screens to reload live and all interactions are in synchronization, mirroring actions across every browser on any device located on local network.
            * compatible with Gulp
        * Gulp + gulp-nodemon + Browsersync combine to streamline the entire development process
        * [Browserify](http://browserify.org/)
            * npm module support for browser
        * [Babel](https://babeljs.io/) 
            * ES6 support for older environments (IE8 etc)

## Notes
* Hosted on [Heroku](https://heroku.com/)'s Cloud Application Platform 
    * (PaaS) platform as a service
* Responsive, mobile first design strategy 
* All tests handled by Mocha.js using Chaijs and chai-http assertion libraries to test API endpoints
    * Used by TravisCI to test master branch before deploying to production environment on Heroku
* Cloud MongoDB hosting provided by [mLab](https://mlab.com/)
* Icons provided by 
    * [FontAwesome](http://fontawesome.io/)
    * [Freepik@Flaticon](https://www.flaticon.com/authors/freepik)
* Image files are stored in base64 binary encoding using GridFS, a MongoDB specification that saves larger files in chunks and combines these chunks on request to serve the original file back to client. Video file storage to be implemented soon.
* APIs
  * Drone model videos are powered by the YouTube Data API