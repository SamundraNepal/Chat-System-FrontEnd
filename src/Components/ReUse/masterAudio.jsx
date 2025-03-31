import { useContext, useEffect, useRef } from 'react';
import Style from './audio.module.css';
import { UserContext } from '../../until/useContext';

export default function UniversalAudio() {
  const { masterAudioPlay, setMasterAudioPlay, AudioFileToPlay } =
    useContext(UserContext);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (masterAudioPlay) {
      audioRef.current.load(); // Ensure browser loads the new audio file
      audioRef.current
        .play()
        .catch((err) => console.error('Audio play failed:', err));
      console.log('Audio is playing');

      // Listen for when the audio finishes playing
      audioRef.current.onended = () => {
        setMasterAudioPlay(false);
        console.log('Audio has finished playing');
      };
    } else {
      audioRef.current.pause();
    }
  }, [masterAudioPlay, AudioFileToPlay]);

  return (
    <div className={Style.audioBar}>
      <audio ref={audioRef} src={AudioFileToPlay}>
        Your browser does not support audio
      </audio>
    </div>
  );
}
