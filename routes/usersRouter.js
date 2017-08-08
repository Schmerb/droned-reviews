'use strict';

const express    = require('express');
const bodyParser = require('body-parser');

const { passport, 
		isLoggedIn, 
		basicStrategy } = require('../services/authenticate');
const usersController   = require('../controllers/usersController');


const router = express.Router();
router.use(bodyParser());
router.use(bodyParser.json());

// Passport requirements
passport.use(basicStrategy);
router.use(passport.initialize())
router.use(passport.session());



	
// creates user
router.post('/', usersController.createUser);

// gets all users
router.get('/', usersController.getAllUsers);

// returns user info object if logged in to session
router.get('/me',
	isLoggedIn, 
	usersController.getUser
);


router.post('/login', 
	 passport.authenticate('basic', {session: true}),
	(req, res) => {
		console.log('sucessfully logged in');

		// set cookie here that user is logged in and username
		// checks if client sent a cookie
		const cookie = req.cookies.cookieName;

		console.log('cookie', req.cookies);

		if (cookie === undefined) {
			// Sets 'loggedIn' to name of user currently logged in session
			res.cookie('loggedIn', req.user.username);
		}

		res.status(200).json({
			loggedIn: req.user
		});
	}	
);


router.get('/logout', (req, res) => {
	req.session.destroy(() => {
		console.log('logged out');
		// remove username from 'loggedIn' cookie
		res.cookie('loggedIn', '');
		res.status(200).json({
		  loggedIn: false
	  });
	});
});



module.exports = router;