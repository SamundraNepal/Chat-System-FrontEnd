import { AiOutlineAudio } from 'react-icons/ai';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import { FaHome } from 'react-icons/fa';

import UButton from '../Components/button';
import Style from './mainPage.module.css';
import AvatarImage from '../Components/avatar';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  CreateMediaChats,
  GetUserData,
  GetUserNotifications,
  ReceivedFriend,
  SendChats,
} from '../API/apiCalls';
import UpdatePassword from '../Modal/UpdatePassword';
import {
  FileUploads,
  NotificationsContext,
  UserContext,
  UserMessages,
} from '../until/useContext';
import UpdateProfile from '../Modal/updateProfile';
import UpdateVisibility from '../Modal/visibility';
import ShowChats from '../Components/Chats/showChats';
import ShowFindFriends from '../Components/FindFriends/showFindFirends';
import ShowFriends from '../Components/Friends/showFriends';
import ProfilePage from '../Components/Profile/profilePage';
import EditBio from '../Modal/editBio';
import BackgroundChange from '../Modal/updateBackground';
import CreatePost from '../Modal/createPost';
import ShowUserProfile from '../Components/Profile/showUserProfile';
import Feed from '../Components/Feed/Feed';
import ShowClickedPost from '../Components/Post/displayPost';
import AudioRecordFunction from '../Components/audioRecord';
import { PiWaveformBold } from 'react-icons/pi';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { RiSendPlaneFill } from 'react-icons/ri';

export default function MainArea() {
  const {
    ShowProfile,
    OpenChats,
    userData,
    setUserData,
    reFetchData,
    setRefetchData,
    showFrn,
    feed,
    showPost,
  } = useContext(UserContext);

  const { setAllFriendRequest, setGetNotifications } =
    useContext(NotificationsContext);
  useEffect(() => {
    async function GetLoggedUserData() {
      if (reFetchData) {
        setRefetchData(false);
      }
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

    async function GetUserFriendRequest() {
      try {
        const data = await ReceivedFriend();

        if (!data.success) {
          console.log(data);
        } else {
          setAllFriendRequest(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    async function GetNotifications() {
      try {
        const data = await GetUserNotifications();

        if (!data.success) {
          console.log(data);
        } else {
          setGetNotifications(data);
          console.log(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    GetNotifications();
    GetUserFriendRequest();
    GetLoggedUserData();
  }, [reFetchData]);

  return (
    <div className={Style.mainArea}>
      <div className={Style.container}>
        <div className={Style.messageArea}>
          <Buttons userData={userData} />
          <ShowChatsFriends />
        </div>
        {ShowProfile && <UserProfilePage />}
        {showFrn && <FrnProfilePage />}
        {OpenChats && <ChatArea />}
        {feed && <Feed />}
        {!showPost && !ShowProfile && !OpenChats && !showFrn && !feed && (
          <WelcomePack />
        )}
        {showPost && <ShowClickedPost />}
        <Modals userData={userData} />
      </div>
    </div>
  );
}

function Buttons({ userData }) {
  const {
    setOpenChats,
    setShowChats,
    setShowFriends,
    setShowFindFriends,
    SetShowProfile,
    setShowFrn,
    setFeed,
    setShowPost,
  } = useContext(UserContext);

  const { getNotifications } = useContext(NotificationsContext);
  const [notifications, setNotifications] = useState(0);

  // read notifications count
  useEffect(() => {
    if (getNotifications?.data) {
      const unReadCount = getNotifications.data.filter(
        (el) => !el.is_read,
      ).length;

      setNotifications(unReadCount);
    }
  }, [getNotifications]);

  function handleShowChats() {
    setShowChats(true);
    setShowFriends(false);
    setShowFindFriends(false);
    setShowFrn(false);
    setFeed(false);
    SetShowProfile(false);
    setShowPost(false);
  }

  function handleShowFriends() {
    setShowChats(false);
    setShowFriends(true);
    setShowFindFriends(false);
    setShowFrn(false);
    setFeed(false);
    SetShowProfile(false);
    setShowPost(false);
    setOpenChats(false);
  }

  function handleShowFindFriends() {
    setShowFindFriends(true);
    setShowChats(false);
    setShowFriends(false);
    setFeed(false);
    SetShowProfile(false);
    setShowPost(false);
    setOpenChats(false);
  }

  function handleOpeProfile() {
    SetShowProfile((prev) => !prev);
    setOpenChats(false);
    setShowFrn(false);
    setShowFriends(false);
    setShowFindFriends(false);
    setShowChats(false);
    setFeed(false);
    setShowPost(false);
  }

  function hanndleOpenFeed() {
    setFeed((prev) => !prev);
    setOpenChats(false);
    setShowFrn(false);
    setShowFriends(false);
    setShowFindFriends(false);
    setShowChats(false);
    SetShowProfile(false);
    setShowPost(false);
  }

  return (
    <div className={Style.messageButtonArea}>
      <div className={Style.messageButtonAreaSub}>
        <UButton
          ButtonName={'Chats'}
          ClassName={Style.button}
          handleFunction={handleShowChats}
        />

        {/* <div className={Style.notifications}>
          <p>5</p>
        </div>*/}
      </div>

      <div className={Style.messageButtonAreaSub}>
        <UButton
          ButtonName={'Find Friends'}
          ClassName={Style.button}
          handleFunction={handleShowFindFriends}
        />
      </div>

      <div className={Style.messageButtonAreaSub}>
        <UButton
          ButtonName={'Notifications'}
          ClassName={Style.button}
          handleFunction={handleShowFriends}
        />

        {notifications > 0 && (
          <div className={Style.notifications}>
            <p>{notifications}</p>
          </div>
        )}
      </div>

      <div className={Style.FeedType}>
        <div>
          <AvatarImage
            SRC={userData.user?.imageURL}
            W={60}
            H={60}
            ALT="This is user image"
            Click={handleOpeProfile}
          />
        </div>

        <div onClick={hanndleOpenFeed} className={Style.mainFeedButton}>
          <FaHome />
        </div>
      </div>
    </div>
  );
}

function ShowChatsFriends() {
  const { showChats, showFriends, showFindFriends } = useContext(UserContext);

  return (
    <div className={Style.chats}>
      {showChats && <ShowChats />}
      {showFindFriends && <ShowFindFriends />}
      {showFriends && <ShowFriends />}
    </div>
  );
}

function ChatArea() {
  const [isRecordPress, setIsRecordPress] = useState(false);
  const [selectedfiles, setSelectedFiles] = useState(null);
  const { audioBlob } = useContext(FileUploads);
  const { userTalking } = useContext(UserContext);
  const Audioref = useRef();
  const [messageAudio, setMessageAudio] = useState('');
  const [playAudio, setplayAudio] = useState(false);
  const { userData } = useContext(UserContext);
  const { messages, setMessages } = useContext(UserMessages);

  const lastMessageRef = useRef(null);

  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'webm'];

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Runs when `messages` change

  function handlePressRecord() {
    setIsRecordPress((prev) => !prev);
  }

  async function handelMessage() {
    try {
      const data = await SendChats(userTalking.id, audioBlob);
      if (!data.success) {
        console.log(data);
      } else {
        const audioURL = URL.createObjectURL(audioBlob);

        setMessages((prev) => {
          if (!prev || prev.length === 0) {
            return [
              {
                content: audioURL,
                type: 'audio/wav',
                receiver: userTalking,
                sender: userData.user,
              },
            ];
          } else {
            return [
              ...prev,
              {
                content: audioURL,
                type: 'audio/wav',
                receiver: userTalking,
                sender: userData.user,
              },
            ];
          }
        });
        setIsRecordPress(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handlePostMedia() {
    try {
      const data = await CreateMediaChats(userTalking.id, selectedfiles);

      if (!data.success) {
        console.log(data);
      } else {
        const mediaFormat = URL.createObjectURL(selectedfiles);

        setMessages((prev) => {
          if (!prev || prev.length === 0) {
            return [
              {
                content: mediaFormat,
                type: selectedfiles?.type?.startsWith('image')
                  ? 'image/jpeg'
                  : 'video/mov', // Store MIME type

                receiver: userData.user,
                sender: userData.user,
              },
            ];
          } else {
            return [
              ...prev,
              {
                content: mediaFormat,
                type: selectedfiles?.type?.startsWith('image')
                  ? 'image/jpeg'
                  : 'video/mov', // Store MIME type

                receiver: userData.user,
                sender: userData.user,
              },
            ];
          }
        });

        setSelectedFiles(null);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleCloseFiles() {
    setSelectedFiles(null);
  }

  useEffect(() => {
    if (!Audioref.current) return;

    if (playAudio && messageAudio) {
      // Load metadata to get duration

      Audioref.current.play();
      Audioref.current.onended = () => {
        setplayAudio(false);
      };
    } else {
      Audioref.current.pause();
    }
  }, [messageAudio, playAudio]);

  return (
    <div className={Style.chatArea}>
      <audio ref={Audioref} src={messageAudio}>
        Your browser does not support this
      </audio>

      <div className={Style.chatting}>
        <div className={Style.ChatuserDetails}>
          <img src={userTalking.imageURL} alt="userimage" />
          <label>
            {userTalking.firstName} {userTalking.lastName}
          </label>
        </div>

        <div className={Style.mainChatArea}>
          {messages?.map((el, index) => {
            if (!el.content) return null; // Ensure content exists

            const extension = el.content.split('.').pop().toLowerCase(); // Normalize extensions

            return (
              <div
                key={index}
                ref={index === messages.length - 1 ? lastMessageRef : null}
                className={Style.messageWrapper}
              >
                {extension === 'wav' || el?.type?.startsWith('audio/') ? (
                  <Messages
                    el={el}
                    setMessageAudio={setMessageAudio}
                    setplayAudio={setplayAudio}
                    playAudio={playAudio}
                    Audioref={Audioref}
                  />
                ) : imageExtensions.includes(extension) ||
                  el?.type?.startsWith('image/') ? (
                  <DisplayImage el={el} />
                ) : videoExtensions.includes(extension) ||
                  el?.type?.startsWith('video/') ? (
                  <DiplayVideo el={el} />
                ) : null}
              </div>
            );
          })}
        </div>

        {isRecordPress && (
          <div className={Style.audioRecording}>
            <AudioRecordFunction audioSubmitfunction={handelMessage} />
          </div>
        )}
      </div>

      {selectedfiles != null && (
        <div className={Style.showImage}>
          <IoIosCloseCircleOutline
            className={Style.closeButton}
            onClick={handleCloseFiles}
          />
          {selectedfiles?.type?.startsWith('image/') ? (
            <img src={URL.createObjectURL(selectedfiles)} alt="selectedImage" />
          ) : (
            <video controls src={URL.createObjectURL(selectedfiles)}>
              Your browser does not support this type
            </video>
          )}

          <RiSendPlaneFill
            className={Style.sendButtom}
            onClick={handlePostMedia}
          />
        </div>
      )}

      <div className={Style.subChatArea}>
        <label>
          <input
            onChange={(e) => setSelectedFiles(e.target.files[0])}
            type="file"
            accept="image/*,video/*"
            style={{ display: 'none' }}
          />
          <MdOutlinePhotoSizeSelectActual style={{ cursor: 'pointer' }} />
        </label>

        <AiOutlineAudio
          onClick={handlePressRecord}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}

function UserProfilePage() {
  return (
    <div className={Style.chatArea}>
      <div className={Style.userProfile}>
        <ProfilePage />
      </div>
    </div>
  );
}

function FrnProfilePage() {
  return (
    <div className={Style.chatArea}>
      <div className={Style.userProfile}>
        <ShowUserProfile />
      </div>
    </div>
  );
}

function WelcomePack() {
  return (
    <div className={Style.chatArea}>
      <div className={Style.welcomePack}>
        Welcome to Buzz
        <img src="/TarangLogo.png" alt="logo" width={200} height={200} />
      </div>
    </div>
  );
}

function Modals() {
  const {
    updatePassword,
    updateProfilePicture,
    visibility,
    editBio,
    editCoverPhoto,
    createPost,
  } = useContext(UserContext);
  return (
    <div>
      {updatePassword && <UpdatePassword />}

      {updateProfilePicture && <UpdateProfile />}

      {visibility && <UpdateVisibility />}

      {editBio && <EditBio />}

      {editCoverPhoto && <BackgroundChange />}

      {createPost && <CreatePost />}
    </div>
  );
}

function Messages({ el, setMessageAudio, setplayAudio, playAudio, Audioref }) {
  const [isPlaying, setisPlaying] = useState(false);
  const [width, setWidth] = useState('0%'); // Default width
  const [speed, setSpeed] = useState(1);
  const { userData } = useContext(UserContext);
  const [isSender, setSender] = useState(false);

  function handlePlayAudio() {
    setMessageAudio(el.content);
    setisPlaying((prev) => !prev);
    setplayAudio((prev) => !prev);
  }

  useEffect(() => {
    setSender(el?.sender?.id === userData.user.id);
    if (!playAudio && isPlaying) {
      setisPlaying(false);
    }

    if (isPlaying) {
      Audioref.current.playbackRate = speed;

      Audioref.current.ontimeupdate = () => {
        const progress =
          (Audioref.current.currentTime / Audioref.current.duration) * 100;
        setWidth(`${progress}%`);
      };

      return () => {
        Audioref.ontimeupdate = null; // Cleanup to avoid unwanted updates
      };
    }
  }, [playAudio, isPlaying, Audioref, speed]);

  function handlePlayBackSpeed() {
    if (speed >= 0 && speed < 3) {
      setSpeed((prev) => prev + 1);
    }
    if (speed >= 3 && speed !== 1) {
      setSpeed(1);
    }
  }
  return (
    <>
      <div className={isSender ? Style.allMessagesLeft : Style.allMessages}>
        <UserDetails el={el} />
        <li>
          <div className={Style.play}>
            {!isPlaying && <FaPlay onClick={handlePlayAudio} />}
            {isPlaying && <FaPause onClick={handlePlayAudio} />}
          </div>
          <div
            className={Style.foreground}
            style={{
              width: `clamp(0%, ${width}, 92%)`,
            }}
          ></div>
          {Array.from({ length: 5 }).map((_, index) => (
            <PiWaveformBold className={Style.icons} key={index} />
          ))}
          <button onClick={handlePlayBackSpeed}> {speed}x</button>
        </li>
      </div>
    </>
  );
}

function UserDetails({ el }) {
  return (
    <>
      <div
        className={
          el?.isRead ? Style.subChatUserDetailsSeen : Style.subChatUserDetails
        }
      >
        <img src={el?.sender?.imageURL} alt="userimage" />
      </div>
    </>
  );
}

function DisplayImage({ el }) {
  const [isSender, setSender] = useState(false);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    setSender(el?.sender?.id === userData.user.id);
  }, []);

  return (
    <div className={isSender ? Style.allMessagesLeft : Style.allMessages}>
      <UserDetails el={el} />
      <img
        src={el.content}
        className={isSender ? Style.chatImages : Style.chatImagesNormal}
        alt="usersentImages"
      />
    </div>
  );
}

function DiplayVideo({ el }) {
  const [isSender, setSender] = useState(false);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    setSender(el?.sender?.id === userData.user.id);
  }, []);

  return (
    <div className={isSender ? Style.allMessagesLeft : Style.allMessages}>
      <UserDetails el={el} />
      <video
        src={el.content}
        loop
        controls
        className={isSender ? Style.chatImages : Style.chatImagesNormal}
      ></video>
    </div>
  );
}
