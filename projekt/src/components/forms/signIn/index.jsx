"use client";
import Link from "next/link";
import { useActionState } from "react";
import doTheLoginThing from "./sign-in-action";

const initialState = {
  success: false,
  message: "",
  errors: [],
};

export default function SignInForm() {
  const [formState, formAction, isPending] = useActionState(
    doTheLoginThing,
    initialState
  );
  return (
    <div className='signin-form'>
      <form
        action={formAction}
        aria-busy={isPending}
        className='signin-form__container'
      >
        <div className='signin-form__field'>
          <label htmlFor='email' className='signin-form__label'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='signin-form__input'
            placeholder='email@example.com'
          />
        </div>

        <div className='signin-form__field'>
          <label htmlFor='password' className='signin-form__label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='signin-form__input'
            placeholder='example123'
          />
        </div>

        <button
          type='submit'
          className='signin-form__submit-btn'
          disabled={isPending}
        >
          {isPending ? "Signing In..." : "Sign In"}
        </button>
        {formState?.success && (
          <div className='signin-form__success'>{formState.message}</div>
        )}

        {formState?.errors && formState.errors.length > 0 && (
          <div className='signin-form__errors'>
            {formState.errors.map((error, index) => (
              <div key={index} className='signin-form__error'>
                {error}
              </div>
            ))}
          </div>
        )}

        <Link href='/sign-up' className='signin-form__register-link'>
          Don't have an account? Register
        </Link>
      </form>
    </div>
  );
}
