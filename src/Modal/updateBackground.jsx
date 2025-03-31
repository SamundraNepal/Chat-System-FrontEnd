import { useEffect, useState } from 'react';
import UButton from '../Components/button';
import UInput from '../Components/Input';
import Style from './UpdatePassword.module.css';
import { useContext } from 'react';
import { UserContext } from '../until/useContext';
import AvatarImage from '../Components/avatar';
import { useRef } from 'react';
import { UpdateBackGroundPicture, UpdateProfilePicture } from '../API/apiCalls';
import Spinner from '../until/spinner/spinner';

export default function BackgroundChange() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setFormData] = useState('');
  const { seteditCoverPhoto, userData } = useContext(UserContext);
  const modalRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false); // Close the box
      seteditCoverPhoto(false);
    }
  };

  useEffect(() => {
    setIsOpen(true);

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.addEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  function handleClose() {
    setIsOpen(false);
    const timer = setTimeout(() => {
      seteditCoverPhoto(false);
    }, 500);

    return () => clearTimeout(timer);
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const data = await UpdateBackGroundPicture(form);

      if (!data.success) {
        setIsLoading(false);
      } else {
        handleClose();
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      throw new Error(err.message);
    }
  }

  return (
    <>
      <div
        ref={modalRef}
        className={`${Style.Container} ${
          isOpen ? Style.IsActive : Style.IsInActive
        }`}
      >
        {!isLoading ? (
          <div className={Style.ContSub}>
            <span>Background Image</span>

            {!form && (
              <AvatarImage
                SRC={userData.user?.imageURL}
                W="120px"
                H="120px"
                ALT="user image"
              />
            )}

            {form && (
              <AvatarImage
                SRC={URL.createObjectURL(form)}
                W="120px"
                H="120px"
                ALT="user image"
              />
            )}
            <span>{userData.user?.firstName}</span>

            <UInput
              PlaceHolder={'Enter current Password'}
              ClassName={Style.profilePicInput}
              Type="file"
              Accept="image/png , image/jpeg"
              OnChange={(e) => setFormData(e.target.files[0])}
            />

            <div className={Style.Subcontainer}>
              <UButton
                handleFunction={handleUpdateProfile}
                ButtonName={'Update'}
                ClassName={Style.button}
              />
              <UButton
                ButtonName={'Cancel'}
                ClassName={Style.button}
                handleFunction={handleClose}
              />
            </div>
          </div>
        ) : (
          <Spinner size={'small'} />
        )}
      </div>
    </>
  );
}
