import { useState } from "react";
import { useLoginMutation } from "../../redux/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import type { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import style from "./LoginForm.module.css";
import logoXl from "../../assets/images/logoXl.png";
import { Link } from "react-router-dom";

interface RTKError {
  data?: {
    message?: string;
  };
  status?: number;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

    const [login, { isLoading }] = useLoginMutation();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res.user, id: res.user._id }));
      navigate(`/home`);
    } catch (err: unknown) {
     const rtkError = err as RTKError;
     setError(rtkError.data?.message || "Login failed");
   } 
  };

  return (
    <div>
      <div className={style .login}>
        <div className={style .logoWrapper}>
          <img className={style .logo} src={logoXl} alt="logo" />
        </div>
        <form className={style .registerForm} onSubmit={handleSubmit}>
          <div className={style .inputWrapper}>
            <input
              className={style .registerinput}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
            <input
              className={style.registerinput}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className={style.errorMsg}>{error}</p>}

          <button className={style.signUpBtn} type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className={style.divider}>
          <span className={style.line}></span>
          <span className={style.text}>OR</span>
          <span className={style.line}></span>
        </div>

        <div className={style.forgotPassWrapper}>
          <Link className={style.forgotPassLink} to="/reset">
            Forgot password?
          </Link>
        </div>
      </div>

      <div className={style.goLinkWrapper}>
        <p className={style.goLinkText}>Don't have an account?</p>
        <Link className={style.goToLink} to="/register">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
