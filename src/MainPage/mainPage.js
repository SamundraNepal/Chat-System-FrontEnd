import { AiOutlineAudio } from 'react-icons/ai';
import { IoSendSharp } from 'react-icons/io5';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';

import UButton from '../ReUseComponenets/button';
import { IoPeopleCircleOutline } from 'react-icons/io5';

import Style from './mainPage.module.css';

export default function MainArea() {
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
            <UButton ButtonName={'Firends'} ClassName={Style.button} />
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
      </div>
    </div>
  );
}
