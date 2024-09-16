import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  code: Yup.string().required("Required"),
  rating: Yup.number().min(0).max(5).required("Required"),
  handleInstallation: Yup.string().required("Required"),
  color: Yup.number().required("Цвет обязательно"),
  material: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  isInStock: Yup.boolean().required("Required"),
  price: Yup.number().min(0).required("Required"),
  isDiscountPrice: Yup.boolean().required("Required"),
  discountPrice: Yup.number().min(0).required("Required"),
  characteristics: Yup.array().of(
    Yup.object().shape({
      key: Yup.string().required("Name of characteristic is required"),
      value: Yup.string().required("Value of characteristic is required"),
    })
  ),
  features: Yup.array().of(
    Yup.object().shape({
      key: Yup.string().required("Name of characteristic is required"),
      value: Yup.string().required("Value of characteristic is required"),
    })
  ),
  height: Yup.number().min(0).required("Required"),
  width: Yup.number().min(0).required("Required"),
  depth: Yup.number().min(0).required("Required"),
});
