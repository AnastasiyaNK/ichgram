
import css from './RegisterForm.module.css'
import logoXl from '../../assets/images/logoXl.png'
const RegisterForm = () => {
  return (
    <div>
      <div className={css.register}>
        <div className={css.logoWrapper}>
          <img className={css.logo} src={logoXl} alt="logo" />
          <h2 className={css.logoTitle}>
            Sign up to see photos and videos from your friends.
          </h2>
        </div>
        <form className={css.registerForm}>
          <div className={css.inputWrapper}>
            <input
              className={css.registerinput}
              type="text"
              placeholder="Email"
            />
            <input
              className={css.registerinput}
              type="text"
              placeholder="Full Name"
            />
            <input
              className={css.registerinput}
              type="text"
              placeholder="Username"
            />
            <input
              className={css.registerinput}
              type="text"
              placeholder="Password"
            />
          </div>

          <p className={css.text}>
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <span>
              <a className={css.link} href="">
                Learn More
              </a>
            </span>
          </p>
          <p className={css.text}>
            By signing up, you agree to our
            <span>
              <a className={css.link} href="">
                Terms
              </a>
            </span>
            ,{" "}
            <span>
              <a className={css.link} href="">
                Privacy Policy
              </a>
            </span>{" "}
            and{" "}
            <span>
              <a className={css.link} href="">
                Cookies Policy
              </a>
            </span>
          </p>

          <button className={css.signUpBtn}>Sign Up</button>
        </form>
      </div>
      <div className={css.goLoginWrapper}>
        <p className={css.goLoginText}>Have an account?</p>
        <a className={css.goLoginLink} href="">
          Log in
        </a>
      </div>
    </div>
  );
}

export default RegisterForm