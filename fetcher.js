'use strict';

const twitter = require('./config/twitter');
const Twitt = require('./app_api/models/Twitt');

const USER_ID = 213807752;
const opts = {
  user_id: USER_ID,
  count: 10
};

let twitt;

function mapTwitt(twitt) {
  let tw = {
    twittId: twitt.id_str,
    text: twitt.text,

    retweetCount: twitt.retweet_count,
    favoriteCount: twitt.favorite_count,
    inReplyTo: twitt.in_reply_to_screen_name,

    entities: twitt.entities,

    createdAt: new Date(twitt.created_at),
    updatedAt: new Date()
  };

  let user;
  if(twitt.retweeted_status) {
    tw.retwitt = true;
    user = twitt.retweeted_status.user;
  } else {
    tw.retwitt = false;
    user = twitt.user;
  }

  tw.name = user.name;
  tw.screenName = user.screen_name;
  tw.avatar = user.profile_image_url_https;

  return tw;
}

// get old twitts
twitter.get('statuses/user_timeline', opts, function(error, tweets, response) {
  console.log(error);
  console.log(tweets);
  tweets = tweets.map(twitt => mapTwitt(twitt));

  Twitt.collection.insert(tweets, {ordered: false}, (err, tweets) => {
    console.log(tweets.insertedCount);
  });
});


// listen for new twitts
twitter.stream('user', {}, function(stream) {
  stream.on('data', function(data) {
    console.log('Data recived -> ', data);

    // save new ones
    if(data.id && data.user && data.user.id === USER_ID) {
      twitt = new Twitt(mapTwitt(data));

      twitt.save((err, res) => {
        if(err) console.log('Error:', err);
        console.log('res', res);
      });
    }

  });

  stream.on('error', function(error) {
    console.log('Stream error:', error);
    //throw error;
  });
});
