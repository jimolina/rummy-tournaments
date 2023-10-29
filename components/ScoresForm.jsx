import Link from 'next/link';
import {getAvatar} from "@utils/getAvatar.js";
import Image from "next/image";

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
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tournament:
          </span>
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
            {tournaments
              ? (
                tournaments.map( ( tournament, index ) => (
                  <option
                    key={`tournament_${index}`}
                    value={ tournament._id }>
                      { tournament.name }
                  </option>
                ))
                ): null
              }
          </select>
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
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
          <div className='font-satoshi font-semibold text-base text-gray-700'>
            Players:
          </div>
          <div className="players_group flex flex-wrap flex-col md:flex-row w-full justify-stretch md:justify-around md:gap-6 gap-3 mt-6">
            {players
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
                    )
                  )
                ): null
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