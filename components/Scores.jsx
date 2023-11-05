"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import { Loading } from '@utils/loading';
import ScoreCard from './ScoresList';

const ScoreCardList = ({ data, handleTagClick }) => {
  // const handleAfterMapping = () => {
  //   // Perform your desired state update or action here
  //   // This code will run after the .map function has completed.
  //   // You can access the mapped data and perform any state changes here.
  //   console.log('getTest 2');
  // };

  return (
    <>
    {data && 0 < data.length ? (
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
    ):(
        <div className="message message__empty-state">
          <FontAwesomeIcon icon={faGamepad} className='fa-4x' />
          <p>Create your first <b>Game</b>!</p>
          <Link href="/create-score" className="btn btn-icon">
              <span className="icon">+</span>
              <span className="copy">Game</span>
          </Link>
        </div>
      )}
    </>
)};

const Feed = () => {
  const [ isLoading, setIsLoading ] = useState( true );
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

      if ( data && 0 < data.length ) {
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
      } else {
        setPosts( [] );
      }
  
      setIsLoading( false );
    }
  
    fetchPosts();
  }, []);

  return (
    <section>
      {!isLoading ? (
        <ScoreCardList
          data={ posts }
          handleTagClick={ () => {} }
        />
      ):(
        <Loading />
      )}
    </section>
  )
}

export default Feed