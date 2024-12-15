import { useEffect, useRef, useState } from 'react';
import UButton from '../Components/button';
import UInput from '../Components/Input';
import Style from './UpdatePassword.module.css';
import { useContext } from 'react';
import { UserContext } from '../until/useContext';

export default function UpdateVisibility() {
  const [isOpen, setIsOpen] = useState(false);
  const { setUserVisibility } = useContext(UserContext);
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
      setUserVisibility(false);
    }
  };

  function handleClose() {
    setIsOpen(false);
    setUserVisibility(false);
  }

  return (
    <div
      ref={modalRef}
      className={`${Style.ContainerVisibility} ${
        isOpen ? Style.IsActive : Style.IsInActive
      }`}
    >
      <span>Visibility</span>

      <UInput
        PlaceHolder={'Enter current Password'}
        ClassName={Style.profilePicInput}
        Type="checkbox"
        Accept="image/png , image/jpeg"
      />

      <div className={Style.Subcontainer}>
        <UButton ButtonName={'Update'} ClassName={Style.button} />
        <UButton
          ButtonName={'Cancel'}
          ClassName={Style.button}
          handleFunction={handleClose}
        />
      </div>

      <span>
        Note: Enabling this option will make you appear offline in chats to
        other users.
      </span>
    </div>
  );
}
