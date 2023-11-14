"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faGamepad, faChessBoard, faUsersLine } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import Tournaments from '@components/Tournaments';
import Players from '@components/Players';
import Scores from '@components/Scores';

const Home = () => {
  const { data: session } = useSession();

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Rummy Tournament
        <br />
        <span className="orange_gradient text-center">
          Management System
        </span>
      </h1>
      <p className="desc text-center">
        This is a Rummy Tournament Management application created to keep records, teams,
        and players data.
      </p>
      {session?.user ? (
        <>
          <div className='card_default mt-6'>
            <div className='card_default__title'>
              <FontAwesomeIcon icon={faChessBoard} className='fa-xl' />
              <h3 className='title'>Tournaments</h3>
                {"admin" === session?.user.profile ? (
                  <Link
                    href="/create-tournament"
                    className="btn btn-icon ml-auto"
                  >
                      <span className="icon">+</span>
                      <span className="copy">New</span>
                  </Link>
                ): ( null )}
            </div>
            <div className='card_default__desc'>
              <Tournaments />
            </div>
          </div>

          <div className='game-card card_default mt-6'>
            <div className='card_default__title'>
              <FontAwesomeIcon icon={faGamepad} className='fa-xl' />
              <h3 className='title'>Games</h3>  
              {"admin" === session?.user.profile ? (
                <Link
                  href="/create-score"
                  className="btn btn-icon ml-auto"
                >
                    <span className="icon">+</span>
                    <span className="copy">New</span>
                </Link>
              ): ( null )}
            </div>
            <div className='card_default__desc'>
              <Scores />
            </div>
          </div>

          <div className='player-card card_default mt-6'>
            <div className='card_default__title'>
            <FontAwesomeIcon icon={faUsersLine} className='fa-xl' />
              <h3 className='title'>Players</h3>
              {"admin" === session?.user.profile ? (
                <Link
                  href="/create-player"
                  className="btn btn-icon ml-auto"
                >
                    <span className="icon">+</span>
                    <span className="copy">New</span>
                </Link>
              ): ( null )}
            </div>
            <div className='card_default__desc'>
              <Players />
            </div>
          </div>
        </>
      ): ( null )
    }
    </section>
  )
}

export default Home