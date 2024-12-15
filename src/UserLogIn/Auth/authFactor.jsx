import { useState } from 'react';
import UButton from '../../Components/button';
import UInput from '../../Components/Input';
import Style from './auth.module.css';
import { Link } from 'react-router-dom';
import Spinner from '../../until/spinner/spinner';
import { AuthUser } from '../../API/apiCalls';
import ErrorMessage from '../../Components/message';
import { useContext } from 'react';
import { AuthContext } from '../../until/useContext';

export default function AuthFactor() {
  const { setCredentials, setIsAuthenticated } = useContext(AuthContext);

  const [pin, setPin] = useState({
    value: '',
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

  return (
    <>
      {!isLoading ? (
        <div className={Style.LogInPageContainer}>
          <div className={Style.ContainerSubPage}>
            <span>Enter Six digits Code Below</span>
            <div className={Style.inputCodesDiv}>
              <UInput
                ClassName={Style.input}
                Type="number"
                Value={pin.value.slice(0, 1)}
                OnChange={(e) =>
                  setPin((prev) => ({ ...prev, value: e.target.value }))
                }
              />
              <UInput
                ClassName={Style.input}
                Type="number"
                Value={pin.value1.slice(0, 1)}
                OnChange={(e) =>
                  setPin((prev) => ({ ...prev, value1: e.target.value }))
                }
              />
              <UInput
                ClassName={Style.input}
                Type="number"
                Value={pin.value2.slice(0, 1)}
                OnChange={(e) =>
                  setPin((prev) => ({ ...prev, value2: e.target.value }))
                }
              />
              <UInput
                ClassName={Style.input}
                Type="number"
                Value={pin.value3.slice(0, 1)}
                OnChange={(e) =>
                  setPin((prev) => ({ ...prev, value3: e.target.value }))
                }
              />

              <UInput
                ClassName={Style.input}
                Type="number"
                Value={pin.value4.slice(0, 1)}
                OnChange={(e) =>
                  setPin((prev) => ({ ...prev, value4: e.target.value }))
                }
              />

              <UInput
                ClassName={Style.input}
                Type="number"
                Value={pin.value5.slice(0, 1)}
                OnChange={(e) =>
                  setPin((prev) => ({ ...prev, value5: e.target.value }))
                }
              />
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
