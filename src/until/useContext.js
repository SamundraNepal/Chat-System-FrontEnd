import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const UserContext = createContext();

export const FileUploads = createContext();

export const NotificationsContext = createContext();

export const UserMessages = createContext();

export function UserMessagesProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <UserMessages.Provider value={{ messages, setMessages, users, setUsers }}>
      {children}
    </UserMessages.Provider>
  );
}

export function NotificationsContextProvider({ children }) {
  const [friendRequest, setAllFriendRequest] = useState({});
  const [getNotifications, setGetNotifications] = useState({});

  return (
    <NotificationsContext.Provider
      value={{
        friendRequest,
        setAllFriendRequest,
        getNotifications,
        setGetNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function FileUploadProvider({ children }) {
  const [isBackGroundUploading, setIsBackGroundUploading] = useState(false);
  const [audioData, setAudioData] = useState({});
  const [mediaData, setMediaData] = useState({});
  const [type, setType] = useState(0); // 0 means data is audio type and 1 means data is medai files ('video and images')
  const [audioBlob, setAudioBlob] = useState(null); //create realtime blob for the audio recorded

  return (
    <FileUploads.Provider
      value={{
        isBackGroundUploading,
        setIsBackGroundUploading,
        audioData,
        setAudioData,
        mediaData,
        setMediaData,
        type,
        setType,
        audioBlob,
        setAudioBlob,
      }}
    >
      {children}
    </FileUploads.Provider>
  );
}

export function AuthProvider({ children }) {
  const [credentials, setCredentials] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //dummy auth code
  const [dummyauthCode, setDummyAuthCode] = useState('');
  return (
    <AuthContext.Provider
      value={{
        credentials,
        setCredentials,
        isAuthenticated,
        setIsAuthenticated,
        dummyauthCode,
        setDummyAuthCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserProvider({ children }) {
  const [updatePassword, SetUpdatePassword] = useState(false);
  const [updateProfilePicture, setUpdateProfilePicture] = useState(false);
  const [visibility, setUserVisibility] = useState(false);
  const [userDetails, setOpenUserDetails] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [editCoverPhoto, seteditCoverPhoto] = useState(false);
  const [createPost, setCreatePost] = useState(false);

  const [showChats, setShowChats] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [showFindFriends, setShowFindFriends] = useState(false);

  const [ShowProfile, SetShowProfile] = useState(false);
  const [OpenChats, setOpenChats] = useState(false);

  //this state is for currently talking person
  const [userTalking, setUserToTalking] = useState('');
  const [feed, setFeed] = useState(false);

  const [userData, setUserData] = useState({});
  const [reFetchData, setRefetchData] = useState(false);

  //find frn request data
  const [showFrnData, setShowFrnData] = useState({});
  const [showFrn, setShowFrn] = useState(false);

  //to show clicked notifications post
  const [showPost, setShowPost] = useState(false);
  const [postData, setPostData] = useState({});

  //play audio from anywhere
  const [masterAudioPlay, setMasterAudioPlay] = useState(false);
  const [AudioFileToPlay, setAudioFileToPlay] = useState('');

  return (
    <UserContext.Provider
      value={{
        updatePassword,
        SetUpdatePassword,
        updateProfilePicture,
        setUpdateProfilePicture,
        visibility,
        setUserVisibility,
        userDetails,
        setOpenUserDetails,
        showChats,
        setShowChats,
        showFriends,
        setShowFriends,
        showFindFriends,
        setShowFindFriends,
        ShowProfile,
        SetShowProfile,
        OpenChats,
        setOpenChats,
        userData,
        setUserData,
        editBio,
        setEditBio,
        editCoverPhoto,
        seteditCoverPhoto,
        createPost,
        setCreatePost,
        reFetchData,
        setRefetchData,
        showFrnData,
        setShowFrnData,
        showFrn,
        setShowFrn,
        feed,
        setFeed,
        showPost,
        setShowPost,
        postData,
        setPostData,
        masterAudioPlay,
        setMasterAudioPlay,
        AudioFileToPlay,
        setAudioFileToPlay,
        userTalking,
        setUserToTalking,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
