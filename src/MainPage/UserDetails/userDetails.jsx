import { useContext, useEffect, useState } from 'react';
import UButton from '../../Components/button';
import Style from './userDetails.module.css';
import { GetUserLogOut } from '../../API/apiCalls';
import { AuthContext, UserContext } from '../../until/useContext';

export default function UserDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const { setCredentials, setIsAuthenticated } = useContext(AuthContext);
  const {
    SetUpdatePassword,
    setUpdateProfilePicture,
    setUserVisibility,
    setOpenUserDetails,
  } = useContext(UserContext);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  async function handleLogOut() {
    try {
      const data = await GetUserLogOut();

      if (data.success) {
        setIsAuthenticated(false);
        setCredentials(false);
      } else {
        console.log('Failed to logged out');
      }
    } catch (err) {
      console.log('Failed to logged out');
    }
  }

  function handleUpdatePassword() {
    SetUpdatePassword((prev) => !prev);
    setIsOpen(false);
    setOpenUserDetails(false);
  }

  function handleUpdateProfilePicture() {
    setUpdateProfilePicture((prev) => !prev);
    setIsOpen(false);
    setOpenUserDetails(false);
  }

  function handleVisibility() {
    setUserVisibility((prev) => !prev);
    setIsOpen(false);
    setOpenUserDetails(false);
  }

  return (
    <div
      className={`${Style.Container} ${isOpen ? Style.Active : Style.inActive}`}
    >
      <div className={Style.SubContainer}>
        <UButton
          ButtonName={'Update Password'}
          ClassName={Style.button}
          handleFunction={handleUpdatePassword}
        />
        <UButton
          ButtonName={'Update Profile'}
          ClassName={Style.button}
          handleFunction={handleUpdateProfilePicture}
        />
        <UButton
          ButtonName={'Visibility'}
          ClassName={Style.button}
          handleFunction={handleVisibility}
        />
        <UButton
          ButtonName={'Log Out'}
          ClassName={Style.button}
          handleFunction={handleLogOut}
        />
      </div>
    </div>
  );
}
