import { useEffect, useRef, useState } from 'react';
import UButton from '../Components/button';
import UInput from '../Components/Input';
import Style from './UpdatePassword.module.css';
import { useContext } from 'react';
import { UserContext } from '../until/useContext';
import { BiSolidHide } from 'react-icons/bi';
import { BiShow } from 'react-icons/bi';
import { UpdateUserPassword } from '../API/apiCalls';
import ErrorMessage from '../Components/message';
import Spinner from '../until/spinner/spinner';

export default function UpdatePassword() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [canView1, SetCanView1] = useState(false);
  const [canView2, SetCanView2] = useState(false);
  const [canView3, SetCanView3] = useState(false);

  const [form, setFrom] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const { SetUpdatePassword } = useContext(UserContext);
  const modalRef = useRef(null);

  useEffect(() => {
    setIsOpen(true);

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.addEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false); // Close the box
      SetUpdatePassword(false);
    }
  };

  function handleClose() {
    setIsOpen(false);
    SetUpdatePassword(false);
  }

  function handleClickOne() {
    SetCanView1((prev) => !prev);
  }

  function handleClickTwo() {
    SetCanView2((prev) => !prev);
  }

  function handleClickThree() {
    SetCanView3((prev) => !prev);
  }

  async function handleUpdatePassword() {
    setLoading(true);
    try {
      const data = await UpdateUserPassword({ form });

      if (!data.success) {
        setMessage(data.message);
        setLoading(false);
      } else {
        SetUpdatePassword(false);
        setIsOpen(false);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      throw new Error('Failed to update password ' + err.message);
    }
  }

  return (
    <>
      <form
        onSubmit={handleUpdatePassword}
        ref={modalRef}
        className={`${Style.Container} ${
          isOpen ? Style.IsActive : Style.IsInActive
        }`}
      >
        {!isLoading ? (
          <div className={Style.ContainerTwo}>
            <span>Modify Password</span>
            <div className={Style.inputContainer}>
              <UInput
                PlaceHolder={'Enter current Password'}
                ClassName={Style.input}
                Type={!canView1 ? 'password' : 'text'}
                Value={form.currentPassword}
                OnChange={(e) =>
                  setFrom((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
              />

              <div className={Style.eyes} onClick={handleClickOne}>
                {!canView1 && <BiSolidHide />}
                {canView1 && <BiShow />}
              </div>
            </div>

            <div className={Style.inputContainer}>
              <UInput
                PlaceHolder={'Enter New Password'}
                ClassName={Style.input}
                Type={!canView2 ? 'password' : 'text'}
                Value={form.newPassword}
                OnChange={(e) =>
                  setFrom((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
              />
              <div className={Style.eyes}>
                <div className={Style.eyes} onClick={handleClickTwo}>
                  {!canView2 && <BiSolidHide />}
                  {canView2 && <BiShow />}
                </div>
              </div>
            </div>

            <div className={Style.inputContainer}>
              <UInput
                PlaceHolder={'Enter Confrim Password'}
                ClassName={Style.input}
                Type={!canView3 ? 'password' : 'text'}
                Value={form.confirmPassword}
                OnChange={(e) =>
                  setFrom((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />

              <div className={Style.eyes}>
                <div className={Style.eyes} onClick={handleClickThree}>
                  {!canView3 && <BiSolidHide />}
                  {canView3 && <BiShow />}
                </div>
              </div>
            </div>

            <div className={Style.Subcontainer}>
              <UButton ButtonName={'Update'} ClassName={Style.button} />
              <UButton
                ButtonName={'Cancel'}
                ClassName={Style.button}
                handleFunction={handleClose}
              />
            </div>
            <ErrorMessage Message={message} ClassName={Style.errorMessage} />
          </div>
        ) : (
          <Spinner size={'small'} />
        )}
      </form>
    </>
  );
}
