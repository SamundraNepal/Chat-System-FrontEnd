import Styles from './forgotPassword.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UInput from '../../Components/Input';
import UButton from '../../Components/button';
import { FindUserAccount, ResetUserPassword } from '../../API/apiCalls';
import ErrorMessage from '../../Components/message';
import Spinner from '../../until/spinner/spinner';

export default function ForgotPasswordPage() {
  const [openModel, setOpenModel] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({ E: '' });

  useEffect(() => {
    setOpenModel(true);
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await FindUserAccount({ email });
      if (!data.success) {
        setLoading(false);

        setMessage(data.message);
      } else {
        setPasswordReset(true);
        setLoading(false);
        setMessage('');
      }
    } catch (err) {
      setLoading(false);
      throw new Error('Something went wrong ' + err.message);
    }
  }

  return (
    <>
      {!loading ? (
        <>
          {!passwordReset ? (
            <div
              className={`${Styles.LogInPageContainer} ${
                openModel ? Styles.active : Styles.inActive
              }`}
            >
              <AppLogo />
              <form
                className={Styles.ContainerSubPage}
                onSubmit={handleFormSubmit}
              >
                <div>
                  <p>Forgot Password</p>
                </div>
                <UInput
                  PlaceHolder={'Enter Email Address'}
                  Type={'email'}
                  Value={email.E}
                  OnChange={(e) => setEmail({ E: e.target.value })}
                />
                <div className={Styles.fromButton}>
                  <UButton ButtonName={'Find Me'} ClassName={Styles.button} />

                  <Link to="/">
                    <UButton ButtonName={'Back'} ClassName={Styles.button} />
                  </Link>
                </div>
                <ErrorMessage
                  ClassName={Styles.errorMessage}
                  Message={message}
                />
              </form>
            </div>
          ) : (
            <ResetPassword
              setPasswordReset={setPasswordReset}
              message={message}
              setMessage={setMessage}
              setLoading={setLoading}
            />
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

function ResetPassword({ setPasswordReset, setMessage, message, setLoading }) {
  const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(false);
  const [form, setForm] = useState({
    code: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setOpenModel(true);
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await ResetUserPassword({ form });
      if (!data.success) {
        setLoading(false);
        setMessage(data.message);
      } else {
        setPasswordReset(true);
        setLoading(false);
        navigate('/');
      }
    } catch (err) {
      setLoading(false);
      throw new Error('Something went wrong ' + err.message);
    }
  }

  return (
    <div
      className={`${Styles.LogInPageContainer} ${
        openModel ? Styles.active : Styles.inActive
      }`}
    >
      <AppLogo />

      <form className={Styles.ContainerSubPage} onSubmit={handleFormSubmit}>
        <div>
          <p>Reset Password</p>
        </div>
        <UInput
          PlaceHolder={'Enter code'}
          Type={'number'}
          Value={form.code}
          OnChange={(e) =>
            setForm((prev) => ({ ...prev, code: e.target.value }))
          }
        />
        <UInput
          PlaceHolder={'New Password'}
          Type={'password'}
          Value={form.password}
          OnChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <UInput
          PlaceHolder={'Confirm Password'}
          Type={'password'}
          Value={form.confirmPassword}
          OnChange={(e) =>
            setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
          }
        />

        <div className={Styles.fromButton}>
          <UButton ButtonName={'Reset'} ClassName={Styles.button} />

          <Link to="/">
            <UButton ButtonName={'Back'} ClassName={Styles.button} />
          </Link>
        </div>
        <ErrorMessage ClassName={Styles.errorMessage} Message={message} />
      </form>
    </div>
  );
}

function AppLogo() {
  return (
    <div className={Styles.appLogo}>
      <div className={Styles.logoName}>
        <h1>Buzz</h1>
      </div>
      <div className={Styles.logoImageAndName}>
        <img src="/TarangLogo.png" height={400} width={400} alt="appLogo" />
      </div>
    </div>
  );
}
