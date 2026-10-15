import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleIcon } from "../components/icons";

/**
 * Sign up / log in form (Figma: "GlamVowsStudio Login").
 * There's no account backend yet, so a valid form shows a notice instead of
 * creating an account.
 */
export default function AuthPage({ mode = "signup" }) {
  const isSignup = mode === "signup";
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (isSignup && !values.name.trim()) errs.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Please enter a valid email.";
    if (values.password.length < 8) errs.password = "Use at least 8 characters.";
    return errs;
  };

  const comingSoon = "Accounts aren't open yet — we're getting them ready.";

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setNotice(comingSoon);
  };

  const fields = [
    ...(isSignup ? [{ id: "name", label: "Name:", type: "text", auto: "name" }] : []),
    { id: "email", label: "Email:", type: "email", auto: "email" },
    {
      id: "password",
      label: "Password:",
      type: "password",
      auto: isSignup ? "new-password" : "current-password",
    },
  ];

  return (
    <section className="auth">
      <div className="container">
        <h1 className="display auth__title">{isSignup ? "Sign Up" : "Log In"}</h1>

        <form className="auth__form" onSubmit={submit} noValidate>
          {fields.map((f) => (
            <div key={f.id} className="field">
              <label htmlFor={f.id}>{f.label}</label>
              <input
                id={f.id}
                type={f.type}
                autoComplete={f.auto}
                value={values[f.id]}
                onChange={set(f.id)}
                aria-invalid={!!errors[f.id]}
                aria-describedby={errors[f.id] ? `${f.id}-error` : undefined}
              />
              {errors[f.id] && (
                <p id={`${f.id}-error`} className="field__error">
                  {errors[f.id]}
                </p>
              )}
            </div>
          ))}

          <button type="submit" className="btn btn--solid btn--block">
            {isSignup ? "Sign up" : "Log in"}
          </button>
          <button
            type="button"
            className="btn btn--outline btn--block auth__google"
            onClick={() => setNotice(comingSoon)}
          >
            <GoogleIcon />
            {isSignup ? "Sign up with Google" : "Log in with Google"}
          </button>

          {notice && (
            <p className="auth__notice" role="status">
              {notice} <Link to="/collection">Browse collections</Link>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
