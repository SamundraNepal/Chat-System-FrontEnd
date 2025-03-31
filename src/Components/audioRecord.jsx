import { AiFillAudio } from 'react-icons/ai';
import { FaRegCirclePause } from 'react-icons/fa6';
import { CiPlay1 } from 'react-icons/ci';
import { MdDone } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';
import { VscDebugRestart } from 'react-icons/vsc';
import { useContext, useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';

import Style from './audioRecord.module.css';
import { FileUploads } from '../until/useContext';

export default function AudioRecordFunction({ audioSubmitfunction }) {
  const [startRecording, setStartRecording] = useState(false);

  //track the audio time
  const [seconds, setSeconds] = useState(0);
  const [Minutes, setMinutes] = useState(0);

  //pause and unpause audio and handle finished recording
  const [isPaused, setPaused] = useState(false);
  const [finishedRecording, setfinishedRecording] = useState(false);

  const { setAudioBlob } = useContext(FileUploads);
  const [audioUrl, setAudioUrl] = useState(null); //create realtime playback url for the audio recorded
  const [mediaRecorder, setMediaRecorder] = useState(null); // to create an instance of an audio

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
          setAudioBlob(blob);
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

  function handleAudioSubmit() {
    setStartRecording(false);
    setfinishedRecording(false);
    audioSubmitfunction();
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

  return (
    <>
      {
        <div className={Style.audioStyle}>
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

              <button className={Style.UIbutton}>
                <IoIosSend onClick={handleAudioSubmit} />
              </button>
            </div>
          )}
        </div>
      }
    </>
  );
}

function AudioAnimations() {
  return <div className={Style.audioAnimationBar}></div>;
}
