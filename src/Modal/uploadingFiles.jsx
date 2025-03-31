import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { MediaUpload, UploadAudio } from '../API/apiCalls';
import { useContext } from 'react';
import { FileUploads } from '../until/useContext';

export default function UploadingFilesBackground() {
  const [isUploading, setIsUploading] = useState(false);
  const {
    isBackGroundUploading,
    setIsBackGroundUploading,
    audioData,
    setAudioData,
    mediaData,
    setMediaData,
    type,
    setType,
  } = useContext(FileUploads);

  const notify = () =>
    toast.info("Uploading files.We will notify you once it's done", {
      position: 'top-right',
    });

  const notifySuccess = () =>
    toast.success('File upload complete', {
      position: 'top-right',
    });

  const notifyError = (reason) =>
    toast.error(`File upload failed: ${reason}`, {
      position: 'top-right',
    });

  function closeBackGroundRunning() {
    const interval = setTimeout(() => {
      setIsBackGroundUploading(false);
    }, 3000);

    return () => clearTimeout(interval);
  }

  useEffect(() => {
    notify();

    if (type === 0) {
      UploadAudioPost();
    } else {
      toast.info('video uploading');
      UploadMediaPost();
    }
  }, [type]);

  async function UploadAudioPost() {
    if (isUploading) return;
    setIsUploading(true);

    try {
      const data = await UploadAudio(audioData);

      if (!data.success) {
        notifyError(data.message);
        closeBackGroundRunning();
      } else {
        notifySuccess();
        setAudioData({});
        closeBackGroundRunning();
      }
    } catch (err) {
      closeBackGroundRunning();
      notifyError(err.message);
    }
  }

  async function UploadMediaPost() {
    if (isUploading) return;
    setIsUploading(true);

    try {
      const data = await MediaUpload(audioData, mediaData);

      if (!data.success) {
        notifyError(data.message);
        closeBackGroundRunning();
      } else {
        notifySuccess();
        setAudioData({});
        closeBackGroundRunning();
      }
    } catch (err) {
      closeBackGroundRunning();
      notifyError(err.message);
    }
  }

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
