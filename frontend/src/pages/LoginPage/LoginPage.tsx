import LoginForm from "../../components/LoginForm/LoginForm"
import heroIcon from '../../assets/images/background.png'
import style from "./LoginPage.module.css";


const LoginPage = () => {
  return (
    <section className={style.loginContainer}>
      <div className={style.heroIconWrapper}>
        <img src={heroIcon} alt="" />
      </div>
      <div className={style.logoFormWrapper}>
        <LoginForm />
      </div>
    </section>
  );
}

export default LoginPage
