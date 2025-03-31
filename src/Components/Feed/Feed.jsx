import { useContext, useEffect, useState } from 'react';
import {
  CommentsInteractions,
  DeleteCommentAPI,
  GetMasterFeed,
  LikePost,
  PostComment,
} from '../../API/apiCalls';

import { GoHeart } from 'react-icons/go';
import { GoHeartFill } from 'react-icons/go';

import Style from './feed.module.css';

import { GoDot } from 'react-icons/go';

import { GoDotFill } from 'react-icons/go';

import { FaRecordVinyl } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa6';
import { BsShare } from 'react-icons/bs';
import { FiStar } from 'react-icons/fi';
import AvatarImage from '../avatar';
import { FileUploads, UserContext } from '../../until/useContext';
import PlayAudioUI from '../ReUse/audio';
import AudioRecordFunction from '../audioRecord';

import UniversalAudio from '../ReUse/masterAudio';
import Spinner from '../../until/spinner/spinner';
import CommentsHeader from '../ReUse/userComments';
import userEvent from '@testing-library/user-event';

export default function Feed() {
  const [masterFeed, setMasterFeed] = useState({});

  useEffect(() => {
    async function GetTheMainFeed() {
      try {
        const data = await GetMasterFeed();

        if (!data.success) {
          console.log(data);
        } else {
          setMasterFeed(data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    GetTheMainFeed();
  }, []);

  return (
    <div className={Style.Container}>
      <UniversalAudio />
      {masterFeed.data?.map((el, index) => {
        const hasMedia = Array.isArray(el.mediaLink) && el.mediaLink.length > 0;
        const hasAudio = el.audioName !== '';
        if (hasMedia) {
          return (
            <div key={index} className={Style.ImageContainer}>
              <DisplayFeedType el={el} />
            </div>
          );
        }

        if (hasAudio && !hasMedia) {
          return (
            <div key={index} className={Style.ImageContainer}>
              <DisplayAudio post={el} />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

function DisplayFeedType({ el }) {
  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'webm'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextMedai, setNextMedia] = useState(1);

  // handle move between media files
  function handleNextMedia(el) {
    setCurrentIndex(el);
    setNextMedia(el + 1);
  }

  return (
    <>
      {el.mediaLink &&
        el.mediaLink.length > 0 &&
        el.mediaLink.length < 2 &&
        el.mediaLink.slice(0, 1).map((item, index) => {
          const fileExtension = item.split('.').pop().toLowerCase();

          if (imageExtensions.includes(fileExtension)) {
            return (
              <>
                <HeaderUnit el={el} />

                <img
                  key={index}
                  className={Style.image}
                  src={item}
                  alt="userPost"
                />
                <InterActions el={el} />
              </>
            );
          }

          if (videoExtensions.includes(fileExtension)) {
            return (
              <>
                <HeaderUnit el={el} />

                <video key={index} className={Style.video} controls>
                  <source src={item} type={`video/${fileExtension}`} />
                  Your browser does not support the video tag.
                </video>

                <InterActions el={el} />
              </>
            );
          }

          return null; // Handle case for unsupported file types
        })}

      <>
        {el.mediaLink &&
          el.mediaLink.length > 1 &&
          el.mediaLink.slice(currentIndex, nextMedai).map((item, index) => {
            const fileExtension = item.split('.').pop().toLowerCase();

            if (imageExtensions.includes(fileExtension)) {
              return (
                <>
                  <HeaderUnit el={el} />

                  <img
                    key={index}
                    className={Style.image}
                    src={item}
                    alt="userPost"
                  />

                  <InterActions el={el} />
                </>
              );
            } else if (videoExtensions.includes(fileExtension)) {
              return (
                <>
                  <HeaderUnit el={el} />

                  <video
                    key={index}
                    className={Style.video}
                    src={item}
                    controls
                  >
                    Your browser does not support the video tag.
                  </video>

                  <InterActions el={el} />
                </>
              );
            }
            return null;
          })}

        <div className={Style.MultipleMedia}>
          {el.mediaLink.length > 1 &&
            Array.from({ length: el.mediaLink.length }).map((_, index) => (
              <>
                {currentIndex === index ? (
                  <GoDotFill
                    onClick={(e) => handleNextMedia(index)}
                    key={index}
                  />
                ) : (
                  <GoDot onClick={(e) => handleNextMedia(index)} key={index} />
                )}
              </>
            ))}
        </div>
      </>
    </>
  );
}

function HeaderUnit({ el }) {
  return (
    <div className={Style.HeaderDiv}>
      <AvatarImage
        SRC={el.user?.imageURL}
        W={60}
        H={60}
        ALT="This is user image"
      />
      <h4>
        {el.user?.firstName} {el.user?.lastName}
      </h4>
    </div>
  );
}

function DisplayAudio({ post }) {
  return (
    <>
      <div className={Style.audioUI}>
        <HeaderUnit el={post} />
        <PlayAudioUI post={post} />
      </div>
      <InterActions el={post} />
    </>
  );
}

function InterActions({ el }) {
  const { userData, setMasterAudioPlay, masterAudioPlay, setAudioFileToPlay } =
    useContext(UserContext);

  const [likes, Setlikes] = useState(0);
  const [comments, SetComments] = useState([]);
  const [favourite, Setfavourite] = useState(0);
  const [share, setShare] = useState(0);
  const [isLiked, SetIsLiked] = useState(false);

  //
  const [displayComments, setDisplayComments] = useState(false);

  useEffect(() => {
    Setlikes(el.likes?.length ? el.likes.length : 0);
    SetComments(el.comments);

    const Liked = el.likes?.some((el) => el.senderID === userData.user.id);

    if (Liked) {
      SetIsLiked(true);
    }
  }, []);

  async function handleLike() {
    try {
      const data = await LikePost(el.userID, el.id);

      if (!data.success) {
        console.log(data);
      } else {
        if (!isLiked) {
          SetIsLiked(true);
          Setlikes((prev) => prev + 1);
        } else {
          SetIsLiked(false);
          Setlikes((prev) => prev - 1);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  function DisplayComments() {
    setDisplayComments((prev) => !prev);
  }

  function handleplayAudioOfThePost() {
    setAudioFileToPlay(el.audioLink[0]);
    setMasterAudioPlay((prev) => !prev);
  }

  return (
    <div className={Style.buttons}>
      {displayComments && (
        <div className={Style.commentsHolder}>
          <TypeComments
            comments={comments}
            el={el}
            setAllComments={SetComments}
          />
        </div>
      )}

      {el.mediaLink.length > 0 && el.audioLink.length > 0 && (
        <div
          className={`${masterAudioPlay ? Style.VinylPlaying : Style.Vinyl}`}
        >
          <FaRecordVinyl onClick={handleplayAudioOfThePost} />
        </div>
      )}

      <div className={Style.interAction} onClick={handleLike}>
        {!isLiked ? <GoHeart /> : <GoHeartFill className={Style.isLiked} />}{' '}
        <p>{likes}</p>
      </div>

      <div className={Style.interAction} onClick={DisplayComments}>
        <FaRegComment />
        <p>{comments?.length || 0}</p>
      </div>

      <div className={Style.interAction}>
        <FiStar />
        <p>{favourite}</p>
      </div>

      <div className={Style.interAction}>
        <BsShare />
        <p>{share}</p>
      </div>
    </div>
  );
}

function TypeComments({ el, comments, setAllComments }) {
  const { audioBlob } = useContext(FileUploads);
  const [isLoading, setIsloading] = useState(false);
  const { userData } = useContext(UserContext);

  async function handlePostComments() {
    setIsloading(true);
    try {
      const data = await PostComment(el.id, el.userID, audioBlob);

      if (!data.success) {
        setIsloading(false);
      } else {
        setIsloading(false);
        setAllComments((prev) => [
          ...(Array.isArray(prev) ? prev : []), // ✅ Ensure `prev` is an array
          {
            content: URL.createObjectURL(audioBlob),
            senderID: userData.user.id,
            interactionsLikes: [],
            interactionsReply: [],

            user: {
              id: userData.user.id,
              firstName: userData.user.firstName,
              lastName: userData.user.lastName,
              imageURL: userData.user.imageURL,
            },
          },
        ]);
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  }

  async function handleDeleteComment(id) {
    try {
      const action = await DeleteCommentAPI(
        id.id,
        id.postID,
        id.senderID,
        id.receiverID,
      );

      if (!action.success) {
        console.log(action);
      } else {
        const data = comments;
        const filterDataOut = data.filter((com) => com.id !== id.id);
        setAllComments(filterDataOut);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className={Style.commentContainer}>
      <div className={Style.commentHeader}>
        <button>Comments</button>
      </div>

      <div className={Style.allComments}>
        {comments != null &&
          comments?.map((comdata) => {
            return (
              <CommentsHeader
                commentsUsers={comdata}
                userDatas={userData}
                handleDeleteComment={handleDeleteComment}
              />
            );
          })}
      </div>
      {!isLoading ? (
        <div className={Style.yourComment}>
          <AudioRecordFunction audioSubmitfunction={handlePostComments} />
        </div>
      ) : (
        <Spinner size="small" />
      )}
    </div>
  );
}
