'use strict';


let jsonArr = [];

exports.getFeed = (req, res) => {
  const FeedParser = require('feedparser');
  const request = require('request'); // for fetching the feed

  req = request('http://dronelife.com/feed/');
  const feedparser = new FeedParser();
  req.on('error', function (error) {
    // handle any request errors
  });

  req.on('response', function (res) {
    let stream = this; // `this` is `req`, which is a stream

    if (res.statusCode !== 200) {
      this.emit('error', new Error('Bad status code'));
    }
    else {
      stream.pipe(feedparser);
    }
  });

  feedparser.on('error', function (error) {
    // always handle errors
  });

  feedparser.on('readable', function () {
    // This is where the action is!
    let stream = this; // `this` is `feedparser`, which is a stream
    let meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    let item;

    while (item = stream.read()) {
      console.log(item);
      jsonArr.push(item);
    }
    // This part errors
    // Error: Can't set headers after they are sent.
    // res.json({
    //     "test": 123,
    //     "json" : jsonArr
    // });
    res.send(jsonArr);
  });
}
