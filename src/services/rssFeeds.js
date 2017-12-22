'use strict';
const feedparser = require('feedparser-promised');
const { checkSessionCookieLoggedIn } = require('../services/cookieCheck');


exports.getFeed = (req, res) => {
	let urls = [
		'http://dronelife.com/feed/',
		'http://www.quadcopterguide.com/feed/',
		'http://www.rotordronemag.com/?feed=rss'
	];

	let feeds = [];
	for (let url of urls) {
		feeds.push(feedparser.parse(url));
	}
		
	Promise
		.all(feeds)
		.then(results => {
			console.log(results);
			let posts = [];
			results.forEach(subArr => {
				subArr.forEach(post => {
					let { title, description, summary, date, author, link } = post;
					let newPost = {
						title, 
						description, 
						summary, 
						date, 
						author, 
						link
					};
					posts.push(newPost);
				});
			});
			console.log(posts);
			const { loggedIn, username } = checkSessionCookieLoggedIn(req);
			res.status(200).render('pages/rssFeed', {
				posts,
				loggedIn: loggedIn,
				username: JSON.stringify(username)
			});
		})
};

