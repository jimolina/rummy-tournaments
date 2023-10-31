"use client";

import { useState, useEffect } from 'react';

import PlayerCard from './PlayersList';

const PlayerCardList = ({ data, handleTagClick}) =>  {
  let scoreCountValues = [];
  let maxValue = 0;
  let minValue = 0;

  // Creat a new array to just put the total count values.
  data.map( ( post ) => {
    scoreCountValues.push( post.count );
  });

  // We take the total count values to determine the Max/Min
  // (Winner/Losser)
  if ( 0 < scoreCountValues.length ) {
    //Player with highest count is the Loser
    maxValue = parseInt( Math.max.apply(null, scoreCountValues) );
    //Player with lowers count is the Winner
    minValue = parseInt( Math.min.apply(null, scoreCountValues) );
  }

  return (
    <ul role="list" className="card_list with-avatar">
      { data.map( ( post, item ) => (
        <PlayerCard
          key={`player_${post._id}`}
          post={post}
          winner={minValue}
          loser={maxValue}
          loop={(item + 1)}
          handleTagClick={handleTagClick}
        />
      ))}
    </ul>
  )
};

const Feed = () => {
  const [ posts, setPosts ] = useState([]);
  let data = [];

  useEffect(() => {
    const fetchPosts = async () => {
      // We get full data from the .Aggregate
      const responseAggregate = await fetch( '/api/player' );
      data = await responseAggregate.json();

      // If the .Aggregate return zero data, then we
      // call the simple Player object.
      if ( 0 === data.length ) {
        const responseSimple = await fetch( '/api/player/list' );
        data = await responseSimple.json();
      }

      setPosts( data );
    }
  
    fetchPosts();
  }, []);

  return (
    <section>
      <PlayerCardList
        data={ posts }
        handleTagClick={ () => {} }
      />
    </section>
  )
}

export default Feed