import Styles from './avatar.module.css';

export default function AvatarImage({ SRC, ALT, W, H, Click }) {
  return (
    <img
      className={Styles.avatar}
      src={SRC}
      alt={ALT}
      width={W}
      height={H}
      onClick={Click}
    />
  );
}
