import Styles from './Login.module.css';
import UInput from '../Components/Input';
import UButton from '../Components/button';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { LogInUsers } from '../API/apiCalls';
import ErrorMessage from '../Components/message';
import Spinner from '../until/spinner/spinner';
import { AuthContext } from '../until/useContext';

export default function LoginUser() {
  const { setCredentials } = useContext(AuthContext);
  const [openModel, setOpenModel] = useState(false);
  const [formData, setFormData] = useState({
    emailAddress: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setOpenModel(true);
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const logInData = await LogInUsers(formData);
      if (!logInData.success) {
        setMessage(logInData.message);
        setIsLoading(false);
      } else {
        setMessage('');
        setIsLoading(false);
        setCredentials(true);
      }
    } catch (err) {
      console.log('something went wrong ', err.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      {!isLoading ? (
        <div
          className={`${Styles.LogInPageContainer} ${
            openModel ? Styles.active : Styles.inActive
          }`}
        >
          <form className={Styles.ContainerSubPage} onSubmit={handleFormSubmit}>
            <div>
              <p>Log In</p>
            </div>

            <UInput
              PlaceHolder={'Enter Email Address'}
              Type={'email'}
              Value={formData.emailAddress}
              OnChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  emailAddress: e.target.value,
                }))
              }
            />

            <UInput
              PlaceHolder={'Enter Password'}
              Type={'password'}
              Value={formData.password}
              OnChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <div className={Styles.fromButton}>
              <UButton ButtonName={'Log In'} ClassName={Styles.button} />
              <Link to="/signUp">
                <UButton ButtonName={'Sign Up'} ClassName={Styles.button} />
              </Link>

              <Link to="/forgotPassword">
                <UButton
                  ButtonName={'Forgot Password'}
                  ClassName={Styles.button}
                />
              </Link>
            </div>
            <ErrorMessage Message={message} ClassName={Styles.errorMessage} />
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
