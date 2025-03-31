import { useContext, useEffect, useState } from 'react';
import UButton from '../button';
import Style from './showFriends.module.css';

import { NotificationsContext, UserContext } from '../../until/useContext';
import { AcceptFriend, ReadUserNotifications } from '../../API/apiCalls';
import { toast, ToastContainer } from 'react-toastify';

export default function ShowFriends() {
  const { setShowFrnData, setShowFrn } = useContext(UserContext);
  const { getNotifications } = useContext(NotificationsContext);

  useEffect(() => {
    async function ReadNotifications() {
      try {
        const data = await ReadUserNotifications();

        if (!data.success) {
          console.log('failed notifications read successfull');
        } else {
          console.log('notifications read successfull');
        }
      } catch (err) {
        console.log('somwthing wrong with  notifications read ');
      }
    }

    ReadNotifications();
  }, []);

  function handleShowFrnData(el) {
    setShowFrn(true);
    setShowFrnData(el);
  }

  return (
    <div className={Style.Container}>
      <ToastContainer />
      <div>Notifications</div>
      {getNotifications.data.map((el, index) => {
        if (el.content_type === 'friend_request') {
          if (el.additional_content === 'Pending') {
            return (
              <HandleReceivedFriendRequest
                el={el}
                key={`pending-${index}`}
                handleShowFrnData={handleShowFrnData}
              />
            );
          } else {
            return (
              <DisplayAcceptedNotififations
                key={`accepted-${index}`}
                el={el}
                handleShowFrnData={handleShowFrnData}
              />
            );
          }
        }

        if (el.content_type === 'like') {
          return (
            <DisplayLikes
              handleShowFrnData={handleShowFrnData}
              el={el}
              text={'Liked your post'}
            />
          );
        }

        if (el.content_type === 'comment') {
          return (
            <DisplayLikes
              handleShowFrnData={handleShowFrnData}
              el={el}
              text={'Commented on your post'}
            />
          );
        }

        if (el.content_type === 'comlike') {
          return (
            <DisplayLikes
              handleShowFrnData={handleShowFrnData}
              el={el}
              text={'Liked your comment'}
            />
          );
        }

        if (el.content_type === 'comreply') {
          return (
            <DisplayLikes
              handleShowFrnData={handleShowFrnData}
              el={el}
              text={'replied to your comment'}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

function HandleReceivedFriendRequest({ handleShowFrnData, el }) {
  async function handleAcceptRequest(el) {
    try {
      const data = await AcceptFriend(el);

      if (data.success) {
        console.log(data);
      } else {
        toast.success(`You accepted ${el.firstName} friend request`);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <div
        className={`${
          el.is_read ? Style.mainContainer : Style.mainContainerUnRead
        }`}
      >
        <img
          onClick={() => handleShowFrnData(el)}
          className={Style.AvatarStyle}
          alt={'User'}
          src={el.user.imageURL}
        />
        <div className={Style.subContainer}>
          <span className={Style.UserName}>
            {el.user.firstName} {el.user.lastName} sent you a friend request
          </span>
          {/*            <span className={Style.mutalFrn}>10 Mutal Friends</span>
           */}{' '}
        </div>

        <div className={Style.frnRequestButtons}>
          <UButton
            ClassName={Style.Fbutton}
            ButtonName={'Accept'}
            handleFunction={(e) => handleAcceptRequest(el.id)}
          />
          <UButton ClassName={Style.Fbutton} ButtonName={'Reject'} />
        </div>
      </div>
    </>
  );
}

function DisplayAcceptedNotififations({ handleShowFrnData, el }) {
  return (
    <>
      <div
        className={`${
          el.is_read ? Style.mainContainer : Style.mainContainerUnRead
        }`}
      >
        <img
          onClick={() => handleShowFrnData(el)}
          className={Style.acceptedAvatarStyle}
          alt={'User'}
          src={el.user.imageURL}
        />
        <div className={Style.subContainer}>
          <span className={Style.UserName}>
            {el.user.firstName} {el.user.lastName} has accepted your friend
            request
          </span>
        </div>
      </div>
    </>
  );
}

function DisplayLikes({ handleShowFrnData, el, text }) {
  const {
    setShowFindFriends,
    SetShowProfile,
    setShowFrn,
    setFeed,
    setShowPost,
    setPostData,
  } = useContext(UserContext);

  function handleShowPost() {
    setFeed(false);
    SetShowProfile(false);
    setShowPost(true);
    setShowFindFriends(false);
    setShowFrn(false);
    setPostData(el);
  }

  return (
    <>
      <div
        className={`${
          el.is_read ? Style.mainContainer : Style.mainContainerUnRead
        }`}
      >
        <img
          onClick={() => handleShowFrnData(el)}
          className={Style.acceptedAvatarStyle}
          alt={'User'}
          src={el.user.imageURL}
        />
        <div className={Style.subContainer}>
          <span className={Style.UserName} onClick={handleShowPost}>
            {el.user.firstName} {el.user.lastName} {text}
          </span>
        </div>
      </div>
    </>
  );
}
