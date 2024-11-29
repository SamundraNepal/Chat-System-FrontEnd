import Styles from './forgotPassword.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UInput from '../../ReUseComponenets/Input';
import UButton from '../../ReUseComponenets/button';

export default function ForgotPasswordPage() {
  const [openModel, setOpenModel] = useState(false);

  useEffect(() => {
    setOpenModel(true);
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <div
      className={`${Styles.LogInPageContainer} ${
        openModel ? Styles.active : Styles.inActive
      }`}
    >
      <form className={Styles.ContainerSubPage} onSubmit={handleFormSubmit}>
        <div>
          <p>Forgot Password</p>
        </div>
        <UInput PlaceHolder={'Enter Email Address'} Type={'email'} />
        <div className={Styles.fromButton}>
          <UButton ButtonName={'Find Me'} ClassName={Styles.button} />

          <Link to="/">
            <UButton ButtonName={'Back'} ClassName={Styles.button} />
          </Link>
        </div>
      </form>
    </div>
  );
}
