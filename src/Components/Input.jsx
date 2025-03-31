function UInput({
  PlaceHolder,
  Type = 'files',
  Accept = '',
  Value,
  OnChange,
  ClassName,
  functionName,
  OnFocus,
  Disbaled,
}) {
  return (
    <input
      className={ClassName}
      placeholder={PlaceHolder}
      type={Type}
      required
      disabled={Disbaled}
      onFocus={OnFocus}
      accept={Accept}
      value={Value}
      onChange={OnChange}
      onClick={functionName}
    />
  );
}

export default UInput;
