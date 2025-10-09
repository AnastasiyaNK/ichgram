import { useState } from "react";
import { useRegisterMutation } from "../../redux/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import type { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import style from "./RegisterForm.module.css";
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
     dispatch(setCredentials(res.user));
     navigate(`/home`);
   } catch (err: unknown) {
     const rtkError = err as RTKError;
     setError(rtkError.data?.message || "Registration failed");
   }
 };

  return (
    <div>
      <div className={style.register}>
        <div className={style.logoWrapper}>
          <img className={style.logo} src={logoXl} alt="logo" />
          <h2 className={style.logoTitle}>
            Sign up to see photos and videos from your friends.
          </h2>
        </div>
        <form className={style.registerForm} onSubmit={handleSubmit}>
          <div className={style.inputWrapper}>
            <input
              className={style.registerinput}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <input
              className={style.registerinput}
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              required
            />
            <input
              className={style.registerinput}
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="username"
              required
            />
            <input
              className={style.registerinput}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          {error && <p className={style.errorMsg}>{error}</p>}

          <button className={style.signUpBtn} type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>

      <div className={style.goLoginWrapper}>
        <p className={style.goLoginText}>Have an account?</p>
        <Link className={style.goLoginLink} to="/login">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
