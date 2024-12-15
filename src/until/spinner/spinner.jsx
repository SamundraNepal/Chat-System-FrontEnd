import { useEffect, useState } from 'react';
import Styles from './spinner.module.css';

export default function Spinner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <div className={`${isOpen ? Styles.active : Styles.inActive}`}>
        <div className={Styles.spinnerDiv}>
          <div className={Styles.loader}></div>
          <div className={Styles.loaderTwo}></div>

          <span className={Styles.Gap}>Loading....</span>
        </div>
      </div>
    </>
  );
}
