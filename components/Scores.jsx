"use client";

import { useState, useEffect } from 'react';

import ScoreCard from './ScoresList';

const ScoreCardList = ({ data, handleTagClick }) => {
  // const handleAfterMapping = () => {
  //   // Perform your desired state update or action here
  //   // This code will run after the .map function has completed.
  //   // You can access the mapped data and perform any state changes here.
  //   console.log('getTest 2');
  // };

  return (
  <ul role="list" className="card_list">
    { data.map( ( post, index ) => (
        <ScoreCard
          key={`game_${index}`}
          post={post}
          handleTagClick={handleTagClick}
        />
      )          
    )}
    {/* {handleAfterMapping()} */}
  </ul>
)};

const Feed = () => {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const dataFormatted = {
        date: '',
        tournament: '',
        players_name: [],
        players_email: [],
        players_scores: [],
      };
      const response = await fetch( '/api/score' );
      const data = await response.json();

      data.map( ( post, index ) => {
        if ( 0 === index) {
          dataFormatted.date = post.date;
          dataFormatted.tournament = post.tournament.name;
        }
        
        if ( dataFormatted.date === post.date ) {
          post.scores.map( ( score, loop ) => {
            if ( 0 === index) {
              dataFormatted.players_name.push( score.player.name );
              dataFormatted.players_email.push( score.player.email );
            }
            dataFormatted.players_scores.push( score.score );
          });
        }
      });
  
      setPosts( [dataFormatted] );
    }
  
    fetchPosts();
  }, []);

  return (
    <section>
      <ScoreCardList
        data={ posts }
        handleTagClick={ () => {} }
      />
    </section>
  )
}

export default Feed