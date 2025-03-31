import { useEffect, useRef, useState } from 'react';
import Style from './UpdatePassword.module.css';
import { useContext } from 'react';
import { FileUploads, UserContext } from '../until/useContext';
import { AiFillAudio } from 'react-icons/ai';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { FaRegCirclePause } from 'react-icons/fa6';
import { CiPlay1 } from 'react-icons/ci';
import { MdDone } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';
import { VscDebugRestart } from 'react-icons/vsc';
import UButton from '../Components/button';

export default function CreatePost() {
  const [isOpen, setIsOpen] = useState(false); // opens up this modal

  //to handle audio and video Ui and start redcording
  const [audio, setAudio] = useState(true);
  const [startRecording, setStartRecording] = useState(false);
  const [videoAndImages, setVideoAndImages] = useState(false);
  const [videoAndImageForm, setVideoAndImageForm] = useState({});

  //useContext
  const { setCreatePost } = useContext(UserContext);
  const { setAudioData } = useContext(FileUploads);

  //track the audio time
  const [seconds, setSeconds] = useState(0);
  const [Minutes, setMinutes] = useState(0);

  //pause and unpause audio and handle finished recording
  const [isPaused, setPaused] = useState(false);
  const [finishedRecording, setfinishedRecording] = useState(false);

  const [audioUrl, setAudioUrl] = useState(null); //create realtime playback url for the audio recorded
  const [mediaRecorder, setMediaRecorder] = useState(null); // to create an instance of an audio

  const modalRef = useRef(null);

  const [viewAllFiles, setViewAllFiles] = useState(false); // to view all the uploaded files in one div

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        !viewAllFiles &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsOpen(false); // Close the box
        setCreatePost(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [viewAllFiles]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
      })
      .catch((err) => {
        console.error('Error accessing microphone', err);
      });
  }, []);

  useEffect(() => {
    if (mediaRecorder) {
      const chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      if (finishedRecording) {
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          setAudioData(blob);
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
        };
      }
    }
  }, [mediaRecorder, finishedRecording]);

  function handleGoBack() {
    setStartRecording(false);
    if (mediaRecorder) {
      mediaRecorder.stop();
      setAudioUrl(null);
    }
  }

  function handleFinishedRecording() {
    setfinishedRecording(true);
    setStartRecording(true);
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  }

  function handleStartRecording() {
    if (mediaRecorder) {
      mediaRecorder.start();
      setStartRecording(true);
    }
    setSeconds(0);
    setMinutes(0);
  }

  function handleIsPaused() {
    setPaused(true);
    if (mediaRecorder) {
      mediaRecorder.pause();
    }
  }

  function handleUnPause() {
    setPaused(false);
    if (mediaRecorder) {
      mediaRecorder.resume();
    }
  }

  function handleRestartRecording() {
    setStartRecording(false);
    setfinishedRecording(false);
  }

  useEffect(() => {
    // Set an interval to update the seconds every 1 second
    const interval = setInterval(() => {
      if (startRecording && !isPaused) {
        setSeconds((prevSeconds) => prevSeconds + 1);
        if (seconds >= 59) {
          setMinutes((prev) => prev + 1);
          setSeconds(0);
        }
      }
    }, 1000); // 1000ms = 1 second

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [startRecording, seconds, isPaused]);

  function handleAudio() {
    setAudio(true);
    setVideoAndImages(false);
  }

  function handleVideoAndImages() {
    setAudio(false);
    setVideoAndImages(true);
  }

  return (
    <div
      className={`${Style.backDrop}  ${
        isOpen ? Style.IsActive : Style.IsInActive
      }`}
    >
      {viewAllFiles && (
        <ShowAllFiles
          videoAndImageForm={videoAndImageForm}
          setVideoAndImageForm={setVideoAndImageForm}
          setViewAllFiles={setViewAllFiles}
          viewAllFiles={viewAllFiles}
        />
      )}
      <div
        ref={modalRef}
        className={`${Style.ContainerCreatePost} ${
          isOpen ? Style.IsActive : Style.IsInActive
        }`}
      >
        <div className={Style.createPostDiv}>
          <NavBar
            handleAudio={handleAudio}
            handleVideoAndImages={handleVideoAndImages}
          />

          <div className={Style.actualPosts}>
            <AudioNav
              setAudio={setAudio}
              audio={audio}
              startRecording={startRecording}
              handleStartRecording={handleStartRecording}
              finishedRecording={finishedRecording}
              handleGoBack={handleGoBack}
              isPaused={isPaused}
              handleIsPaused={handleIsPaused}
              handleUnPause={handleUnPause}
              handleFinishedRecording={handleFinishedRecording}
              handleRestartRecording={handleRestartRecording}
              audioUrl={audioUrl}
              Minutes={Minutes}
              seconds={seconds}
            />

            <VideoAndImageNav
              setVideoAndImages={setVideoAndImages}
              videoAndImageForm={videoAndImageForm}
              videoAndImages={videoAndImages}
              setVideoAndImageForm={setVideoAndImageForm}
              startRecording={startRecording}
              handleStartRecording={handleStartRecording}
              finishedRecording={finishedRecording}
              handleGoBack={handleGoBack}
              isPaused={isPaused}
              handleIsPaused={handleIsPaused}
              handleUnPause={handleUnPause}
              handleFinishedRecording={handleFinishedRecording}
              handleRestartRecording={handleRestartRecording}
              audioUrl={audioUrl}
              Minutes={Minutes}
              seconds={seconds}
              setViewAllFiles={setViewAllFiles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavBar({ handleAudio, handleVideoAndImages }) {
  return (
    <div className={Style.postNav}>
      <button onClick={handleAudio} ClassName={Style.navButton}>
        Audio
      </button>
      <button onClick={handleVideoAndImages} ClassName={Style.navButton}>
        Video/Image
      </button>
    </div>
  );
}

function AudioNav({
  audio,
  startRecording,
  handleStartRecording,
  finishedRecording,
  handleGoBack,
  isPaused,
  handleIsPaused,
  handleUnPause,
  handleFinishedRecording,
  handleRestartRecording,
  audioUrl,
  Minutes,
  seconds,
}) {
  const { setIsBackGroundUploading } = useContext(FileUploads);
  const { setCreatePost } = useContext(UserContext);

  function handleAudioUpload() {
    setIsBackGroundUploading(true);
    setCreatePost(false);
  }

  return (
    <>
      {audio && (
        <div>
          {!startRecording && (
            <button className={Style.UIbutton} onClick={handleStartRecording}>
              <AiFillAudio />
            </button>
          )}

          {!finishedRecording && startRecording && (
            <div className={Style.Recording}>
              <button onClick={handleGoBack}>
                <IoArrowBack />
              </button>
              {!isPaused && (
                <button onClick={handleIsPaused}>
                  <FaRegCirclePause />
                </button>
              )}
              {isPaused && (
                <button onClick={handleUnPause}>
                  <CiPlay1 />
                </button>
              )}
              <button onClick={handleFinishedRecording}>
                <MdDone />
              </button>
            </div>
          )}

          {!finishedRecording && startRecording && (
            <div className={Style.audioDivAudioUI}>
              <div className={Style.audioUI}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className={`${
                      !isPaused ? Style.audioAnimationDiv : Style.paused
                    } ${Style[`bar${index}`]}`}
                  >
                    <AudioAnimations />
                  </div>
                ))}
              </div>
              <label>
                {Minutes < 10 && 0}
                {Minutes} : {seconds < 10 && 0}
                {seconds}
              </label>
            </div>
          )}

          {finishedRecording && (
            <div className={Style.finishedRecording}>
              <button
                className={Style.UIbutton}
                onClick={handleRestartRecording}
              >
                <VscDebugRestart />
              </button>
              <audio src={audioUrl} controls>
                Your browser does not support the audio element.
              </audio>

              <button className={Style.buttons} onClick={handleAudioUpload}>
                Post
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function VideoAndImageNav({
  videoAndImageForm,
  videoAndImages,
  setVideoAndImageForm,
  startRecording,
  handleStartRecording,
  finishedRecording,
  handleGoBack,
  isPaused,
  handleIsPaused,
  handleUnPause,
  handleFinishedRecording,
  handleRestartRecording,
  audioUrl,
  Minutes,
  seconds,
  setViewAllFiles,
}) {
  const { setIsBackGroundUploading, setType, setMediaData } =
    useContext(FileUploads);
  const { setCreatePost } = useContext(UserContext);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileList = Array.from(files);
    setMediaData(fileList); // store the files in this medai hook
    setVideoAndImageForm(fileList);
  };

  const UrlRef = useRef([]);

  const [urls, setUrls] = useState({});

  useEffect(() => {
    if (Array.isArray(videoAndImageForm)) {
      UrlRef.current = videoAndImageForm.map((Items) =>
        URL.createObjectURL(Items),
      );
    }
    setUrls(UrlRef.current);
  }, [videoAndImageForm]);

  function handleUploadFiles() {
    setType(1);
    setIsBackGroundUploading(true);
    setCreatePost(false);
  }

  return (
    <div>
      {!videoAndImageForm.length > 0 && videoAndImages && (
        <div className={Style.videoAndImagesDiv}>
          <span>
            <MdOutlineAddPhotoAlternate />
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
            />
          </span>

          <label>Add videos/Images</label>
        </div>
      )}
      {videoAndImageForm.length > 0 && videoAndImages && (
        <div className={Style.showFiles}>
          <div>
            <div>
              {!startRecording && (
                <div className={Style.videoCaptionDiv}>
                  <button
                    className={Style.UIbutton}
                    onClick={handleStartRecording}
                  >
                    <AiFillAudio />
                  </button>

                  <label>Add a voice to your post</label>
                </div>
              )}

              {!finishedRecording && startRecording && (
                <div className={Style.CaptionButtons}>
                  <button onClick={handleGoBack}>
                    <IoArrowBack />
                  </button>
                  {!isPaused && (
                    <button onClick={handleIsPaused}>
                      <FaRegCirclePause />
                    </button>
                  )}
                  {isPaused && (
                    <button onClick={handleUnPause}>
                      <CiPlay1 />
                    </button>
                  )}
                  <button onClick={handleFinishedRecording}>
                    <MdDone />
                  </button>

                  <>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className={`${
                          !isPaused ? Style.audioAnimationDiv : Style.paused
                        } ${Style[`bar${index}`]}`}
                      >
                        <AudioAnimations />
                      </div>
                    ))}
                    <label>
                      {Minutes < 10 && 0}
                      {Minutes} : {seconds < 10 && 0}
                      {seconds}
                    </label>
                  </>
                </div>
              )}

              {finishedRecording && startRecording && (
                <div className={Style.AudioDivUI}>
                  <button
                    onClick={handleRestartRecording}
                    className={Style.FinishedButton}
                  >
                    <VscDebugRestart />
                  </button>
                  <audio src={audioUrl} controls>
                    Your browser does not support audio
                  </audio>
                </div>
              )}
            </div>
          </div>
          <div className={Style.imageGrid}>
            <div className={Style.imagesGrid}>
              {Array.isArray(videoAndImageForm) &&
                videoAndImageForm.slice(0, 2).map((Items, index) =>
                  Items.type.startsWith('image/') ? (
                    <img src={urls[index]} alt="images" />
                  ) : (
                    <video src={urls[index]} type={Items.type}>
                      Your browser does not support the video tag.
                    </video>
                  ),
                )}
              {videoAndImageForm.length > 2 && (
                <div className={Style.remainingFiles}>
                  <span onClick={() => setViewAllFiles(true)}>
                    {videoAndImageForm.length - 2}+
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={Style.postbuttonDiv}>
            <button
              className={Style.postButton}
              onClick={() => setVideoAndImageForm('')}
            >
              Cancel
            </button>
            <UButton
              ButtonName={'Post'}
              ClassName={Style.postButton}
              handleFunction={handleUploadFiles}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function AudioAnimations() {
  return <div className={Style.audioAnimationBar}></div>;
}

function ShowAllFiles({ videoAndImageForm, setViewAllFiles }) {
  return (
    <div className={Style.showAllFiles}>
      <div className={Style.BackButton}>
        <button onClick={() => setViewAllFiles(false)}>Back</button>
      </div>
      <div className={Style.showAllFilesItems}>
        {Array.isArray(videoAndImageForm) &&
          videoAndImageForm.map((Items) =>
            Items.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(Items)} alt="images" />
            ) : (
              <video
                src={URL.createObjectURL(Items)}
                controls
                type={Items.type}
              >
                Your browser does not support the video tag.
              </video>
            ),
          )}
      </div>
    </div>
  );
}
