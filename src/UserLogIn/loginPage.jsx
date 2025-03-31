import Styles from './Login.module.css';
import UInput from '../Components/Input';
import UButton from '../Components/button';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { LogInUsers } from '../API/apiCalls';
import Spinner from '../until/spinner/spinner';
import { AuthContext } from '../until/useContext';
import { toast, ToastContainer } from 'react-toastify';

export default function LoginUser() {
  const { setCredentials } = useContext(AuthContext);
  const [openModel, setOpenModel] = useState(false);
  const [formData, setFormData] = useState({
    emailAddress: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setOpenModel(true);
  }, []);

  const toastError = (response) => {
    toast.error(response, {
      position: 'bottom-right',
    });
  };

  async function handleFormSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const logInData = await LogInUsers(formData);
      if (!logInData.success) {
        toastError(logInData.message);

        setIsLoading(false);
      } else {
        setIsLoading(false);
        setCredentials(true);
      }
    } catch (err) {
      toastError(err.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />

      {!isLoading ? (
        <div
          className={`${Styles.LogInPageContainer} ${
            openModel ? Styles.active : Styles.inActive
          }`}
        >
          <div className={Styles.appLogo}>
            <div className={Styles.logoName}>
              <h1>Buzz</h1>
            </div>
            <div className={Styles.logoImageAndName}>
              <img
                src="/TarangLogo.png"
                height={400}
                width={400}
                alt="appLogo"
              />
            </div>
          </div>
          <form className={Styles.ContainerSubPage} onSubmit={handleFormSubmit}>
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
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
