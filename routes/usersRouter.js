'use strict';

const express    = require('express'),
      bodyParser = require('body-parser');

const { passport,
	    isLoggedIn,
	    basicStrategy } = require('../services/authenticate');
const usersController   = require('../controllers/usersController');


const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Passport requirements
router.use(passport.initialize())
router.use(passport.session());
passport.use(basicStrategy);



// ==================================================
//   User routes
// ==================================================

// creates user
router.post('/', usersController.createUser);

// gets all users
router.get('/', usersController.getAllUsers);

// returns user info object if logged in to session
router.get('/me',
	isLoggedIn,
	usersController.getUser
);


router.post('/login', function (req, res, next) {
	passport.authenticate('basic', function (err, user, info) {
		if (err) { 
			return next(err); 
		}
		if (!user) { 
			return res.json({
				status: false,
				message: 'Username / Password incorrect'
			});
		}
		req.logIn(user, function (err) {
			if (err) { 
				return next(err); 
			}

			// Sets 'loggedIn' to name of user currently logged in session
			res.cookie('loggedIn', req.user.username);
			
			return res.json({
				status: true,
				message: 'success'
			});
		});
	})(req, res, next);
});




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