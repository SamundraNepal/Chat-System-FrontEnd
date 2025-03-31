import { useContext, useEffect, useState } from 'react';
import { FileUploads, UserContext } from '../../until/useContext';
import Style from './audio.module.css';
import { CiHeart } from 'react-icons/ci';
import { CiPlay1 } from 'react-icons/ci';
import { CiPause1 } from 'react-icons/ci';
import AudioRecordFunction from '../audioRecord';
import { BsThreeDotsVertical } from 'react-icons/bs';
import UniversalAudio from './masterAudio';
import { BsReply } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import {
  CommentsInteractions,
  CommentsInteractionsCommentReplyDelete,
  CommentsInteractionsReply,
  CommentsInteractionsReplyLikes,
  CommentsInteractionsReplyReply,
} from '../../API/apiCalls';

export default function CommentsHeader({
  commentsUsers,
  userDatas,
  handleDeleteComment,
  isdelete = true,
}) {
  const { setMasterAudioPlay, masterAudioPlay, setAudioFileToPlay, userData } =
    useContext(UserContext);

  const { audioBlob } = useContext(FileUploads);

  const [commentInteraction, setCommentInteractions] = useState([]);
  const [commentInteractionLikes, SetcommentInteractionsLikes] = useState(0);
  const [commentInteractionReplies, SetcommentInteractionsReplies] = useState(
    {},
  );

  const [isPlayabel, setIsPlayBale] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [isDeleteBox, setIsDeleteBox] = useState(false);
  const [weLiked, setWeLiked] = useState(false);

  useEffect(() => {
    setCommentInteractions(commentsUsers?.interactionsLikes);
    const isLiked = commentInteraction?.some(
      (el) => el.senderID === userData.user.id && el.parentID === null,
    );
    SetcommentInteractionsLikes(
      commentsUsers?.interactionsLikes?.reduce(
        (acc, items) => acc + (items.parentID === null ? 1 : 0),
        0,
      ),
    );
    SetcommentInteractionsReplies(commentsUsers?.interactionsReply);
    setWeLiked(isLiked);
  }, [commentInteraction, commentsUsers.interactionsLikes]);

  useEffect(() => {
    if (!masterAudioPlay) {
      setIsPlayBale(false);
    }
  }, [masterAudioPlay]);

  function handleAudioPlay() {
    setAudioFileToPlay(commentsUsers.content);
    setMasterAudioPlay(true);
    setIsPlayBale(true);
  }

  function handleStopAudioPlay() {
    setMasterAudioPlay(false);
    setAudioFileToPlay('');
    setIsPlayBale(true);
  }

  function handleReply() {
    setIsReply((prev) => !prev);
  }

  function handleDeleteId() {
    handleDeleteComment(commentsUsers);
    setIsDeleteBox(false);
  }

  async function handleCommentLikes() {
    try {
      const datas = await CommentsInteractions(
        commentsUsers.id,
        commentsUsers.postID,
        commentsUsers.user.id,
        { type: 'likes' },
      );

      if (!datas.success) {
        console.log(datas);
      } else {
        if (weLiked) {
          SetcommentInteractionsLikes((prev) => prev - 1);
        } else {
          SetcommentInteractionsLikes((prev) => prev + 1);
        }
        setWeLiked((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleReplyComments() {
    try {
      const datas = await CommentsInteractionsReply(
        commentsUsers.id,
        commentsUsers.postID,
        commentsUsers.user.id,
        audioBlob,
      );

      if (!datas.success) {
        console.log(datas);
      } else {
        SetcommentInteractionsReplies((prev) => [
          ...prev,
          {
            commentID: 10,
            contentURL: URL.createObjectURL(audioBlob),
            content_type: 'reply',
            id: commentsUsers.id,
            parentID: null,
            postID: commentsUsers.postID,
            receiverID: commentsUsers.receiverID,
            senderID: commentsUsers.senderID,
            sender: {
              id: userData.user.id,
              firstName: userData.user.firstName,
              lastName: userData.user.lastName,
              imageURL: userData.user.imageURL, // Assuming you have this in userData
            },
          },
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={Style.commentsStyle}>
      <UniversalAudio />

      <CommentsDiv
        isDeleteBox={isDeleteBox}
        handleDeleteId={handleDeleteId}
        commentsUsers={commentsUsers}
        isPlayabel={isPlayabel}
        handleAudioPlay={handleAudioPlay}
        handleStopAudioPlay={handleStopAudioPlay}
        handleCommentLikes={handleCommentLikes}
        weLiked={weLiked}
        commentInteractionLikes={commentInteractionLikes}
        handleReply={handleReply}
        commentInteractionReplies={commentInteractionReplies}
        isdelete={isdelete}
        setIsDeleteBox={setIsDeleteBox}
        isReply={isReply}
        handleReplyComments={handleReplyComments}
      />
      {commentInteractionReplies?.length > 0 &&
        commentInteractionReplies.map((el, index) => {
          return (
            <ReplyDivs
              likes={commentInteraction}
              el={el}
              commentsUsers={commentsUsers}
              userDatas={userDatas}
              isdelete={isdelete}
              SetcommentInteractionsReplies={SetcommentInteractionsReplies}
              commentInteractionReplies={commentInteractionReplies}
            />
          );
        })}
    </div>
  );
}

function DeleteComment({ handleDeleteId }) {
  return (
    <div className={Style.deleteBox}>
      <button onClick={handleDeleteId}>Delete</button>
    </div>
  );
}

function CommentsDiv({
  isDeleteBox,
  handleDeleteId,
  commentsUsers,
  isPlayabel,
  handleAudioPlay,
  handleStopAudioPlay,
  handleCommentLikes,
  weLiked,
  commentInteractionLikes,
  handleReply,
  commentInteractionReplies,
  isdelete,
  setIsDeleteBox,
  isReply,
  handleReplyComments,
}) {
  const { userData } = useContext(UserContext);
  return (
    <div className={Style.commentBox}>
      <UniversalAudio />

      {isDeleteBox && <DeleteComment handleDeleteId={handleDeleteId} />}
      <div className={Style.comments}>
        <div className={Style.subDiv}>
          <img src={commentsUsers.user.imageURL} alt="userImage" />

          <div className={Style.commentsNames}>
            <span>{commentsUsers.user.firstName}</span>
            <span>{commentsUsers.user.lastName}</span>
          </div>

          <div className={Style.audioBarsub}>
            <div className={Style.innerDiv}>
              {!isPlayabel && <CiPlay1 onClick={handleAudioPlay} />}
              {isPlayabel && <CiPause1 onClick={handleStopAudioPlay} />}
            </div>
          </div>
        </div>

        <>
          <div className={Style.CommmentsInteractions}>
            <button onClick={handleCommentLikes}>
              {weLiked ? <FaHeart className={Style.liked} /> : <CiHeart />}
              <p>{commentInteractionLikes}</p>
            </button>
            <button onClick={handleReply}>
              <BsReply />
              <p>{commentInteractionReplies?.length}</p>
            </button>
            {userData.user.id === commentsUsers.user.id && isdelete && (
              <div>
                <BsThreeDotsVertical
                  className={Style.delete}
                  onClick={(e) => setIsDeleteBox((prev) => !prev)}
                />
              </div>
            )}
          </div>
        </>
      </div>
      {isReply && (
        <div className={Style.userReply}>
          <AudioRecordFunction audioSubmitfunction={handleReplyComments} />
        </div>
      )}
    </div>
  );
}

function ReplyDivs({
  likes,
  el,
  commentsUsers,
  isdelete,
  SetcommentInteractionsReplies,
  commentInteractionReplies,
}) {
  const { setMasterAudioPlay, masterAudioPlay, setAudioFileToPlay, userData } =
    useContext(UserContext);


  const [isPlayabel, setIsPlayBale] = useState(false);
  const [isDeleteBox, setIsDeleteBox] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [weLiked, setWeLiked] = useState(false);

  const [commentLikes, setCommentLikes] = useState(0);
  const [commentReplies, setCommentReplies] = useState([]);
  const { audioBlob } = useContext(FileUploads);
  const [matchName, setMatchName] = useState([]);
  useEffect(() => {
    const isLiked = likes?.some(
      (els) => els.parentID === el.id && els.senderID === userData.user.id,
    );
    const replyiedTo = commentsUsers?.interactionsReply.filter(
      (items) => items.id === el.parentID,
    );
    setMatchName(replyiedTo);

    setWeLiked(isLiked);
    setCommentLikes(
      likes.reduce((acc, items) => acc + (items.parentID === el.id ? 1 : 0), 0),
    );
  }, [likes, el.id]);

  function handleReply() {
    setIsReply((prev) => !prev);
  }

  function handleAudioPlay() {
    setAudioFileToPlay(el.contentURL);
    setMasterAudioPlay(true);
    setIsPlayBale(true);
  }

  function handleStopAudioPlay() {
    setMasterAudioPlay(false);
    setAudioFileToPlay('');
    setIsPlayBale(true);
  }

  async function handleDeleteId() {
    try {
      const data = await CommentsInteractionsCommentReplyDelete(
        el.postID,
        el.commentID,
        el.receiverID,
        el.parentID,
        el.id,
      );

      if (!data.success) {
        console.log(data);
      } else {
        const prevData = commentInteractionReplies;
        const filterData = prevData.filter((items) => items.id !== el.id);
        SetcommentInteractionsReplies(filterData);
      }
    } catch (err) {
      console.log(el);
    }
    setIsDeleteBox(false);
  }

  async function handleCommentReplyLikes() {
    try {
      const data = await CommentsInteractionsReplyLikes(
        el.commentID,
        el.postID,
        el.senderID,
        el.id,
      );

      if (!data.success) {
        console.log(data);
      } else {
        setWeLiked((prev) => !prev);
        if (!weLiked) {
          setCommentLikes((prev) => prev + 1);
        } else {
          setCommentLikes((prev) => prev - 1);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCommentReplyComments() {
    const parentID = el.id;
    const commentID = el.commentID;
    const postID = el.postID;
    const receiverID = el.receiverID;
    const senderID = el.senderID;

    try {
      const data = await CommentsInteractionsReplyReply(
        parentID,
        commentID,
        postID,
        receiverID,
        senderID,
        audioBlob,
      );

      if (!data.success) {
        console.log(data);
      } else {
        SetcommentInteractionsReplies((prev) => [
          ...prev,
          {
            id: Date.now(), // Generate a unique ID
            parentID: parentID, // Link to the original comment
            postID: postID,
            commentID: commentID,
            receiverID: receiverID,
            senderID: userData.user.id,
            content_type: 'reply-reply',
            contentName: `${Date.now()}_blobcommemtReplyReply.wav`, // Generate filename
            contentURL: URL.createObjectURL(audioBlob), // URL for audio
            timeStamp: new Date().toISOString(), // Add timestamp
            sender: {
              id: userData.user.id,
              firstName: userData.user.firstName,
              lastName: userData.user.lastName,
              imageURL: userData.user.imageURL, // Assuming you have this in userData
            },
          },
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!masterAudioPlay) {
      setIsPlayBale(false);
    }
  }, [masterAudioPlay]);

  return (
    <div className={Style.commentBox}>
      <UniversalAudio />

      {isDeleteBox && <DeleteComment handleDeleteId={handleDeleteId} />}
      <div className={Style.commentsReply}>
        <div className={Style.subDiv}>
          <img src={el?.sender?.imageURL} alt="userImage" />

          <div className={Style.commentsNames}>
            <span>{el?.sender?.firstName}</span>
            <span>{el?.sender?.lastName}</span>
            {el.content_type !== 'reply-reply' ? (
              <>
                <span>
                  {'>'} {commentsUsers.user.firstName}{' '}
                  {commentsUsers.user.lastName}
                </span>
              </>
            ) : (
              <>
                <span>
                  {'>'}
                  {matchName.map((els) => {
                    return (
                      <>
                        {els.sender.firstName} {els.sender.lastName}
                      </>
                    );
                  })}
                </span>
              </>
            )}
          </div>

          <div className={Style.audioBarsub}>
            <div className={Style.innerDiv}>
              {!isPlayabel && <CiPlay1 onClick={handleAudioPlay} />}
              {isPlayabel && <CiPause1 onClick={handleStopAudioPlay} />}
            </div>
          </div>
        </div>

        <>
          <div className={Style.CommmentsInteractionsReply}>
            <button onClick={handleCommentReplyLikes}>
              {weLiked ? <FaHeart className={Style.liked} /> : <CiHeart />}
              <p>{commentLikes}</p>
            </button>
            <button onClick={handleReply}>
              <BsReply />
            </button>
            {userData.user.id === el?.sender?.id && isdelete && (
              <div>
                <BsThreeDotsVertical
                  className={Style.delete}
                  onClick={(e) => setIsDeleteBox((prev) => !prev)}
                />
              </div>
            )}
          </div>
        </>
      </div>
      {isReply && (
        <div className={Style.userReply}>
          <AudioRecordFunction
            audioSubmitfunction={handleCommentReplyComments}
          />
        </div>
      )}
    </div>
  );
}

export function ShowLikes({ items }) {
  return (
    <div className={Style.comments}>
      <div className={Style.subDiv}>
        <img src={items.user.imageURL} alt="userImage" />

        <div className={Style.names}>
          <span>{items.user.firstName}</span>
          <span>{items.user.lastName}</span>
        </div>
      </div>
    </div>
  );
}
