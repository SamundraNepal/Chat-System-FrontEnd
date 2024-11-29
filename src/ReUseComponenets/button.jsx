function UButton({ ButtonName, handleFunction, ClassName }) {
  return (
    <button onClick={handleFunction} className={ClassName}>
      {ButtonName}
    </button>
  );
}

export default UButton;
