import { useEffect, useState } from 'react';
import Styles from './spinner.module.css';

export default function Spinner({ size }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <div className={`${isOpen ? Styles.active : Styles.inActive}`}>
        <div className={Styles.spinnerDiv}>
          <div
            className={size === 'small' ? Styles.Smallloader : Styles.loader}
          ></div>
          <div
            className={
              size === 'small' ? Styles.SmallloaderTwo : Styles.loaderTwo
            }
          ></div>

          <span className={Styles.Gap}>Loading....</span>
        </div>
      </div>
    </>
  );
}
