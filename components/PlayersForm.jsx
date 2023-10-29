import Link from 'next/link'

const PlayerForm = ({
  type,
  area,
  post,
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
      <p className='desc text-left max-w-md'>
        { type } a { area } and then you will be able to create Games!.
      </p>

      <form
        onSubmit={ handleSubmit }
        encType="multipart/form-data"
        className="mt-10 w-full max-w-2x1 flex flex-col gap-7 glassmorphism"
      >
        <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
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
            <span className='font-satoshi font-semibold text-base text-gray-700'>
                Email:
            </span>

            <input
                type="email"
                value={ post.email }
                onChange={ ( e ) => setPost( {
                    ...post,
                    email: e.target.value,
                } ) }
                placeholder="Email"
                className="form_input"
                required
            />
        </label>
        {/* <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
                Avatar:
            </span>

            <input
                type="file"
                value={ post.avatar }
                onChange={ ( e ) => setPost( {
                    ...post,
                    avatar: e.target.value,
                } ) }
                placeholder="Avatar"
                className="form_input"
            />
        </label> */}

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

export default PlayerForm