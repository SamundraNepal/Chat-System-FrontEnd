function UInput({
  PlaceHolder,
  Type = 'files',
  Accept = '',
  Value,
  OnChange,
  ClassName,
}) {
  return (
    <input
      className={ClassName}
      placeholder={PlaceHolder}
      type={Type}
      required
      accept={Accept}
      value={Value}
      onChange={OnChange}
    />
  );
}

export default UInput;
