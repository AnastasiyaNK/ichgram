import { useState } from "react";
import { useLoginMutation } from "../../redux/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import type { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import css from "./LoginForm.module.css";
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
      // Зберігаємо користувача у Redux
      dispatch(setCredentials(res.user));
      // Переходимо в особистий кабінет
      navigate(`/profile/${res.user.id}`);
    } catch (err: unknown) {
     const rtkError = err as RTKError;
     setError(rtkError.data?.message || "Login failed");
   } 
  };

  return (
    <div>
      <div className={css.login}>
        <div className={css.logoWrapper}>
          <img className={css.logo} src={logoXl} alt="logo" />
        </div>
        <form className={css.registerForm} onSubmit={handleSubmit}>
          <div className={css.inputWrapper}>
            <input
              className={css.registerinput}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
            <input
              className={css.registerinput}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className={css.errorMsg}>{error}</p>}

          <button className={css.signUpBtn} type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className={css.divider}>
          <span className={css.line}></span>
          <span className={css.text}>OR</span>
          <span className={css.line}></span>
        </div>

        <div className={css.forgotPassWrapper}>
          <Link className={css.forgotPassLink} to="/reset">
            Forgot password?
          </Link>
        </div>
      </div>

      <div className={css.goLinkWrapper}>
        <p className={css.goLinkText}>Don't have an account?</p>
        <Link className={css.goToLink} to="/register">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
