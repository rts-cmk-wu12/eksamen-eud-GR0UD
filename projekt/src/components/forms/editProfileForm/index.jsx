"use client";
import { FaUserCircle } from "react-icons/fa";
import { updateUser } from "./profile-editor-action";
import { useActionState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserData from "@/hooks/useUserData";

export default function ProfileForm() {
  const [formState, formAction, isPending] = useActionState(updateUser, {});
  const {
    userData,
    loading: userDataLoading,
    error: userDataError,
  } = useUserData();

  useEffect(() => {
    if (formState?.success) {
      toast.success("Profile updated!");
    }
    if (formState?.error?.global?.errors) {
      toast.error(formState.error.global.errors[0]);
    }
  }, [formState]);

  if (userDataLoading) {
    return (
      <div className="profile-form">
        <div className="profile-form__loading">Loading user data...</div>
      </div>
    );
  }

  if (userDataError) {
    return (
      <div className="profile-form">
        <div className="profile-form__error">
          Failed to load user data: {userDataError.message}
        </div>
      </div>
    );
  }

  return (
    <div className="profile-form">
      <ToastContainer />
      <form action={formAction} className="profile-form__container">
        <div className="profile-form__icon-wrapper">
          <FaUserCircle className="profile-form__icon" />
        </div>
        <div className="profile-form__name-row">
          <div className="profile-form__field profile-form__field--half">
            <label htmlFor="firstname" className="profile-form__label">
              Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className={`profile-form__input ${
                formState?.error?.firstname ? "profile-form__input--error" : ""
              }`}
              placeholder={userData?.firstname || "John"}
              defaultValue={formState?.data?.firstname}
            />
            {formState?.error?.firstname?.errors &&
              formState.error.firstname.errors.length > 0 && (
                <p className="profile-form__error-text">
                  {formState.error.firstname.errors[0]}
                </p>
              )}
          </div>

          <div className="profile-form__field profile-form__field--half">
            <label htmlFor="lastname" className="profile-form__label">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className={`profile-form__input ${
                formState?.error?.lastname ? "profile-form__input--error" : ""
              }`}
              placeholder={userData?.lastname || "Doe"}
              defaultValue={formState?.data?.lastname}
            />
            {formState?.error?.lastname?.errors &&
              formState.error.lastname.errors.length > 0 && (
                <p className="profile-form__error-text">
                  {formState.error.lastname.errors[0]}
                </p>
              )}
          </div>
        </div>

        <div className="profile-form__field">
          <label htmlFor="email" className="profile-form__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`profile-form__input ${
              formState?.error?.email ? "profile-form__input--error" : ""
            }`}
            placeholder={userData?.email || "email@example.com"}
            defaultValue={formState?.data?.email}
          />
          {formState?.error?.email?.errors &&
            formState.error.email.errors.length > 0 && (
              <p className="profile-form__error-text">
                {formState.error.email.errors[0]}
              </p>
            )}
        </div>

        <div className="profile-form__field">
          <label htmlFor="password" className="profile-form__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`profile-form__input ${
              formState?.error?.password ? "profile-form__input--error" : ""
            }`}
            placeholder="example123"
          />
          {formState?.error?.password?.errors &&
            formState.error.password.errors.length > 0 && (
              <p className="profile-form__error-text">
                {formState.error.password.errors[0]}
              </p>
            )}
        </div>

        <button
          type="submit"
          className="profile-form__submit-btn"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
