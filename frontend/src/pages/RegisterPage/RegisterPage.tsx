
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import css from './RegisterPage.module.css'
const RegisterPage = () => {
    return (
        <section className={css.container}>
            <RegisterForm />
        </section>
    );
}

export default RegisterPage