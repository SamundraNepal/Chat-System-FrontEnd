import Styles from './userPicture.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UInput from '../../Components/Input';
import UButton from '../../Components/button';
import { FaRegUser } from 'react-icons/fa';
import { uploadAvatar } from '../../API/apiCalls';
import Spinner from '../../until/spinner/spinner';

export default function UploadProfilePicture({ userData }) {
  const [openModel, setOpenModel] = useState(false);
  const [uploadFiles, setUploadFiles] = useState('');
  const [logInPage, setLogInPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOpenModel(true);
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await uploadAvatar(uploadFiles, userData);
      if (!data) {
        console.log('upload Failed');
        setIsLoading(false);
      } else {
        setIsLoading(false);

        setLogInPage(true);
      }
    } catch (err) {
      console.log('upload Failed ', err.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      {!isLoading ? (
        <div
          className={`${Styles.LogInPageContainer} ${
            openModel ? Styles.active : Styles.inActive
          }`}
        >
          {!logInPage ? (
            <form
              className={Styles.ContainerSubPage}
              onSubmit={handleFormSubmit}
            >
              <div>
                <p>Upload Picture</p>
              </div>
              <div>
                <FaRegUser className={Styles.UserAvatar} />
              </div>
              <UInput
                Type={'file'}
                Accept="image/png, image/jpeg"
                OnChange={(e) => setUploadFiles(e.target.files[0])}
              />
              <div className={Styles.fromButton}>
                <UButton ButtonName={'Upload'} ClassName={Styles.button} />

                <Link to="/">
                  <UButton ButtonName={'Back'} ClassName={Styles.button} />
                </Link>
              </div>
            </form>
          ) : (
            <div className={Styles.ContainerSubPage}>
              <span>You can now Log In</span>
              <Link to="/">
                <UButton ButtonName={'Back'} ClassName={Styles.button} />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
