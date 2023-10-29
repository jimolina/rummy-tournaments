import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faGamepad, faChessBoard, faUsersLine } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import Tournaments from '@components/Tournaments';
import Players from '@components/Players';
import Scores from '@components/Scores';

const Home = () => {
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
        This is a Rummy Tournament Management aplication created to keep records, teams,
        and players data.
      </p>

      <div className='card_default mt-6'>
        <div className='card_default__title'>
          <FontAwesomeIcon icon={faChessBoard} className='fa-xl' />
          <h3 className='title'>Tournaments</h3>
          <Link href="/create-tournament" className="btn btn-icon ml-auto">
              <span className="icon">+</span> New
          </Link>
        </div>
        <div className='card_default__desc'>
          <Tournaments />
        </div>
      </div>

      <div className='card_default mt-6'>
        <div className='card_default__title'>
          <FontAwesomeIcon icon={faGamepad} className='fa-xl' />
          <h3 className='title'>Games</h3>            
          <Link href="/create-score" className="btn btn-icon ml-auto">
              <span className="icon">+</span> New
          </Link>
        </div>
        <div className='card_default__desc'>
          <Scores />
        </div>
      </div>

      <div className='player-card card_default mt-6'>
        <div className='card_default__title'>
        <FontAwesomeIcon icon={faUsersLine} className='fa-xl' />
          <h3 className='title'>Players</h3>
          <Link href="/create-player" className="btn btn-icon ml-auto">
              <span className="icon">+</span> New
          </Link>
        </div>
        <div className='card_default__desc'>
          <Players />
        </div>
      </div>
    </section>
  )
}

export default Home