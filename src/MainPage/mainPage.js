import { AiOutlineAudio } from 'react-icons/ai';
import { IoSendSharp } from 'react-icons/io5';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';

import UButton from '../Components/button';
import { IoPeopleCircleOutline } from 'react-icons/io5';

import Style from './mainPage.module.css';
import AvatarImage from '../Components/avatar';
import { useContext, useEffect, useState } from 'react';
import { GetUserData } from '../API/apiCalls';
import UserDetails from './UserDetails/userDetails';
import UpdatePassword from '../Modal/UpdatePassword';
import { UserContext } from '../until/useContext';
import UpdateProfile from '../Modal/updateProfile';
import UpdateVisibility from '../Modal/visibility';

export default function MainArea() {
  const [userData, setUserData] = useState({});
  const {
    updatePassword,
    updateProfilePicture,
    visibility,
    userDetails,
    setOpenUserDetails,
  } = useContext(UserContext);

  useEffect(() => {
    async function GetLoggedUserData() {
      try {
        const data = await GetUserData();
        if (data.success) {
          setUserData(data.message);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        throw new Error('Failed to get user data ' + err.message);
      }
    }

    GetLoggedUserData();
  }, []);

  return (
    <div className={Style.mainArea}>
      <div className={Style.container}>
        <div className={Style.activePeople}>
          <div className={Style.activeCount}>
            <span>Active: 5</span>
          </div>
          <div className={Style.currentActive}>
            <div className={Style.peopleStat}>
              <IoPeopleCircleOutline />
              <div className={Style.activeStatus}></div>
            </div>

            <div className={Style.peopleStat}>
              <IoPeopleCircleOutline />
              <div className={Style.activeStatus}></div>
            </div>

            <div className={Style.peopleStat}>
              <IoPeopleCircleOutline />
              <div className={Style.activeStatus}></div>
            </div>
          </div>
        </div>

        <div className={Style.messageArea}>
          <div className={Style.messageButtonArea}>
            <UButton ButtonName={'Chats'} ClassName={Style.button} />
            <UButton ButtonName={'Find Friends'} ClassName={Style.button} />
            <UButton ButtonName={'Friends'} ClassName={Style.button} />

            <div>
              <AvatarImage
                SRC={userData.user?.imageURL}
                W="80px"
                H="80px"
                ALT="This is user image"
                Click={(e) => setOpenUserDetails((prev) => !prev)}
              />
              {userDetails && <UserDetails />}
            </div>
          </div>
          <div className={Style.chats}>show here</div>
        </div>

        <div className={Style.chatArea}>
          <div className={Style.chatting}></div>
          <div className={Style.subChatArea}>
            <MdOutlinePhotoSizeSelectActual />
            <AiOutlineAudio />
            <input
              placeholder="Write message"
              type="text"
              className={Style.chatInput}
            />
            <IoSendSharp />
          </div>
        </div>

        <div>
          {updatePassword && <UpdatePassword />}

          {updateProfilePicture && <UpdateProfile userData={userData} />}

          {visibility && <UpdateVisibility />}
        </div>
      </div>
    </div>
  );
}
