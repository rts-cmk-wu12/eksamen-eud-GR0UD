"use client";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import signInAction from "./sign-in-action";
import { toast, ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";

export default function SignInForm() {
  const [formState, formAction, isPending] = useActionState(signInAction);

  useEffect(() => {
    const id = isPending
      ? toast.loading("Logger ind...", {
          toastId: "login-toast",
          position: "bottom-right",
        })
      : toast.dismiss();

    if (formState?.success) {
      toast.update("login-toast", {
        render: "Du er nu logget ind!",
        type: "success",
        isLoading: false,
        closeOnClick: false,
        autoClose: 3000,
        hideProgressBar: true,
        position: "bottom-right",
      });
      setTimeout(() => {
        redirect("/");
      }, 1000); // Kort delay før omdirigering
    }
    return () => toast.dismiss(id);
  }, [formState, isPending]);

  return (
    <>
      <div className="signin-form">
        <form
          action={formAction}
          aria-busy={isPending}
          className="signin-form__container"
        >
          <div className="signin-form__field">
            <label htmlFor="email" className="signin-form__label">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className={`signin-form__input ${
                formState?.error?.email ? "signin-form__input--error" : ""
              }`}
              defaultValue={formState?.data?.email}
              placeholder="example@email.com"
            />
            {formState?.error?.email?.errors &&
              formState.error.email.errors.length > 0 && (
                <p className="signin-form__error-text">
                  {formState.error.email.errors[0]}
                </p>
              )}
          </div>

          <div className="signin-form__field">
            <label htmlFor="password" className="signin-form__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`signin-form__input ${
                formState?.error?.password ? "signin-form__input--error" : ""
              }`}
              placeholder="example123"
            />
            {formState?.error?.password?.errors &&
              formState.error.password.errors.length > 0 && (
                <p className="signin-form__error-text">
                  {formState.error.password.errors[0]}
                </p>
              )}
          </div>

          <button
            type="submit"
            className="signin-form__submit-btn"
            disabled={isPending}
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>
          {formState?.success && (
            <div className="signin-form__success">{formState.message}</div>
          )}

          {formState?.errors && formState.errors.length > 0 && (
            <div className="signin-form__errors">
              {console.log(formState.errors)}
              {formState.errors.map((error, index) => (
                <div key={index} className="signin-form__error">
                  {error}
                </div>
              ))}
            </div>
          )}

          <Link href="/sign-up" className="signin-form__register-link">
            Don't have an account? Register
          </Link>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
