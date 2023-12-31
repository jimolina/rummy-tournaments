import Link from 'next/link'

import { ValidateSession } from './ValidateSession';

const TournamentForm = ({
  type,
  area,
  post,
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
      <p className='desc text-left max-w-md'>
        { type } a { area } where you can add Player
        and then save the records of each Game!.
      </p>

      <form
        onSubmit={ handleSubmit }
        className="form_default glassmorphism"
      >
        <label>
          <span className='label'>
            Name:
          </span>

          <input
            value={ post.name }
            onChange={ ( e ) => setPost( {
              ...post,
              name: e.target.value,
            } ) }
            placeholder="Name"
            className="form_input"
            required
          />
        </label>
        <label>
          <span className='label'>
            Start Date:
          </span>

          <input
            type="date"
            value={ post.start_date }
            onChange={ ( e ) => setPost( {
              ...post,
              start_date: e.target.value,
            } ) }
            placeholder="Start Date"
            className="form_input"
            required
          />
        </label>

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

export default TournamentForm