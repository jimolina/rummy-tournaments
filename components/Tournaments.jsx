"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faChessBoard } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import { Loading } from '@utils/loading';
import TournamentCard from './TournamentsList';

const TournamentCardList = ({ data, handleTagClick}) =>  {
  return (
    <>
      {data && 0 < data.length ? (
        <ul role="list" className="card_list">
          {data.map( ( post ) => (
            <TournamentCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
        </ul>
      ):(
        <div className="message message__empty-state">
          <FontAwesomeIcon icon={faChessBoard} className='fa-4x' />
          <p>Create your first <b>Tournament</b>!</p>
          <Link href="/create-tournament" className="btn btn-icon">
              <span className="icon">+</span>
              <span className="copy">Tournament</span>
          </Link>
        </div>
      )}
    </>
  )
};

const Feed = () => {
  const [ isLoading, setIsLoading ] = useState( true );
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch( '/api/tournament', {
        cache: 'no-store',
        next: {
          revalidate: 3
        }
      });
      const data = await response.json();
  
      setPosts( data );
      setIsLoading( false );
    }
  
    fetchPosts();
  }, []);

  return (
    <section>
      {!isLoading ? (
        <TournamentCardList
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