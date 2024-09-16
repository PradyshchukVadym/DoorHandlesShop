import "../PlusProduct/PlusProduct.css";
import React, { useState, useEffect } from "react";
import usePlusProductFormik from "./usePlusProductFormik";
import { validationSchema } from "./PlusProductValidation";
import { TextBox } from "../TextBox/TextBox";
import AccordionExpandDefault from "../AccordinInAdmin/AccordinInAdmin";
import ControlledRadioButtonsGroup from "../RadioAdmin/RadioAdmin";
import axiosInstance from "../../axiosInstance";
import { InputFileAddForm } from "./InputFileAddForm/InputFileAddForm";
import { convertBlobArrayToArrayString } from "../../Helpers/photoHelper";
import { SelectedForm } from "../PlusProduct/SelectedForm/SelectedForm";
import {
  categoryArray,
  colorArray,
  handleInstallationArray,
  materialsArray,
  ratingArray,
} from "../../constants";

export const PlusProduct = () => {
  const [initialValues] = useState({
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

  const onSubmit = async () => {
    plusProductFormik.values.images = await convertBlobArrayToArrayString(
      photo
    );
    console.log("values", plusProductFormik.values);

    const data = JSON.stringify(plusProductFormik.values);
    const response = await axiosInstance.post(`/CreateProduct`, data);
    console.log("response", response);
  };

  const plusProductFormik = usePlusProductFormik(
    initialValues,
    validationSchema,
    onSubmit
  );

  const onChange = (field, arg) => {
    plusProductFormik.setFieldValue(field, arg);
  };

  const onBlur = (field) => {
    plusProductFormik.setFieldTouched(field, true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullProductData = { ...initialValues, photo };
    console.log("Product Data:", fullProductData);
  };

  useEffect(() => {
    console.log("plusProductFormik", plusProductFormik);
  }, [plusProductFormik]);

  return (
    <div className="product-form-container">
      <h2>Добавление нового продукта</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-row">
          <TextBox
            label="Название товара:"
            value={plusProductFormik.values.title}
            error={plusProductFormik.errors.title}
            onChange={(e) => onChange("title", e.target.value)}
            onBlur={() => onBlur("title")}
          />
          <TextBox
            label="Описание товара:"
            value={plusProductFormik.values.description}
            error={plusProductFormik.errors.description}
            onChange={(e) => onChange("description", e.target.value)}
            onBlur={() => onBlur("description")}
          />
        </div>
        <div className="form-row">
          <TextBox
            label="Код товара:"
            value={plusProductFormik.values.code}
            error={plusProductFormik.errors.code}
            onChange={(e) => onChange("code", e.target.value)}
            onBlur={() => onBlur("code")}
          />
        </div>
        <div className="form-row">
          <TextBox
            label="ID товара:"
            value={plusProductFormik.values.id}
            disabled={true}
          />
          <SelectedForm
            label="Установка ручки"
            value={plusProductFormik.values.handleInstallation}
            error={plusProductFormik.errors.handleInstallation}
            selectBoxArray={handleInstallationArray}
            onChange={(value) => onChange("handleInstallation", value)}
          />
        </div>
        <div className="form-row">
          <SelectedForm
            label="Цвет продукта"
            value={plusProductFormik.values.color}
            error={plusProductFormik.errors.color}
            selectBoxArray={colorArray}
            onChange={(value) => onChange("color", value)}
          />
          <SelectedForm
            label="Рейтинг товара"
            value={plusProductFormik.values.rating}
            error={plusProductFormik.errors.rating}
            selectBoxArray={ratingArray}
            onChange={(value) => onChange("rating", value)}
          />
        </div>
        <div className="form-row">
          <SelectedForm
            label="Материал"
            value={plusProductFormik.values.material}
            error={plusProductFormik.errors.material}
            selectBoxArray={materialsArray}
            onChange={(value) => onChange("material", value)}
          />
          <SelectedForm
            label="Категория"
            value={plusProductFormik.values.category}
            error={plusProductFormik.errors.category}
            selectBoxArray={categoryArray}
            onChange={(value) => onChange("category", value)}
          />
        </div>
        <div className="form-row-Accordion">
          <AccordionExpandDefault
            value={plusProductFormik.values.features}
            error={plusProductFormik.errors}
            label={"Комплектация"}
            accordionType="features"
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
        <div className="form-row-Accordion">
          <AccordionExpandDefault
            value={plusProductFormik.values.characteristics}
            error={plusProductFormik.errors}
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
            value={plusProductFormik.values.isInStock}
            onChange={(e) =>
              onChange("isInStock", e.target.value === "true" ? true : false)
            }
          />
          <TextBox
            label="Цена:"
            value={plusProductFormik.values.price}
            error={plusProductFormik.errors.price}
            onChange={(e) => onChange("price", e.target.value)}
            onBlur={() => onBlur("price")}
          />
        </div>
        <div className="form-row">
          <ControlledRadioButtonsGroup
            label1={"да"}
            label2={"нет"}
            titleLable={"Есть ли цена со скидкой?"}
            value={plusProductFormik.values.isDiscountPrice}
            onChange={(e) =>
              onChange(
                "isDiscountPrice",
                e.target.value === "true" ? true : false
              )
            }
          />
          <TextBox
            label="Цена со скидкой:"
            value={plusProductFormik.values.discountPrice}
            error={plusProductFormik.errors.discountPrice}
            disabled={!plusProductFormik.values.isDiscountPrice}
            onChange={(e) => onChange("discountPrice", e.target.value)}
            onBlur={() => onBlur("discountPrice")}
          />
        </div>

        <div className="form-row">
          <TextBox
            label="Особенности:"
            value={plusProductFormik.values.complectation}
            error={plusProductFormik.errors.complectation}
            onChange={(e) => onChange("complectation", e.target.value)}
            onBlur={() => onBlur("complectation")}
          />
        </div>
        <div className="form-row">
          <TextBox
            label="Отзывы:"
            value={plusProductFormik.values.reviews}
            error={plusProductFormik.errors.reviews}
            onChange={(e) => onChange("reviews", e.target.value)}
            onBlur={() => onBlur("reviews")}
          />
          <TextBox
            label="Высота:"
            value={plusProductFormik.values.height}
            error={plusProductFormik.errors.height}
            onChange={(e) => onChange("height", e.target.value)}
            onBlur={() => onBlur("height")}
          />
        </div>
        <div className="form-row">
          <TextBox
            label="Ширина:"
            value={plusProductFormik.values.depth}
            error={plusProductFormik.errors.depth}
            onChange={(e) => onChange("depth", e.target.value)}
            onBlur={() => onBlur("depth")}
          />
          <TextBox
            label="Глубина:"
            value={plusProductFormik.values.width}
            error={plusProductFormik.errors.width}
            onChange={(e) => onChange("width", e.target.value)}
            onBlur={() => onBlur("width")}
          />
        </div>
      </form>
      <div className="inputBox">
        <InputFileAddForm
          placeholder="Добавить фото"
          accept=".png,.svg,.jpeg,.img"
          multiple={true}
          files={photo}
          setFiles={setPhoto}
        />
      </div>
      <div className="btnSave">
        <button
          // disabled={Object.keys(plusProductFormik.errors).length > 0}
          onClick={onSubmit}
          type="submit"
          className={
            Object.keys(plusProductFormik.errors).length > 0
              ? "disabled-submit-btn"
              : "submit-btn"
          }
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};
