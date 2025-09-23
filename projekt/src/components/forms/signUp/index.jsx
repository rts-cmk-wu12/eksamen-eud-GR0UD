import Link from "next/link";

export default function SignUpForm() {
  return (
    <div className='signup-form'>
      <form className='signup-form__container'>
        <div className='signup-form__name-row'>
          <div className='signup-form__field signup-form__field--half'>
            <label htmlFor='name' className='signup-form__label'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='signup-form__input'
              placeholder='John'
              required
            />
          </div>

          <div className='signup-form__field signup-form__field--half'>
            <label htmlFor='lastName' className='signup-form__label'>
              Last Name
            </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              className='signup-form__input'
              placeholder='Doe'
              required
            />
          </div>
        </div>

        <div className='signup-form__field'>
          <label htmlFor='email' className='signup-form__label'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='signup-form__input'
            placeholder='email@example.com'
            required
          />
        </div>

        <div className='signup-form__field'>
          <label htmlFor='password' className='signup-form__label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='signup-form__input'
            placeholder='example123'
            required
          />
        </div>

        <button type='submit' className='signup-form__submit-btn'>
          Sign Up
        </button>

        <Link href='/sign-in' className='signup-form__signin-link'>
          Already have an account? Sign In
        </Link>
      </form>
    </div>
  );
}
