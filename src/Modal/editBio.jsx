import { useContext, useEffect, useState } from 'react';
import UButton from '../Components/button';
import UInput from '../Components/Input';
import Style from './UpdatePassword.module.css';
import { UserContext } from '../until/useContext';
import { UpdateUserBio } from '../API/apiCalls';
import Spinner from '../until/spinner/spinner';

export default function EditBio() {
  const [isOpen, setIsOpen] = useState(false);
  const { setEditBio, userData, setRefetchData } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);

  const [fromData, setFromData] = useState({
    Intro: '',
    Location: '',
    Education: '',
    Home: '',
    Hobbies: '',
  });

  useEffect(() => {
    setIsOpen(true);
    if (userData.user) {
      setFromData({
        Intro: userData.user.intro,
        Location: userData.user.location,
        Education: userData.user.education,
        Home: userData.user.home,
        Hobbies: userData.user.hobbies,
      });
    }
  }, []);

  function handleClose(e) {
    e.preventDefault();
    setIsOpen(false);

    const timer = setTimeout(() => {
      setEditBio(false);
    }, 500);

    return () => clearTimeout(timer);
  }

  function handleCloseAfterUpdate() {
    setIsOpen(false);

    const timer = setTimeout(() => {
      setEditBio(false);
    }, 500);

    return () => clearTimeout(timer);
  }
  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await UpdateUserBio(fromData);
      if (!data.success) {
        setLoading(false);
      } else {
        setRefetchData(true);
        setLoading(false);
        handleCloseAfterUpdate();
      }
    } catch (err) {
      setLoading(false);
      throw new Error('Failed to update the user bio ' + err.message);
    }
  }

  const handleChange = (field) => (e) => {
    setFromData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleValue = (field) => {
    return fromData[field];
  };

  function handleTagsResize(index, e) {
    e.preventDefault();
    const filterData = fromData.Hobbies.filter((items, acc) => acc !== index);
    setFromData({ ...fromData, Hobbies: filterData });
    console.log(index);
  }

  return (
    <div
      className={`${Style.ContainerBio} ${
        isOpen ? Style.IsActive : Style.IsInActive
      }`}
    >
      Bio
      {!isLoading ? (
        <form className={Style.bioContainer}>
          <label>Intro</label>
          <UInput
            PlaceHolder={'Introduce Yourself'}
            Value={handleValue('Intro', 'intro')}
            OnChange={handleChange('Intro')}
          />
          <label>Location</label>
          <UInput
            PlaceHolder={'Enter your Location'}
            Value={handleValue('Location', 'location')}
            OnChange={handleChange('Location')}
          />
          <label>Education</label>
          <UInput
            PlaceHolder={'Enter your Education'}
            Value={handleValue('Education', 'education')}
            OnChange={handleChange('Education')}
          />
          <label>Home</label>
          <UInput
            PlaceHolder={'Enter Your Home Location'}
            Value={handleValue('Home', 'home')}
            OnChange={handleChange('Home')}
          />
          <label>Hobbies</label>
          <UInput
            PlaceHolder={'Name your hobies'}
            Value={handleValue('Hobbies', 'hobbies')}
            OnChange={handleChange('Hobbies')}
          />
          {
            <div className={Style.BubblesDiv}>
              {Array.isArray(fromData.Hobbies) &&
                fromData.Hobbies.map((Items, index) => (
                  <div key={index} className={Style.Bubbles}>
                    <span>{Items}</span>
                    <button onClick={(e) => handleTagsResize(index, e)}>
                      X
                    </button>
                  </div>
                ))}
            </div>
          }

          <div className={Style.bioButtons}>
            <UButton
              ButtonName={'Update'}
              ClassName={Style.buttons}
              handleFunction={submitForm}
            />
            <UButton
              ButtonName={'Cancel'}
              ClassName={Style.buttons}
              handleFunction={handleClose}
            />
          </div>
        </form>
      ) : (
        <div className={Style.loaderDiv}>
          <Spinner size={'small'} />
        </div>
      )}
    </div>
  );
}
