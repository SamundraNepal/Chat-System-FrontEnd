import { useContext, useEffect, useState } from 'react';
import AvatarImage from '../avatar';
import Style from './showChats.module.css';
import { UserContext, UserMessages } from '../../until/useContext';
import { GetChats, ReadChats } from '../../API/apiCalls';

export default function ShowChats() {
  const { setOpenChats, SetShowProfile, userData } = useContext(UserContext);
  const { setUserToTalking } = useContext(UserContext);
  const { messages, setMessages, users, setUsers } = useContext(UserMessages);
  const [receriverType, setReceiverType] = useState(2); // 0 means sender 1 means receiver

  useEffect(() => {
    HandleGetChats();
  }, []);

  useEffect(() => {
    users?.forEach((element) => {
      if (element?.sender?.id === userData.user.id) {
        setReceiverType(0);
      } else {
        setReceiverType(1);
      }
    });
  }, [users, userData.user.id]);
  async function HandleGetChats() {
    try {
      const data = await GetChats();
      if (!data.success) {
        console.log(data);
      } else {
        if (data.data.length === 0) {
          console.log('shit im out');
        } else {
          const mergedData = [...users, ...data.data]
            .reduce((acc, obj) => {
              acc.set(obj.receiver.id, obj); // Always keep the latest occurrence
              return acc;
            }, new Map())
            .values();

          setUsers([...mergedData]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleOpenChats(el) {
    if (receriverType === 1) {
      setUserToTalking(el.sender);
    } else {
      setUserToTalking(el.receiver);
    }
    setMessages(el?.messages);
    setOpenChats((prev) => !prev);
    SetShowProfile(false);
  }

  return (
    <>
      {users?.map((el) => {
        return (
          <>
            {receriverType === 1 ? (
              <DisplayChats
                el={el}
                handleOpenChats={handleOpenChats}
                els={el.sender}
              />
            ) : (
              <DisplayChats
                el={el}
                handleOpenChats={handleOpenChats}
                els={el.receiver}
              />
            )}
          </>
        );
      })}
    </>
  );
}

function DisplayChats({ el, handleOpenChats, els }) {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const hasUnreadMessages = el?.messages?.some(
      (item) => item.receiver.id === userData.user.id && item.isRead === false,
    );
    setIsOpen(!hasUnreadMessages);
  }, []);

  async function handleReadChats() {
    try {
      const data = await ReadChats(els.id);
      if (!data.success) {
        console.log(data);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleChatsOpen() {
    handleOpenChats(el);
    setIsOpen(true);
    handleReadChats();
    console.log(el);
  }
  return (
    <div
      className={!isOpen ? Style.Containerunread : Style.Container}
      onClick={handleChatsOpen}
    >
      <div className={Style.mainContainer}>
        <AvatarImage
          H={60}
          W={60}
          ALT={'User image'}
          SRC={el?.imageURL || els?.imageURL}
        />
        <div className={Style.subContainer}>
          <span className={Style.UserName}>
            {el?.firstName || els?.firstName}
          </span>

          <span className={Style.UserName}>
            {el?.lastName || els?.lastName}
          </span>
        </div>
      </div>
      {!isOpen && <p>Unread</p>}
    </div>
  );
}
