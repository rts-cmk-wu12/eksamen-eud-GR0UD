"use client";
import Link from "next/link";
import { signUpUser } from "./sign-up-action";
import { useActionState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function SignUpForm() {
  const [formState, formAction, isPending] = useActionState(signUpUser, {});

  useEffect(() => {
    if (formState?.success) {
      toast.success("Account created successfully!");
    }
    if (formState?.error?.global?.errors) {
      toast.error(formState.error.global.errors[0]);
    }
  }, [formState]);

  return (
    <div className="signup-form">
      <ToastContainer />
      <form action={formAction} className="signup-form__container">
        <div className="signup-form__name-row">
          <div className="signup-form__field signup-form__field--half">
            <label htmlFor="firstname" className="signup-form__label">
              Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className={`signup-form__input ${
                formState?.error?.firstname ? "signup-form__input--error" : ""
              }`}
              placeholder="John"
              defaultValue={formState?.data?.firstname}
            />
            {formState?.error?.firstname?.errors &&
              formState.error.firstname.errors.length > 0 && (
                <p className="signup-form__error-text">
                  {formState.error.firstname.errors[0]}
                </p>
              )}
          </div>

          <div className="signup-form__field signup-form__field--half">
            <label htmlFor="lastname" className="signup-form__label">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className={`signup-form__input ${
                formState?.error?.lastname ? "signup-form__input--error" : ""
              }`}
              placeholder="Doe"
              defaultValue={formState?.data?.lastname}
            />
            {formState?.error?.lastname?.errors &&
              formState.error.lastname.errors.length > 0 && (
                <p className="signup-form__error-text">
                  {formState.error.lastname.errors[0]}
                </p>
              )}
          </div>
        </div>

        <div className="signup-form__field">
          <label htmlFor="email" className="signup-form__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`signup-form__input ${
              formState?.error?.email ? "signup-form__input--error" : ""
            }`}
            placeholder="email@example.com"
            defaultValue={formState?.data?.email}
          />
          {formState?.error?.email?.errors &&
            formState.error.email.errors.length > 0 && (
              <p className="signup-form__error-text">
                {formState.error.email.errors[0]}
              </p>
            )}
        </div>

        <div className="signup-form__field">
          <label htmlFor="password" className="signup-form__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`signup-form__input ${
              formState?.error?.password ? "signup-form__input--error" : ""
            }`}
            placeholder="example123"
          />
          {formState?.error?.password?.errors &&
            formState.error.password.errors.length > 0 && (
              <p className="signup-form__error-text">
                {formState.error.password.errors[0]}
              </p>
            )}
        </div>

        <button
          type="submit"
          className="signup-form__submit-btn"
          disabled={isPending}
        >
          {isPending ? "Creating Account..." : "Sign Up"}
        </button>

        <Link href="/sign-in" className="signup-form__signin-link">
          Already have an account? Sign In
        </Link>
      </form>
    </div>
  );
}
