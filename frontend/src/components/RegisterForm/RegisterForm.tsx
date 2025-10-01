import { useState } from "react";
import { useRegisterMutation } from "../../redux/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import type { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import css from "./RegisterForm.module.css";
import logoXl from "../../assets/images/logoXl.png";
import { Link } from "react-router-dom";

interface RTKError {
  data?: {
    message?: string;
  };
  status?: number;
}

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [register, { isLoading }] = useRegisterMutation();

 

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setError(null);

   try {
     const res = await register({ name, fullName, email, password }).unwrap();
     dispatch(setCredentials({ ...res.user, id: res.user._id }));
     navigate(`/home`);
   } catch (err: unknown) {
     const rtkError = err as RTKError;
     setError(rtkError.data?.message || "Registration failed");
   }
 };

  return (
    <div>
      <div className={css.register}>
        <div className={css.logoWrapper}>
          <img className={css.logo} src={logoXl} alt="logo" />
          <h2 className={css.logoTitle}>
            Sign up to see photos and videos from your friends.
          </h2>
        </div>
        <form className={css.registerForm} onSubmit={handleSubmit}>
          <div className={css.inputWrapper}>
            <input
              className={css.registerinput}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <input
              className={css.registerinput}
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              required
            />
            <input
              className={css.registerinput}
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="username"
              required
            />
            <input
              className={css.registerinput}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          {error && <p className={css.errorMsg}>{error}</p>}

          <button className={css.signUpBtn} type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>

      <div className={css.goLoginWrapper}>
        <p className={css.goLoginText}>Have an account?</p>
        <Link className={css.goLoginLink} to="/login">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
