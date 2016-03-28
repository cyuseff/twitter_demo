import React from 'react';

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

function dateToString(dateStr, time) {
  const date = new Date(dateStr);
  let str = `${date.getDate()} ${months[date.getMonth()]}. ${date.getFullYear()}`;

  if(time) str = `${date.getHours()}:${date.getMinutes()} - ` + str;
  return str;
}

function getUsers(text, user_mentions) {
  let reg;
  user_mentions.forEach((item) => {
    reg = new RegExp(`@${item.screen_name}`, 'i');
    text = text.replace(reg, `<a href="https://twitter.com/${item.screen_name}" target="_blank">@${item.screen_name}</a>`);
  });
  return text;
}

function getHashTags(text, hashtags) {
  let reg;
  hashtags.forEach((item) => {
    reg = new RegExp(`#${item.text}`, 'i');
    text = text.replace(reg, `<a href="https://twitter.com/hashtag/${item.text}?src=hash" target="_blank">#${item.text}</a> `);
  });
  return text;
}

function getUrls(text, urls) {
  let reg;
  urls.forEach((item) => {
    reg = new RegExp(`${item.url}`, 'i');
    text = text.replace(reg, `<a href="${item.url}" target="_blank">${item.display_url}</a>`);
  });
  return text;
}

function createMarkup(text, entities) {
  text = getUsers(text, entities.user_mentions);
  text = getHashTags(text, entities.hashtags);
  text = getUrls(text, entities.urls);
  return {__html: `<span>${text}</span>`};
};

export default function Twitt({twitt}) {
  let retwitt;
  let reply;

  if(twitt.retwitt) {
    retwitt = (
      <span>
        <i className="fa fa-retweet"></i> Retwitted by @cyussi
      </span>
    );
  }

  if(twitt.inReplyTo) {
    reply = (
      <span>
        <i className="fa fa-reply"></i> {`In reply to @${twitt.inReplyTo}`}
      </span>
    );
  }

  return (
    <li>
      <small className="text-muted">
        {retwitt}
        {reply}
      </small>

      <div className="media">
        <div className="media-left">
          <img className="media-object twitt-avatar" src={twitt.avatar} alt={twitt.name} />
        </div>
        <div className="media-body">
          <ul className="list-inline">
            <li>
              <a href={`https://twitter.com/${twitt.screenName}`} target="_blank">{twitt.name}</a>
            </li>
            <li className="text-muted">{`@${twitt.screenName}`}</li>
            <li>{dateToString(twitt.createdAt)}</li>
          </ul>

          <h4 className="media-heading" dangerouslySetInnerHTML={createMarkup(twitt.text, twitt.entities)}></h4>

          <ul className="list-inline">
            <li>
              <a target="_blank" href={`https://twitter.com/intent/tweet?in_reply_to=${twitt.twittId}`}>
                <i className="fa fa-reply"></i> Reply
              </a>
            </li>
            <li>
              <a target="_blank" href={`https://twitter.com/intent/retweet?tweet_id=${twitt.twittId}`}>
                <i className="fa fa-retweet"></i> {`${twitt.retweetCount} Retweet`}
              </a>
            </li>
            <li>
              <a target="_blank" href={`https://twitter.com/intent/like?tweet_id=${twitt.twittId}`}>
                <i className="fa fa-heart"></i> {`${twitt.favoriteCount} Like`}
              </a>
            </li>
          </ul>

        </div>
      </div>

    </li>
  );
}
