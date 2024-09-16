import "./EditProductAdmin.css";

import React, { useState, useEffect } from "react";
import useEditProductFormik from "./UseEditProductForm";
import { validationSchema } from "./EditProductValidation";
import { TextBox } from "../TextBox/TextBox";
import AccordionExpandDefault from "../AccordinInAdmin/AccordinInAdmin";
import ControlledRadioButtonsGroup from "../RadioAdmin/RadioAdmin";
import axiosInstance from "../../axiosInstance";
import { InputFileEditForm } from "../EditProduct/ImputFileEditForm/ImputFileEditForm";
import {
  convertArrayStringToFileArray,
  convertBlobArrayToArrayString,
} from "../../Helpers/photoHelper";
import { SelectedForm } from "../EditProduct/SelectedEditForm/SelectedEditForm";
import {
  categoryArray,
  colorArray,
  handleInstallationArray,
  materialsArray,
  ratingArray,
} from "../../constants";
import { useParams } from "react-router-dom";

export const EditProductAdmin = () => {
  const [initialValues, setInitialValues] = useState({
    id: 0,
    title: "",
    description: "",
    code: "",
    rating: undefined,
    handleInstallation: undefined,
    color: undefined,
    complectation: undefined,
    material: undefined,
    category: undefined,
    images: [],
    isInStock: true,
    price: 0,
    isDiscountPrice: false,
    discountPrice: 0,
    characteristics: [{ id: 0, doorHandleId: 0, key: "", value: "" }],
    features: [{ id: 0, doorHandleId: 0, key: "", value: "" }],
    reviews: [],
    height: 0,
    width: 0,
    depth: 0,
  });

  const [photo, setPhoto] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const onSubmit = async () => {
    editProductAdmin.values.images = await convertBlobArrayToArrayString(photo);
    console.log("values", editProductAdmin.values);

    const data = JSON.stringify(editProductAdmin.values);
    const response = await axiosInstance.put(`/UpdateProduct`, data);
    console.log("response", response);
  };

  const editProductAdmin = useEditProductFormik(
    initialValues,
    validationSchema,
    onSubmit
  );

  const onChange = (field, arg) => {
    editProductAdmin.setFieldValue(field, arg);
  };

  const onBlur = (field) => {
    editProductAdmin.setFieldTouched(field, true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullProductData = { ...initialValues, photo };
    console.log("Product Data:", fullProductData);
  };

  console.log("aaa", initialValues);

  const { id } = useParams();
  const productId = Number(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/GetProductById/${productId}`
        );
        const init = response.data;
        const convertedStringArrayToBlob = convertArrayStringToFileArray(
          init.images
        ).then((res) => {
          init.images = convertedStringArrayToBlob;
          setPhoto(res);
        });
        setInitialValues(init);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [productId]);

  console.log("photo", photo);

  return (
    <div className="product-form-container">
      <h2>Редактирование продукта</h2>
      {isLoaded && (
        <>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-row">
              <TextBox
                label="Название товара:"
                value={editProductAdmin.values.title}
                error={editProductAdmin.errors.title}
                onChange={(e) => onChange("title", e.target.value)}
                onBlur={() => onBlur("title")}
              />
              <TextBox
                label="Описание товара:"
                value={editProductAdmin.values.description}
                error={editProductAdmin.errors.description}
                onChange={(e) => onChange("description", e.target.value)}
                onBlur={() => onBlur("description")}
              />
            </div>
            <div className="form-row">
              <TextBox
                label="Код товара:"
                value={editProductAdmin.values.code}
                error={editProductAdmin.errors.code}
                onChange={(e) => onChange("code", e.target.value)}
                onBlur={() => onBlur("code")}
              />
            </div>
            <div className="form-row">
              <TextBox
                label="ID товара:"
                value={editProductAdmin.values.id}
                disabled={true}
              />
              <SelectedForm
                key={`handleInstallation-key-${editProductAdmin.values.handleInstallation}`}
                label="Установка ручки"
                value={editProductAdmin.values.handleInstallation}
                error={editProductAdmin.errors.handleInstallation}
                selectBoxArray={handleInstallationArray}
                onChange={(value) => onChange("handleInstallation", value)}
              />
            </div>
            <div className="form-row">
              <SelectedForm
                key={`color-key-${editProductAdmin.values.color}`}
                label="Цвет продукта"
                value={editProductAdmin.values.color}
                error={editProductAdmin.errors.color}
                selectBoxArray={colorArray}
                onChange={(value) => onChange("color", value)}
              />
              <SelectedForm
                key={`rating-key-${editProductAdmin.values.rating}`}
                label="Рейтинг товара"
                value={editProductAdmin.values.rating}
                error={editProductAdmin.errors.rating}
                selectBoxArray={ratingArray}
                onChange={(value) => onChange("rating", value)}
              />
            </div>
            <div className="form-row">
              <SelectedForm
                key={`material-key-${editProductAdmin.values.material}`}
                label="Материал"
                value={editProductAdmin.values.material}
                error={editProductAdmin.errors.material}
                selectBoxArray={materialsArray}
                onChange={(value) => onChange("material", value)}
              />
              <SelectedForm
                key={`category-key-${editProductAdmin.values.category}`}
                label="Категория"
                value={editProductAdmin.values.category}
                error={editProductAdmin.errors.category}
                selectBoxArray={categoryArray}
                onChange={(value) => onChange("category", value)}
              />
            </div>
            <div className="form-row-Accordion">
              <AccordionExpandDefault
                value={editProductAdmin.values.features}
                error={editProductAdmin.errors}
                label={"Комплектация"}
                accordionType="features"
                onChange={onChange}
                onBlur={onBlur}
              />
            </div>
            <div className="form-row-Accordion">
              <AccordionExpandDefault
                value={editProductAdmin.values.characteristics}
                error={editProductAdmin.errors}
                label={"Характеристики"}
                accordionType="characteristics"
                onChange={onChange}
                onBlur={onBlur}
              />
            </div>
            <div className="form-row">
              <ControlledRadioButtonsGroup
                label1={"в налачии"}
                label2={"нет в наличии"}
                titleLable={"Наличие"}
                value={editProductAdmin.values.isInStock}
                onChange={(e) =>
                  onChange(
                    "isInStock",
                    e.target.value === "true" ? true : false
                  )
                }
              />
              <TextBox
                label="Цена:"
                value={editProductAdmin.values.price}
                error={editProductAdmin.errors.price}
                onChange={(e) => onChange("price", e.target.value)}
                onBlur={() => onBlur("price")}
              />
            </div>
            <div className="form-row">
              <ControlledRadioButtonsGroup
                label1={"да"}
                label2={"нет"}
                titleLable={"Есть ли цена со скидкой?"}
                value={editProductAdmin.values.isDiscountPrice}
                onChange={(e) =>
                  onChange(
                    "isDiscountPrice",
                    e.target.value === "true" ? true : false
                  )
                }
              />
              <TextBox
                label="Цена со скидкой:"
                value={editProductAdmin.values.discountPrice}
                error={editProductAdmin.errors.discountPrice}
                disabled={!editProductAdmin.values.isDiscountPrice}
                onChange={(e) => onChange("discountPrice", e.target.value)}
                onBlur={() => onBlur("discountPrice")}
              />
            </div>

            <div className="form-row">
              <TextBox
                label="Особенности:"
                value={editProductAdmin.values.complectation}
                error={editProductAdmin.errors.complectation}
                onChange={(e) => onChange("complectation", e.target.value)}
                onBlur={() => onBlur("complectation")}
              />
            </div>
            <div className="form-row">
              <TextBox
                label="Отзывы:"
                value={editProductAdmin.values.reviews}
                error={editProductAdmin.errors.reviews}
                onChange={(e) => onChange("reviews", e.target.value)}
                onBlur={() => onBlur("reviews")}
              />
              <TextBox
                label="Высота:"
                value={editProductAdmin.values.height}
                error={editProductAdmin.errors.height}
                onChange={(e) => onChange("height", e.target.value)}
                onBlur={() => onBlur("height")}
              />
            </div>
            <div className="form-row">
              <TextBox
                label="Ширина:"
                value={editProductAdmin.values.depth}
                error={editProductAdmin.errors.depth}
                onChange={(e) => onChange("depth", e.target.value)}
                onBlur={() => onBlur("depth")}
              />
              <TextBox
                label="Глубина:"
                value={editProductAdmin.values.width}
                error={editProductAdmin.errors.width}
                onChange={(e) => onChange("width", e.target.value)}
                onBlur={() => onBlur("width")}
              />
            </div>
          </form>
          <div className="inputBox">
            <InputFileEditForm
              placeholder="Добавить фото"
              accept=".png,.svg,.jpeg,.img"
              multiple={true}
              files={photo}
              setFiles={setPhoto}
            />
          </div>
          <div className="btnSave">
            <button
              disabled={Object.keys(editProductAdmin.errors).length > 0}
              onClick={onSubmit}
              type="submit"
              className={
                Object.keys(editProductAdmin.errors).length > 0
                  ? "disabled-submit-btn"
                  : "submit-btn"
              }
            >
              Сохранить
            </button>
          </div>
        </>
      )}
    </div>
  );
};
