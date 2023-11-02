import Link from 'next/link';
import Image from "next/image";

import {getAvatar} from "@utils/getAvatar.js";
import { ValidateSession } from './ValidateSession';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersLine, faChessBoard } from '@fortawesome/free-solid-svg-icons';

const ScoreForm = ({
  type,
  area,
  post,
  players,
  tournaments,
  setPost,
  submitting,
  handleSubmit,
}) => {
  ValidateSession();
  
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>
          { type } { area }
        </span>
      </h1>

      <form
        onSubmit={ handleSubmit }
        className="form_default glassmorphism"
      >
        <label>
          <span className='label'>
            Tournament:
          </span>
          {tournaments && 0 < tournaments.length
            ? (
            <select
              value={ post.tournaments }
              onChange={ ( e ) => setPost( {
                ...post,
                tournaments: e.target.value,
              } ) } 
              className="form_input"
              required
            >
              <option value="">Select</option>
                {tournaments.map( ( tournament, index ) => (
                  <option
                    key={`tournament_${index}`}
                    value={ tournament._id }>
                      { tournament.name }
                  </option>
                ))}
            </select>
          ): (
            <div className="message message__empty-state">
              <FontAwesomeIcon icon={faChessBoard} className='fa-4x' />
              <p>You will need to create a <b>Tournament</b> first!</p>
              <Link href="/create-tournament" className="btn btn-icon">
                  <span className="icon">+</span>
                  <span className="copy">Tournament</span>
              </Link>
            </div>
          )
        }
        </label>

        <label>
          <span className='label'>
            Date:
          </span>

          <input
            type="date"
            value={ post.date }
            onChange={ ( e ) => setPost( {
              ...post,
              date: e.target.value,
            } ) }
            placeholder="Date"
            className="form_input"
            required
          />
        </label>

        <div className="players_container">
          <div className='label'>
            Players:
          </div>
          <div className="players_group">
            {players && 0 < players.length
              ? (
                players.map( ( player, index ) => (
                  <div key={ index } className="relative">
                    <div className="absolute -left-1 top-1">
                      <Image
                        src={ getAvatar( player.email, player.avatar ) }
                        alt="Avatar"
                        width={81}
                        height={81}
                        className="avatar rounded-full object-contain"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        name={`${player._id}`}
                        className="form_input text-right appearance-none ml-2"
                        placeholder="69"
                        maxLength={3}
                        required                        
                      />
                    </div>
                  </div>
                ))
              ): (
                <div className="message message__empty-state">
                  <FontAwesomeIcon icon={faUsersLine} className='fa-4x' />
                  <p>You will need to create some <b>Players</b> first!</p>
                  <p className="note">
                    It might be a good idea to add all your players before coming back here.
                  </p>
                  <Link href="/create-player" className="btn btn-icon">
                    <span className="icon">+</span>
                    <span className="copy">Player</span>
                  </Link>
                </div>
              )
            }
          </div>
        </div>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/" className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className='px-5 py-1.5 bg-primary-orange rounded-full text-white'>
            { submitting ? `${type}...` : type }
          </button>

        </div>
      </form>
    </section>
  )
}

export default ScoreForm