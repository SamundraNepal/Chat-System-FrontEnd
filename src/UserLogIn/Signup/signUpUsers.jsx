import Styles from './Signup.module.css';
import UInput from '../../Components/Input';
import UButton from '../../Components/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import UploadProfilePicture from '../UserProfile/userPicture';
import Spinner from '../../until/spinner/spinner';
import { SignUpUser } from '../../API/apiCalls';
import { toast, ToastContainer } from 'react-toastify';

export default function SignUpUsers() {
  const [uploadImage, setUploadImage] = useState(false);
  const [isLoading, SetLoding] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    emailAddress: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });
  const [userData, setUserData] = useState({});

  const toastError = (response) => {
    toast.error(response, {
      position: 'bottom-right',
    });
  };
  async function handleFormSubmit(e) {
    e.preventDefault();
    SetLoding(true);
    try {
      const logInData = await SignUpUser(formData);
      if (!logInData.success) {
        toastError(logInData.message);
        SetLoding(false);
      } else {
        setUserData(logInData.message.data);
        setUploadImage(true);
        SetLoding(false);
      }
    } catch (err) {
      toastError(err.message);
      SetLoding(false);
    }
  }

  return (
    <>
      <ToastContainer />
      {!isLoading ? (
        <div>
          {!uploadImage ? (
            <div className={`${Styles.LogInPageContainer} `}>
              <div className={Styles.appLogo}>
                <div className={Styles.logoName}>
                  <h1>Buzz</h1>
                </div>
                <div className={Styles.logoImageAndName}>
                  <img
                    src="/TarangLogo.png"
                    height={400}
                    width={400}
                    alt="appLogo"
                  />
                </div>
              </div>
              <form
                className={Styles.ContainerSubPage}
                onSubmit={handleFormSubmit}
              >
                <div className={Styles.indivualsDiv}>
                  <span>First Name </span>
                  <UInput
                    PlaceHolder={'First Name'}
                    Type={'text'}
                    Value={formData.firstName}
                    OnChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className={Styles.indivualsDiv}>
                  <span>Last Name </span>
                  <UInput
                    PlaceHolder={'Last Name'}
                    Type={'text'}
                    Value={formData.lastName}
                    OnChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className={Styles.indivualsDiv}>
                  <span>Phone Number </span>
                  <UInput
                    PlaceHolder={'Enter Phone Number'}
                    Type={'number'}
                    Value={formData.phoneNumber}
                    OnChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className={Styles.indivualsDiv}>
                  <span>Email Address </span>
                  <UInput
                    PlaceHolder={'Enter Email Address'}
                    Type={'email'}
                    Value={formData.emailAddress}
                    OnChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        emailAddress: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className={Styles.indivualsDiv}>
                  <span>Gender </span>
                  <select
                    required
                    className={Styles.input}
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div className={Styles.indivualsDiv}>
                  <span>Password </span>
                  <UInput
                    PlaceHolder={'Enter Password'}
                    Type={'password'}
                    Value={formData.password}
                    OnChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className={Styles.indivualsDiv}>
                  <span>Confirm Password </span>
                  <UInput
                    PlaceHolder={'Confirm Password'}
                    Type={'password'}
                    Value={formData.confirmPassword}
                    OnChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className={Styles.indivualsDiv}>
                  <span>Date Of Birth </span>
                  <UInput
                    PlaceHolder={'Enter Password'}
                    Type={'Date'}
                    Value={formData.dateOfBirth}
                    OnChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dateOfBirth: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className={Styles.fromButton}>
                  <Link to="/">
                    <UButton ButtonName={'Back'} ClassName={Styles.button} />
                  </Link>
                  <UButton
                    ButtonName={'Create Account'}
                    ClassName={Styles.button}
                  />
                </div>
              </form>
            </div>
          ) : (
            <UploadProfilePicture userData={userData} />
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
