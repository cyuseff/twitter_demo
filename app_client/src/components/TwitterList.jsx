import React from 'react';
import Twitt from './Twitt';

export default function TwitterList({twitts, loading}) {
  let list;
  let load;

  list = twitts.map((twitt) => {
    return(
      <Twitt key={twitt.twittId} twitt={twitt}></Twitt>
    );
  });

  load = <div className={`twitts-loader ${loading? 'active' : ''}`}><i className="fa fa-refresh fa-spin"></i></div>;

  return (
    <div>
      {load}
      <div className="media twitts-header">
        <div className="media-left">
          <img className="twitts-header-img" src="https://pbs.twimg.com/profile_images/586560973407850496/GBwrXz-__bigger.png" />
        </div>
        <div className="media-body">
          <h3 className="twitts-header-h3"><a href="https://twitter.com/Clevertech">Clevertech</a> Twitts Feed</h3>
          <a className="twitts-header-a" href="https://twitter.com/Clevertech">@Clevertech</a>
        </div>
      </div>

      <div className="twitts-list-container">
        <ul className="twitts-list">
          {list}
        </ul>
      </div>

    </div>
  );
}
