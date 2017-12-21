'use strict';
const feedparser = require('feedparser-promised');


exports.getFeed = (req, res) => {

	let urls = [
		'http://dronelife.com/feed/',
		'http://quadcopterhq.com/feed/',
		'http://www.quadcopterguide.com/feed/',
		'http://www.rotordronemag.com/?feed=rss'
	];

	let feeds = [];
	for (let url of urls) {
		console.log(url);
		feeds.push(feedparser.parse(url));
	}
		
	Promise.all(feeds)
		.then(results => {
			console.log('\n\n\nResults\n\n');
			console.log(results);
			res.status(200).json({
				results
			});
		})
		.catch(err => console.log(err));
}

