import { useEffect, useRef, useState } from 'react';
import Style from './audio.module.css';

import { TbPlayerPlayFilled } from 'react-icons/tb';
import { TbPlayerPauseFilled } from 'react-icons/tb';

export default function PlayAudioUI({ post }) {
  const [playAudio, setPlayAudio] = useState(false);

  function handlePlayAudio() {
    setPlayAudio((prev) => !prev);
  }

  return (
    <div className={Style.audioUI}>
      <div className={Style.audioVinyl}>
        {!playAudio && (
          <button onClick={handlePlayAudio}>
            <TbPlayerPlayFilled />
          </button>
        )}
        {playAudio && (
          <button onClick={handlePlayAudio}>
            <TbPlayerPauseFilled />
          </button>
        )}
        <div></div>
      </div>

      <UniversalAudio
        post={post}
        playAudio={playAudio}
        setPlayAudio={setPlayAudio}
      />
    </div>
  );
}

function UniversalAudio({ post, playAudio, setPlayAudio }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (playAudio) {
      audioRef.current.play();

      audioRef.current.onended = () => {
        setPlayAudio(false);
        console.log('Audio has finished playing');
      };
    } else {
      audioRef.current.pause();
    }
  }, [playAudio]);

  return (
    <div className={Style.audioBar}>
      <audio ref={audioRef} src={post.audioLink} controls>
        Your browser does not support audio
      </audio>
    </div>
  );
}
