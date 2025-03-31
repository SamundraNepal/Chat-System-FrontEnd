import { useContext, useEffect, useState } from 'react';
import Style from './displaypost.module.css';
import { FileUploads, UserContext } from '../../until/useContext';
import { DeleteCommentAPI, GetReqPost, PostComment } from '../../API/apiCalls';
import AvatarImage from '../avatar';

import { GoDot } from 'react-icons/go';

import { GoDotFill } from 'react-icons/go';

import { GoHeart } from 'react-icons/go';
import { GoHeartFill } from 'react-icons/go';

import { FaRecordVinyl } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa6';
import { BsShare } from 'react-icons/bs';
import { FiStar } from 'react-icons/fi';
import AudioRecordFunction from '../audioRecord';
import CommentsHeader, { ShowLikes } from '../ReUse/userComments';
import UniversalAudio from '../ReUse/masterAudio';
import PlayAudioUI from '../ReUse/audio';
import Spinner from '../../until/spinner/spinner';

export default function ShowClickedPost() {
  const { postData, userData } = useContext(UserContext);
  const [post, setPost] = useState({});

  useEffect(() => {
    async function getPost() {
      try {
        const data = await GetReqPost(postData.content_id);

        if (!data.success) {
          console.log(data);
        } else {
          setPost(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getPost();
  }, [postData]);

  return (
    <div className={Style.container}>
      <div className={Style.header}>
        <AvatarImage
          SRC={userData.user.imageURL}
          ALT={'USERIMAGE'}
          W={80}
          H={80}
        />
        <p>
          {userData.user.firstName} {userData.user.lastName}
        </p>
      </div>

      <DisplayFeedType key={post.id} el={post.data} />
    </div>
  );
}

function DisplayFeedType({ el }) {
  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'webm'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextMedai, setNextMedia] = useState(1);

  const [showComments, setShowComments] = useState(false);
  const [comments, SetComments] = useState(0);

  useEffect(() => {
    SetComments(el?.comments);
  }, [el?.comments]);

  // handle move between media files
  function handleNextMedia(el) {
    setCurrentIndex(el);
    setNextMedia(el + 1);
  }

  function handleShowComments() {
    setShowComments((prev) => !prev);
  }

  return (
    <>
      {/*  <div className={Style.interactionData}>hello</div>*/}
      <div className={Style.InteractionsButtons}>
        <InterActions
          el={el}
          handleShowComments={handleShowComments}
          comments={comments}
        />
      </div>
      {showComments && (
        <ShowComments el={el} setAllComments={SetComments} comment={comments} />
      )}
      {el?.mediaLink &&
        el?.mediaLink?.length > 0 &&
        el?.mediaLink?.length < 2 &&
        el?.mediaLink?.slice(0, 1).map((item, index) => {
          const fileExtension = item.split('.').pop().toLowerCase();

          if (imageExtensions.includes(fileExtension)) {
            return (
              <>
                <img
                  key={index}
                  className={Style.image}
                  src={item}
                  alt="userPost"
                />
              </>
            );
          }

          if (videoExtensions.includes(fileExtension)) {
            return (
              <>
                <video key={index} className={Style.video} controls>
                  <source src={item} type={`video/${fileExtension}`} />
                  Your browser does not support the video tag.
                </video>
              </>
            );
          }

          return null; // Handle case for unsupported file types
        })}
      <>
        {el?.mediaLink &&
          el?.mediaLink.length > 1 &&
          el?.mediaLink.slice(currentIndex, nextMedai).map((item, index) => {
            const fileExtension = item.split('.').pop().toLowerCase();

            if (imageExtensions.includes(fileExtension)) {
              return (
                <>
                  <img
                    key={index}
                    className={Style.image}
                    src={item}
                    alt="userPost"
                  />
                </>
              );
            } else if (videoExtensions.includes(fileExtension)) {
              return (
                <>
                  <video
                    key={index}
                    className={Style.video}
                    src={item}
                    controls
                  >
                    Your browser does not support the video tag.
                  </video>
                </>
              );
            }
            return null;
          })}

        <div className={Style.MultipleMedia}>
          {el?.mediaLink.length > 1 &&
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
      <>
        {el?.mediaName === null && el.audioLink && <DisplayAudio post={el} />}
      </>
    </>
  );
}

function InterActions({ el, handleShowComments, comments }) {
  const { userData } = useContext(UserContext);

  const [likes, Setlikes] = useState(0);
  const [favourite, Setfavourite] = useState(0);
  const [share, setShare] = useState(0);
  const [isLiked, SetIsLiked] = useState(false);

  const { setMasterAudioPlay, setAudioFileToPlay } = useContext(UserContext);

  useEffect(() => {
    Setlikes(el?.likes?.length ? el.likes.length : 0);

    const Liked = el?.Likes?.some((el) => el.senderID === userData.user.id);

    if (Liked) {
      SetIsLiked(true);
    }
  }, [el]);

  function handleplayAudioOfThePost() {
    setAudioFileToPlay(el.audioLink[0]);
    setMasterAudioPlay(true);
  }

  return (
    <div className={Style.buttons}>
      <UniversalAudio />
      {el?.audioLink.length > 0 && el?.mediaName && (
        <div className={Style.Vinyl}>
          <FaRecordVinyl onClick={handleplayAudioOfThePost} />
        </div>
      )}

      <div className={Style.interAction}>
        {!isLiked ? <GoHeart /> : <GoHeartFill className={Style.isLiked} />}{' '}
        <p>{likes}</p>
      </div>

      <div className={Style.interAction} onClick={handleShowComments}>
        <FaRegComment />
        <p>{comments?.length}</p>
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

function ShowComments({ el, setAllComments, comment }) {
  const { audioBlob } = useContext(FileUploads);

  const [comments, setShowComments] = useState(true);
  const [likes, setShowLikes] = useState(false);
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
        const data = comment;
        const filterDataOut = data.filter((com) => com.id !== id.id);
        setAllComments(filterDataOut);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  function handleShowLikes() {
    setShowLikes((prev) => !prev);
    setShowComments(false);
  }

  function handleShowComments() {
    setShowComments((prev) => !prev);
    setShowLikes(false);
  }

  return (
    <div className={Style.commentContainer}>
      <div className={Style.commentHeader}>
        <button onClick={handleShowComments}>Comments</button>
        <p>|</p>
        <button on onClick={handleShowLikes}>
          Likes
        </button>
      </div>
      {comment.length > 0 && comments ? (
        <>
          <div className={Style.allComments}>
            {comment.map((items) => {
              return (
                <DisplayUserAndComments
                  items={items}
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
        </>
      ) : (
        <>{comments && <p>No comments yet</p>}</>
      )}

      {likes && (
        <div className={Style.allComments}>
          {el?.likes.map((items) => {
            return <ShowLikes items={items} />;
          })}
        </div>
      )}
    </div>
  );
}

function DisplayUserAndComments({ items, handleDeleteComment }) {
  return (
    <CommentsHeader
      commentsUsers={items}
      userDatas={items}
      handleDeleteComment={handleDeleteComment}
    />
  );
}

function DisplayAudio({ post }) {
  return (
    <>
      <div className={Style.audioUI}>
        <PlayAudioUI post={post} />
      </div>
    </>
  );
}
