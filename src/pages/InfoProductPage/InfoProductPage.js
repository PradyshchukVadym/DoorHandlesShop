import BasicRating from "../../componens/RatingMui/RatingMui";
import "./InfoProductPage.css";
import AccordionInfoProductPage from "./AccordionInfoProductPage/AccordionInfoProductPage";
import Photo1 from "../../Images/card/photo1.svg";
import checkMark from "../../Images/ProductCard/checkMark.svg";
import { Tabs } from "../InfoProductPage/TabsSelector/TabsSelector";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import {
  materialsArray,
  categoryArray,
  handleInstallationArray,
} from "../../constants";

export const InfoProductPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState();

  const { id } = useParams();
  const productId = Number(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/GetProductById/${productId}`
        );
        const result = response.data;
        setProduct(result);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [productId]);

  console.log("product", product);
  console.log("isLoaded", isLoaded);

  return (
    <div className="InfoProductPagecontainer">
      <div className="InfoProductPage">
        {isLoaded && (
          <>
            <div className="ImgBlockContainer">
              <div className="ImgBoxFirst">
                <img src={Photo1} className="ImgFirst" alt="" />
              </div>
              <div className="ImgSecondBlock">
                <div className="ImgBoxSecond">
                  <img src={Photo1} className="ImgSecond" alt="" />
                </div>
                <div className="ImgBoxSecond">
                  <img src={Photo1} className="ImgSecond" alt="" />
                </div>
                <div className="ImgBoxSecond">
                  <img src={Photo1} className="ImgSecond" alt="" />
                </div>
              </div>
              <div className="tabsInfoProductPage">
                <Tabs isShowContentOfTabs={true} product={product} />
              </div>
            </div>
            <div className="DescriptionProductContainer">
              <BasicRating ratingValue={product.rating} />
              <h2 className="titleDesc">{product.title}</h2>
              <span className="suitableInDoor">Подходит для установки на:</span>
              <div className="suitableInDoorBlock">
                <div className="checkMark">
                  <img src={checkMark} alt="" className="imgCheckMark" />
                </div>
                {product.handleInstallation !== undefined &&
                  product.handleInstallation !== null && (
                    <span className="choiceOption">
                      {
                        handleInstallationArray.find(
                          (item) => item.value === product.handleInstallation
                        )?.label
                      }
                    </span>
                  )}
              </div>
              <div className="complectatiom_Color">
                <div className="complectationBox">
                  <span className="complectationTitleDesc">Комплектация</span>
                  {product.category !== undefined &&
                    product.category !== null && (
                      <p className="complectationValue">
                        {
                          categoryArray.find(
                            (item) => item.value === product.category
                          )?.label
                        }
                      </p>
                    )}
                </div>
                <div className="colorTextBox">
                  <div className="colorTitleBox">
                    <span className="colorTitle">Цвет</span>
                  </div>
                  <div className="colorBox">
                    <div className="blackColor"></div>
                    <div className="YelowColor"></div>
                  </div>
                </div>
              </div>
              <div className="priceBoxDesc">
                <span className="priceDesc">{product.price}₴</span>
                <span className="discountPriceDesc">
                  {product.discountPrice !== 0 && <>{product.discountPrice}₴</>}
                </span>
              </div>
              <div className="btnBoxBuy">
                <button className="BuyDesc">Купить</button>
              </div>
              <div className="accordionProduct">
                <AccordionInfoProductPage
                  label1="Оплата"
                  label2="Монтаж и доставка"
                  label3="Гарантии и выгода"
                  TextBlock1="Оплата при получении товара, Картой онлайн, Google Pay, Акционная оплата картой Visa, Безналичными для юридических лиц, Безналичными для физических лиц, Apple Pay, PrivatPay, Оплата картой в отделении"
                  TextBlock2="Оплата при получении товара, Картой онлайн, Google Pay, Акционная оплата картой Visa, Безналичными для юридических лиц, Безналичными для физических лиц, Apple Pay, PrivatPay, Оплата картой в отделении"
                  TextBlock3="Оплата при получении товара, Картой онлайн, Google Pay, Акционная оплата картой Visa, Безналичными для юридических лиц, Безналичными для физических лиц, Apple Pay, PrivatPay, Оплата картой в отделении"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
