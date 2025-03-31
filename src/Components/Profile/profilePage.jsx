import AvatarImage from '../avatar';
import Style from './profilePage.module.css';
import { FaCamera } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { FaUserGraduate } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import { FaMale } from 'react-icons/fa';
import UInput from '../Input';
import { MdOutlineSettings } from 'react-icons/md';
import { useContext, useEffect, useState } from 'react';
import { FileUploads, UserContext } from '../../until/useContext';
import UserDetails from '../../MainPage/UserDetails/userDetails';

import AudioRecordFunction from '../audioRecord';
import {
  DeleteCommentAPI,
  GetAudioData,
  PostComment,
} from '../../API/apiCalls';
import { GoDot } from 'react-icons/go';
import { GoDotFill } from 'react-icons/go';
import { RxCross2 } from 'react-icons/rx';

import { GoHeart } from 'react-icons/go';
import { GoHeartFill } from 'react-icons/go';

import { FaRegComment } from 'react-icons/fa6';
import { BsShare } from 'react-icons/bs';
import { FiStar } from 'react-icons/fi';

import PlayAudioUI from '../ReUse/audio';
import Spinner from '../../until/spinner/spinner';
import CommentsHeader, { ShowLikes } from '../ReUse/userComments';
import UniversalAudio from '../ReUse/masterAudio';

export default function ProfilePage() {
  const { userDetails } = useContext(UserContext);
  const [userPosts, setUserPost] = useState({});

  async function GetUserPosts() {
    try {
      const data = await GetAudioData();
      if (!data.success) {
        console.log(data);
      } else {
        console.log(data);
        setUserPost(data);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    GetUserPosts();
  }, []);

  return (
    <div className={Style.Container}>
      <UniversalAudio />
      <BackgroundImage />
      <UserImage />
      <div className={Style.grid}>
        <BioDiv />
        <PostDiv />
        <div className={Style.UserPosts}>
          {userPosts.data?.posts.map((el) => {
            if (el.mediaName?.length > 0) {
              return <MedaiPost post={el} />;
            } else {
              return <AudioPost post={el} />;
            }
          })}
        </div>
      </div>

      {userDetails && <UserDetails />}
    </div>
  );
}

function BioDiv() {
  const { setEditBio, userData } = useContext(UserContext);

  function handleEditBio() {
    setEditBio(true);
  }

  return (
    <div className={Style.UserProfileBio}>
      <div>Bio</div>
      <button onClick={handleEditBio}>Edit Bio</button>

      <div>
        <span>Intro</span>
        <p>
          {userData.user?.intro ? userData.user.intro : 'Introduce yourself'}
        </p>
      </div>

      <div className={Style.UserProfileBioDetails}>
        <div>
          <FaLocationDot />
          <p>
            {userData.user?.location
              ? 'From ' + userData.user.location
              : 'Add Location'}
          </p>
        </div>
        <div>
          <FaUserGraduate />
          <p>
            {userData.user?.education
              ? userData.user.education
              : 'Add Education'}
          </p>
        </div>
        <div>
          <FaHome />
          <p>
            {userData.user?.home ? 'Live in ' + userData.user.home : 'Add Home'}
          </p>
        </div>
        <div>
          <FaMale />
          <p>{userData.user.gender}</p>
        </div>

        <div>
          <FaMale />

          <div className={Style.hobbies}>
            {userData.user?.hobbies
              ? userData.user.hobbies.map((items) => <button>{items}</button>)
              : 'Add Hobbies'}
          </div>
        </div>
      </div>
    </div>
  );
}

function PostDiv() {
  const { userData, setCreatePost } = useContext(UserContext);

  function handleCreatePost() {
    setCreatePost(true);
  }

  return (
    <div className={Style.UserProfilePosts}>
      <div>
        <AvatarImage
          SRC={userData.user?.imageURL}
          H={50}
          W={50}
          ALT={'User Image'}
        />
        <UInput
          PlaceHolder={"What's on your mind"}
          Type="text"
          ClassName={Style.UserProfilePostsInput}
          functionName={handleCreatePost}
        />
      </div>
    </div>
  );
}

function BackgroundImage() {
  const { setOpenUserDetails, userData, seteditCoverPhoto } =
    useContext(UserContext);

  function handleEditCoverPhoto() {
    seteditCoverPhoto(true);
  }
  return (
    <div className={Style.backGroundImage}>
      {userData.user?.coverImageURL ? (
        <img SRC={userData.user?.coverImageURL} alt="userimage" />
      ) : (
        <img SRC={userData.user?.imageURL} alt="userimage" />
      )}

      <span onClick={(e) => setOpenUserDetails((prev) => !prev)}>
        <MdOutlineSettings />
      </span>

      <button onClick={handleEditCoverPhoto}>
        <FaCamera /> Edit Cover Photo
      </button>
    </div>
  );
}

function UserImage() {
  const { setUpdateProfilePicture, userData } = useContext(UserContext);

  const handleProfileClick = () => {
    setUpdateProfilePicture((prev) => !prev); // Open the update profile modal
  };
  return (
    <div className={Style.UserProfilePicture}>
      <AvatarImage
        SRC={userData.user?.imageURL}
        H={300}
        W={300}
        ALT={'User Image'}
        Click={handleProfileClick}
      />

      <div className={Style.userName}>
        <span className={Style.UserProfileName}>
          {userData.user?.firstName} {userData.user?.lastName}
        </span>
      </div>
    </div>
  );
}

function AudioPost({ post }) {
  const [openComments, setOpenComments] = useState(false);
  const { userData } = useContext(UserContext);

  const postDate = new Date(post?.createdAt).toLocaleDateString();

  function handleOpenComments() {
    setOpenComments((prev) => !prev);
  }
  return (
    <div className={Style.audioOnlyPost}>
      <div className={Style.AudioPost}>
        <div className={Style.UserUI}>
          <AvatarImage
            SRC={userData.user.imageURL}
            H={50}
            W={50}
            ALT={'User Image'}
          />
          <div className={Style.UsePostNameandDate}>
            <label className={Style.UserName}>
              {userData.user.firstName} {userData.user.lastName}
            </label>
            <label className={Style.UserPostDate}>{postDate}</label>
          </div>
        </div>

        <PlayAudioUI post={post} />
      </div>

      <div className={Style.LikeAndCommentButtons}>
        <InterActions el={post} />
      </div>
      {openComments && (
        <div className={Style.allComments}>
          {Array.from({ length: 50 }).map((el) => (
            <UserComments />
          ))}
        </div>
      )}

      <div className={Style.AddMessge}>
        <AudioRecordFunction />
      </div>
    </div>
  );
}

function UserComments() {
  return (
    <div className={Style.peopleComments}>
      <ul>
        <li>
          <div>
            <div>
              <AvatarImage
                SRC={
                  'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
                }
                H={50}
                W={50}
                ALT={'User Image'}
              />{' '}
              <audio
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                controls
              >
                Your browser does not support audio
              </audio>
            </div>
            <div className={Style.buzzInterAction}>
              <button>{20} Like</button>
              <button>{10} Reply</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

function MedaiPost({ post }) {
  const { setShowFrnData, setShowFrn } = useContext(UserContext);

  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'mkv', 'webm'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);

  const [showLikes, setShowLikes] = useState(false);

  const { userData } = useContext(UserContext);

  const postDate = new Date(post?.createdAt).toLocaleDateString();

  function handleNextInTheList(index) {
    setCurrentIndex(index);
    setNextIndex(index + 1);
  }

  function handleShowLikedAccount(el) {
    setShowFrn(true);
    setShowFrnData(el);
  }

  return (
    <div className={Style.audioOnlyPost}>
      {showLikes && (
        <ShowLike
          post={post}
          handleShowLikedAccount={handleShowLikedAccount}
          setShowLikes={setShowLikes}
        />
      )}
      <div className={Style.AudioPost}>
        <div className={Style.UserUI}>
          <AvatarImage
            SRC={userData.user.imageURL}
            H={50}
            W={50}
            ALT={'User Image'}
          />
          <div className={Style.UsePostNameandDate}>
            <label className={Style.UserName}>
              {userData.user.firstName} {userData.user.lastName}{' '}
              <label className={Style.subFont}>
                {post.mediaName == 'Profile'
                  ? `Updated ${
                      userData.user.gender === 'Male' ? 'his' : 'her'
                    } Profile Picture`
                  : post.mediaName == 'Background'
                  ? `Updated  ${
                      userData.user.gender === 'Male' ? 'his' : 'her'
                    } Cover Picture`
                  : ' '}
              </label>
            </label>
            <label className={Style.UserPostDate}>{postDate}</label>
          </div>
        </div>

        {post.audioName ? (
          <audio src={post.audioLink} controls>
            Your browser does not support audio
          </audio>
        ) : (
          ''
        )}
      </div>

      <div className={Style.mediaGrid}>
        {post.mediaLink.length < 2 &&
          post.mediaLink.slice(0, 2).map((el, index) => {
            const extension = el.split('.').pop().toLowerCase();

            if (imageExtensions.includes(extension)) {
              return <img key={index} src={el} alt="User Images" />;
            } else if (videoExtensions.includes(extension)) {
              return (
                <div>
                  <video key={index} src={el} controls />
                </div>
              );
            } else {
              return null; // Handle unexpected file types
            }
          })}

        {post.mediaLink.length > 1 &&
          post.mediaLink.slice(currentIndex, nextIndex).map((el, index) => {
            const extension = el.split('.').pop().toLowerCase();

            if (imageExtensions.includes(extension)) {
              return <img key={el} src={el} alt="User Images" />;
            } else if (videoExtensions.includes(extension)) {
              return (
                <div>
                  <video key={index} src={el} controls />
                </div>
              );
            } else {
              return null; // Handle unexpected file types
            }
          })}

        {post.mediaLink.length > 1 && (
          <div className={Style.moreValue}>
            {Array.from({ length: post.mediaLink.length }).map((_, value) => (
              <div className={Style.circle}>
                {currentIndex === value ? ( // Check if the current index matches the value
                  <GoDotFill onClick={() => handleNextInTheList(value)} /> // Render filled dot
                ) : (
                  <GoDot onClick={() => handleNextInTheList(value)} /> // Render empty dot
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={Style.LikeAndCommentButtons}>
        <InterActions el={post} />
      </div>

      {/*  <div className={Style.AddMessge}>
        <AudioRecordFunction />
      </div>*/}
    </div>
  );
}

function ShowLike({ post, handleShowLikedAccount, setShowLikes }) {
  return (
    <div className={Style.showLikes}>
      <div className={Style.headerLikes}>
        <p className={Style.likes}>Likes</p>
        <div className={Style.cross}>
          <p className={Style.likesClose} onClick={(e) => setShowLikes(false)}>
            <RxCross2 />
          </p>
        </div>
      </div>

      <div className={Style.LikedAccounts}>
        {post.Likes.map((el) => {
          return (
            <div onClick={(e) => handleShowLikedAccount(el)}>
              <AvatarImage
                SRC={el.sender.imageURL}
                ALT="LikedUserImage"
                W={80}
                H={80}
              />
              <p>
                {el.sender.firstName} {el.sender.lastName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InterActions({ el }) {
  const { userData } = useContext(UserContext);

  const [likes, Setlikes] = useState(0);
  const [comments, SetComments] = useState(0);
  const [favourite, Setfavourite] = useState(0);
  const [share, setShare] = useState(0);
  const [isLiked, SetIsLiked] = useState(false);

  const [displayComments, setDisplayComments] = useState(false);

  useEffect(() => {
    Setlikes(el?.likes?.length ? el.likes.length : 0);
    SetComments(el?.comments);

    const Liked = el?.Likes?.some((el) => el.senderID === userData.user.id);

    if (Liked) {
      SetIsLiked(true);
    }
  }, [el]);

  function handleOpenCommentSection() {
    setDisplayComments((prev) => !prev);
  }

  return (
    <div className={Style.buttons}>
      {displayComments && (
        <div className={Style.commentsHolder}>
          <ShowComments
            el={el}
            comments={comments}
            setAllComments={SetComments}
          />
        </div>
      )}
      <div className={Style.interAction}>
        {!isLiked ? <GoHeart /> : <GoHeartFill className={Style.isLiked} />}{' '}
        <p>{likes}</p>
      </div>

      <div className={Style.interAction} onClick={handleOpenCommentSection}>
        <FaRegComment />
        <p>{comments.length}</p>
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

function ShowComments({ el, setAllComments, comments }) {
  const { audioBlob } = useContext(FileUploads);
  const [comment, setShowComments] = useState(true);
  const [likes, setShowLikes] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const { userData } = useContext(UserContext);

  function handleShowLikes() {
    setShowLikes((prev) => !prev);
    setShowComments(false);
  }

  function handleShowComments() {
    setShowComments((prev) => !prev);
    setShowLikes(false);
  }

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
        <button onClick={handleShowComments}>Comments</button>
        <p>|</p>
        <button on onClick={handleShowLikes}>
          Likes
        </button>
      </div>
      {comments.length > 0 && comment ? (
        <>
          <div className={Style.allComments}>
            {comments.map((items) => {
              return (
                <DisplayUserAndComments
                  items={items}
                  handleDeleteComment={handleDeleteComment}
                />
              );
            })}
          </div>
        </>
      ) : (
        <>{comment && <p>No comments yet</p>}</>
      )}

      {likes && el?.likes.length > 0 ? (
        <div className={Style.allComments}>
          {el?.likes.map((items) => {
            return <ShowLikes items={items} />;
          })}
        </div>
      ) : (
        <>{likes && <p>No likes yet</p>}</>
      )}

      <div className={Style.yourComment}>
        <AudioRecordFunction audioSubmitfunction={handlePostComments} />
      </div>
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
