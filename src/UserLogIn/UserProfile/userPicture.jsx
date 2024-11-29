import Styles from './userPicture.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UInput from '../../ReUseComponenets/Input';
import UButton from '../../ReUseComponenets/button';
import { FaRegUser } from 'react-icons/fa';

export default function UploadProfilePicture() {
  const [openModel, setOpenModel] = useState(false);

  useEffect(() => {
    setOpenModel(true);
  }, []);

  function handleFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <div
      className={`${Styles.LogInPageContainer} ${
        openModel ? Styles.active : Styles.inActive
      }`}
    >
      <form className={Styles.ContainerSubPage} onSubmit={handleFormSubmit}>
        <div>
          <p>Upload Picture</p>
        </div>
        <div>
          <FaRegUser className={Styles.UserAvatar} />
        </div>
        <UInput PlaceHolder={'Enter Email Address'} Type={'file'} />
        <div className={Styles.fromButton}>
          <UButton ButtonName={'Upload'} />

          <Link to="/">
            <UButton ButtonName={'Back'} />
          </Link>
        </div>
      </form>
    </div>
  );
}
