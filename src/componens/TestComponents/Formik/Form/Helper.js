import * as Yup from "yup";

const firstName = Yup.string()
  .matches("Лох, от 2 до 20 символов")
  .required("что-то введи");

export const schemas = {
  custom: Yup.object().shape({
    firstName,
  }),
};

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
};
