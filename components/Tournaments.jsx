"use client";

import { useState, useEffect } from 'react';

import TournamentCard from './TournamentsList';

const TournamentCardList = ({ data, handleTagClick}) =>  {
  return (
    <ul role="list" className="card_list">
      { data.map( ( post ) => (
        <TournamentCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </ul>
  )
};

const Feed = () => {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch( '/api/tournament' );
      const data = await response.json();
  
      setPosts( data );
    }
  
    fetchPosts();
  }, []);

  return (
    <section>
      <TournamentCardList
        data={ posts }
        handleTagClick={ () => {} }
      />
    </section>
  )
}

export default Feed