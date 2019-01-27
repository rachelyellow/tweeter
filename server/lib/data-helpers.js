"use strict";


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `mongodb`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `mongodb`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray ((err, tweets) => {
        if (err) {
          callback(err)
        }
        callback(null, tweets)
      });

    }

  };

};
