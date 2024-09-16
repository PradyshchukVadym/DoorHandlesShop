import "./TextBox.css";

export const TextBox = (props) => {
  const {
    label,
    value,
    onChange,
    onBlur,
    error,
    inputClassName,
    placeholder,
    disabled,
  } = props;
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="text"
        name="isAvailable"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className={inputClassName !== undefined && inputClassName}
        placeholder={placeholder}
        disabled={disabled}
      />

      {error !== undefined && (
        <div className="errorBox">
          <span className="error">{error}</span>
        </div>
      )}
    </div>
  );
};
