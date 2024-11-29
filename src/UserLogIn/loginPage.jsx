import Styles from './Login.module.css';
import UInput from '../ReUseComponenets/Input';
import UButton from '../ReUseComponenets/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function LoginUser() {
  const [openModel, setOpenModel] = useState(false);

  useEffect(() => {
    setOpenModel(true);
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log('form submit');
  }

  return (
    <div
      className={`${Styles.LogInPageContainer} ${
        openModel ? Styles.active : Styles.inActive
      }`}
    >
      <form className={Styles.ContainerSubPage} onSubmit={handleFormSubmit}>
        <div>
          <p>Log In</p>
        </div>
        <UInput PlaceHolder={'Enter Email Address'} Type={'email'} />
        <UInput PlaceHolder={'Enter Password'} Type={'password'} />
        <div className={Styles.fromButton}>
          <UButton ButtonName={'Log In'} ClassName={Styles.button} />
          <Link to="/signUp">
            <UButton ButtonName={'Sign Up'} ClassName={Styles.button} />
          </Link>

          <Link to="/forgotPassword">
            <UButton ButtonName={'Forgot Password'} ClassName={Styles.button} />
          </Link>
        </div>
      </form>
    </div>
  );
}
