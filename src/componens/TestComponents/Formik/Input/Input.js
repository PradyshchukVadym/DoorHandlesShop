import { Field, ErrorMessage as Error } from "formik";
import "./Input.css";

export const Input = ({ id, name, label, placeholder }) => {
  return (
    <div className="input-container">
      <label htmlFor={id}> {label}</label>
      <Field placeholder={placeholder} name={name} id={id} />
      <Error name={name}>{(error) => <span>{error}</span>}</Error>
    </div>
  );
};
