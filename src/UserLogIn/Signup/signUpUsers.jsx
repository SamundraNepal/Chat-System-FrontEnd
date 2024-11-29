import Styles from './Signup.module.css';
import UInput from '../../ReUseComponenets/Input';
import UButton from '../../ReUseComponenets/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SignUpUsers() {
  const [openModel, setOpenModel] = useState(false);

  useEffect(() => {
    setOpenModel(true);
  }, []);

  return (
    <div
      className={`${Styles.LogInPageContainer} ${
        openModel ? Styles.active : Styles.inActive
      }`}
    >
      <form className={Styles.ContainerSubPage}>
        <div>
          <p>Sign Up</p>
        </div>

        <div className={Styles.indivualsDiv}>
          <span>First Name </span>
          <UInput PlaceHolder={'First Name'} Type={'text'} />
        </div>

        <div className={Styles.indivualsDiv}>
          <span>Last Name </span>
          <UInput PlaceHolder={'Last Name'} Type={'text'} />
        </div>

        <div className={Styles.indivualsDiv}>
          <span>Phone Number </span>
          <UInput PlaceHolder={'Enter Phone Number'} Type={'number'} />
        </div>

        <div className={Styles.indivualsDiv}>
          <span>Email Address </span>
          <UInput PlaceHolder={'Enter Email Address'} Type={'email'} />
        </div>

        <div className={Styles.indivualsDiv}>
          <span>Password </span>
          <UInput PlaceHolder={'Enter Password'} Type={'password'} />
        </div>

        <div className={Styles.indivualsDiv}>
          <span>Confirm Password </span>
          <UInput PlaceHolder={'Confirm Password'} Type={'password'} />
        </div>

        <div className={Styles.indivualsDiv}>
          <span>Date Of Birth </span>
          <UInput PlaceHolder={'Enter Password'} Type={'Date'} />
        </div>

        <div className={Styles.fromButton}>
          <Link to="/">
            <UButton ButtonName={'Back'} ClassName={Styles.button} />
          </Link>
          <UButton ButtonName={'Create Account'} ClassName={Styles.button} />
        </div>
      </form>
    </div>
  );
}
