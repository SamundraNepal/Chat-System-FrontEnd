import { useRef, useState } from 'react';
import UButton from '../../Components/button';
import Style from './auth.module.css';
import { Link } from 'react-router-dom';
import Spinner from '../../until/spinner/spinner';
import { AuthUser } from '../../API/apiCalls';
import ErrorMessage from '../../Components/message';
import { useContext } from 'react';
import { AuthContext } from '../../until/useContext';

export default function AuthFactor() {
  const { setCredentials, setIsAuthenticated } = useContext(AuthContext);
  const inputs = useRef([]);
  const [pin, setPin] = useState({
    value0: '',
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, Setmessage] = useState('');
  const [numberOfTry, SetNumberOfTry] = useState(3);

  function handleBack() {
    setCredentials(false);
  }

  async function handleAuth() {
    setIsLoading(true);
    try {
      const auth = await AuthUser(pin);
      if (!auth.success) {
        Setmessage(auth.message.message);
        SetNumberOfTry((prev) => prev - 1);
        if (numberOfTry <= 0) {
          setCredentials(false);
        }
        setIsLoading(false);
      } else {
        console.log(document.cookie);
        setIsAuthenticated(true);
        Setmessage('');
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);

      throw new Error('Failed to authenticate user ' + err.message);
    }
  }

  function handleChange(e, index) {
    const { value } = e.target;

    //allow only single number
    if (value.length > 1) return;

    setPin((prev) => ({ ...prev, [`value${index}`]: value }));

    if (value && inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    }
  }

  return (
    <>
      {!isLoading ? (
        <div className={Style.LogInPageContainer}>
          <AppLogo />
          <div className={Style.ContainerSubPage}>
            <span>Enter Six digits Code Below</span>
            <div className={Style.inputCodesDiv}>
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  ref={(el) => (inputs.current[index] = el)} // Assign input refs
                  className={Style.input}
                  type="number"
                  value={pin[`value${index}`]}
                  onChange={(e) => handleChange(e, index)}
                />
              ))}
            </div>
            <div className={Style.buttonDiv}>
              <UButton
                ButtonName={'Submit'}
                handleFunction={handleAuth}
                ClassName={Style.button}
              />
              <Link a="/">
                <UButton
                  ButtonName={'Back'}
                  ClassName={Style.button}
                  handleFunction={handleBack}
                />
              </Link>
            </div>
            <ErrorMessage Message={message} ClassName={Style.errorMessage} />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

function AppLogo() {
  return (
    <div className={Style.appLogo}>
      <div className={Style.logoName}>
        <h1>Tarang</h1>
      </div>
      <div className={Style.logoImageAndName}>
        <img src="/TarangLogo.png" height={400} width={400} alt="appLogo" />
      </div>
    </div>
  );
}
