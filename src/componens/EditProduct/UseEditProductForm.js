import { useFormik } from "formik";

const useEditProductFormik = (initialValues, validationSchema, onSubmit) => {
  const formikForms = useFormik({
    initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,

    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return formikForms;
};

export default useEditProductFormik;
