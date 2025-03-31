import Styles from './userPicture.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UInput from '../../Components/Input';
import UButton from '../../Components/button';
import { FaRegUser } from 'react-icons/fa';
import { uploadAvatar } from '../../API/apiCalls';
import Spinner from '../../until/spinner/spinner';
import AvatarImage from '../../Components/avatar';

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
          <div className={Styles.appLogo}>
            <div className={Styles.logoName}>
              <h1>Tarang</h1>
            </div>
            <div className={Styles.logoImageAndName}>
              <img
                src="/TarangLogo.png"
                height={400}
                width={400}
                alt="appLogo"
              />
              <h2>Tarang</h2>
            </div>
          </div>

          {!logInPage ? (
            <form
              className={Styles.ContainerSubPage}
              onSubmit={handleFormSubmit}
            >
              <div>
                <p>Upload Picture</p>
              </div>
              <div>
                {!uploadFiles && <FaRegUser className={Styles.UserAvatar} />}

                {uploadFiles && (
                  <AvatarImage
                    SRC={URL.createObjectURL(uploadFiles)}
                    H={190}
                    W={190}
                    ALT={'User Image'}
                  />
                )}
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
