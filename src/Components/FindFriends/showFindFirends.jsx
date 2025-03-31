import { useContext, useEffect, useState } from 'react';
import UInput from '../Input';
import Style from './showFindFriends.module.css';
import { IoSearch } from 'react-icons/io5';
import { AddFriend, CancelFriend, FindFriends } from '../../API/apiCalls';
import { UserContext, UserMessages } from '../../until/useContext';
import UButton from '../button';
import { toast, ToastContainer } from 'react-toastify';

export default function ShowFindFriends() {
  const [searchName, setSearchName] = useState('');

  const [findFrnData, setFindFrnData] = useState({});
  const { setShowFrnData, setShowFrn } = useContext(UserContext);

  function handleShowFrnData(el) {
    setShowFrnData(el);
    setShowFrn(true);
  }

  async function handleSearhFindFriend() {
    try {
      const data = await FindFriends(searchName);

      if (!data.success) {
        setFindFrnData({});
      } else {
        setFindFrnData(data);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className={Style.Container}>
      <ToastContainer />
      <div>Find Friends</div>
      <div className={Style.Searchable}>
        <UInput
          PlaceHolder={`Who's on your mind?`}
          ClassName={Style.input}
          Value={searchName}
          required
          OnChange={(e) => setSearchName(e.target.value)}
        />
        <IoSearch
          className={Style.SearchIcon}
          onClick={handleSearhFindFriend}
        />
      </div>

      {findFrnData.data?.searchList?.length > 0 &&
        findFrnData.data.searchList.map((el, index) => (
          <ShowSearchFriends
            el={el}
            index={index}
            handleShowFrnData={handleShowFrnData}
            findFrnData={findFrnData}
          />
        ))}

      {findFrnData.data?.length < 1 && <h1>No users found</h1>}
    </div>
  );
}

function ShowSearchFriends({ el, index, handleShowFrnData, findFrnData }) {
  const { userData } = useContext(UserContext);
  const [friendRequestSent, setfriendRequestSent] = useState(false);
  const [friends, setfriends] = useState(false);
  const [receiver, setReceiver] = useState(false);
  const { users, setUsers } = useContext(UserMessages);
  const {
    setShowChats,
    setShowFindFriends,
    SetShowProfile,
    setShowFriends,
    setShowFrn,
    setFeed,
  } = useContext(UserContext);

  useEffect(() => {
    if (findFrnData.data.receivedRequest.length > 0) {
      if (
        findFrnData.data.receivedRequest[index]?.senderId === userData.user.id
      ) {
        setfriendRequestSent(true);
      }

      if (findFrnData.data.receivedRequest[index]?.status === 'Accepted') {
        setfriends(true);
      }

      if (
        findFrnData.data.receivedRequest[index]?.receiverId === userData.user.id
      ) {
        setReceiver(true);
      }
    }
  }, []);

  async function HandleAddFriend() {
    try {
      const data = await AddFriend(el.id);

      if (!data.success) {
        console.log(data);
      } else {
        setfriendRequestSent(true);
        toast.success(`Friend Request sent to ${el.firstName} ${el.lastName}`);
      }
    } catch (err) {}
  }

  async function HandleCancelFrnRequest() {
    try {
      const data = await CancelFriend(el.id);

      if (!data.success) {
        console.log(data);
      } else {
        setfriendRequestSent(false);
        toast.warning(
          `Friend request Cancelled with ${el.firstName} ${el.lastName}`,
        );
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  function handleTransferDetails() {
    const isExists = users?.some((els) => els.sender.id === el.id); // Should check for equality

    if (!isExists) {
      setUsers((prev) => [...prev, { sender: userData.user, receiver: el }]); // Keep previous users
    }
    setShowChats(true);
    SetShowProfile(false);
    setShowFriends(false);
    setShowFindFriends(false);
    setShowFrn(false);
    setFeed(false);
    setShowFindFriends(false);
  }

  return (
    <div key={index}>
      <div className={Style.mainContainer}>
        <img
          className={Style.AvatarStyle}
          onClick={() => handleShowFrnData(el)}
          alt={'User'}
          src={el.imageURL}
        />
        <div className={Style.subContainer}>
          <span className={Style.UserName}>
            {el.firstName} {el.lastName}
          </span>
        </div>

        <div className={Style.FriendAction}>
          {!friendRequestSent && !receiver && (
            <>
              <UButton
                ButtonName={'Add Friend'}
                ClassName={Style.button}
                handleFunction={HandleAddFriend}
              />
            </>
          )}

          {friends && (
            <>
              <UButton
                ButtonName={'Message'}
                ClassName={Style.button}
                handleFunction={handleTransferDetails}
              />
            </>
          )}

          {friendRequestSent && !friends && (
            <>
              <UButton ButtonName={'Pending'} ClassName={Style.button} />
              <UButton
                ButtonName={'Cancel'}
                handleFunction={HandleCancelFrnRequest}
                ClassName={Style.button}
              />
            </>
          )}

          {receiver && !friends && (
            <>
              <UButton ButtonName={'Accept'} ClassName={Style.button} />
              <UButton
                ButtonName={'Reject'}
                handleFunction={HandleCancelFrnRequest}
                ClassName={Style.button}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
