'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const { passport, isLoggedIn } = require('../services/authenticate');
const usersController = require('../controllers/usersController');


const router = express.Router();
router.use(bodyParser());
router.use(bodyParser.json());

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




// router.post('/login',
// 	passport.authenticate('local', {
// 		successRedirect: '/', // redirect to the secure profile section
// 		failureRedirect: '/', // redirect back to the signup page if there is an error
// 		failureFlash: true // allow flash messages
// 	}));

// router.post('/login', 
// 	 passport.authenticate('basic', {session: true}),
//   (req, res) => res.json({user: req.user.apiRepr()})
// );

router.post('/login', function (req, res, next) {
	passport.authenticate('basic', function (err, user, info) {
		if (err) { 
			return next(err); 
		}
		if (!user) { 
			return res.send('Wrong Username or Password'); 
		}
		req.logIn(user, function (err) {
			if (err) { 
				return next(err); 
			}
			console.log('logged in!!');
			res.status(200).json({
				loggedIn: true
			});
		});
	})(req, res, next);
});



router.get('/logout', (req, res) => {
	req.session.destroy(() => {
		console.log('logged out');
		res.json({
			loggedIn: false
		});
	});
});

// router.get('/logout', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.send('NO USER'); }
//     req.logOut(user, function(err) {
//       if (err) { return next(err); }
//       return res.send('LOGGINED OUT!!!');
//     });
//   })(req, res, next);
// });



module.exports = router;