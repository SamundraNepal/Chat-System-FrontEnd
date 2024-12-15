import { useEffect, useState } from 'react';
import UButton from '../Components/button';
import UInput from '../Components/Input';
import Style from './UpdatePassword.module.css';
import { useContext } from 'react';
import { UserContext } from '../until/useContext';
import AvatarImage from '../Components/avatar';
import { useRef } from 'react';

export default function UpdateProfile({ userData }) {
  const [isOpen, setIsOpen] = useState(false);
  const { setUpdateProfilePicture } = useContext(UserContext);
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
      setUpdateProfilePicture(false);
    }
  };

  function handleClose() {
    setIsOpen(false);
    setUpdateProfilePicture(false);
  }

  return (
    <div
      ref={modalRef}
      className={`${Style.Container} ${
        isOpen ? Style.IsActive : Style.IsInActive
      }`}
    >
      <span>Profile Picture</span>

      <AvatarImage
        SRC={userData.user?.imageURL}
        W="120px"
        H="120px"
        ALT="user image"
      />

      <span>{userData.user?.firstName}</span>

      <UInput
        PlaceHolder={'Enter current Password'}
        ClassName={Style.profilePicInput}
        Type="file"
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
    </div>
  );
}
