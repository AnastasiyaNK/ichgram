import LoginForm from "../../components/LoginForm/LoginForm"
import heroIcon from '../../assets/images/background.png'
import css from './LoginPage.module.css'


const LoginPage = () => {
  return (
    <section className={css.loginContainer}>
      <div className={css.heroIconWrapper}>
        <img src={heroIcon} alt="" />
      </div>
      <div className={css.logoFormWrapper}>
        <LoginForm />
      </div>
    </section>
  );
}

export default LoginPage
