import "./Home.css";
import { ProductCarusel } from "../../componens/ProductCarusel/ProductCarusel";
import photo1 from "../../Images/whyWe/photo1.svg";
import photo2 from "../../Images/whyWe/photo2.svg";
import { CategoryHome } from "../../componens/CategoryHome/CategoryHome";
import left from "../../Images/slider/left.svg";
import right from "../../Images/slider/right.svg";
import axiosInstance from "../../axiosInstance";
import { ProductCard } from "../Catalog/ProductCard/ProductCard";
import { useEffect, useState } from "react";

export const Home = () => {
  const [cardProduct, setCardProduct] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/GetAllProducts");
        console.log(response);
        const products = response.data;

        setCardProduct(products);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  console.log(cardProduct);
  return (
    <div className="homeContainer">
      <ProductCarusel />
      <div className="infoClientCompany">
        <div className="cardClientContainer">
          <div className="cardsInfo">
            <h4 className="numberOfCustomers">5,567</h4>
            <span className="infCard">Счастливых клиентов</span>
          </div>
          <div className="cardsInfo">
            <h4 className="numberOfCustomers">1245</h4>
            <span className="infCard">Продуктов на выбор</span>
          </div>
          <div className="cardsInfo">
            <h4 className="numberOfCustomers">372</h4>
            <span className="infCard">Продаж в день</span>
          </div>
          <div className="cardsInfo">
            <h4 className="numberOfCustomers">20</h4>
            <span className="infCard">Лет на рынке</span>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="whyWeContainer">
          <h3 className="whyWeTitle">Почему GoldenService? </h3>
          <div className="whyWeCards">
            <div className="whyWeCard">
              <div className="imgCardWhyWeContainer">
                <img src={photo1} className="imgCardWhyWe" alt="" />
              </div>
              <div className="tetCardContainer">
                <span className="tetCardWhyWe">
                  Возврат удвоенной стоимости каждого замка в случае брака.{" "}
                </span>
              </div>
            </div>
            <div className="whyWeCard">
              <div className="imgCardWhyWeContainer">
                <img src={photo2} className="imgCardWhyWe" alt="" />
              </div>
              <div className="tetCardContainer">
                <span className="tetCardWhyWe">
                  Наносим ваш логотип компании на наш продукт
                </span>
              </div>
            </div>
            <div className="whyWeCard">
              <div className="imgCardWhyWeContainer">
                <img src={photo1} className="imgCardWhyWe" alt="" />
              </div>
              <div className="tetCardContainer">
                <span className="tetCardWhyWe">
                  Возврат удвоенной стоимости каждого замка в случае брака.{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="CategoryTitleBlock">
          <h2 className="CategoryTitle">Категории</h2>
        </div>
        <CategoryHome />
        <div className="allCategoryBtnBox">
          <button className="allCategoryBtn">Все категории</button>
        </div>
        <div className="popularProductTitle">
          <h2 className="popularProductTitleH">Наши популярные продукты</h2>
          <div className="caruselPopularProduct">
            <img src={left} alt="" className="leftPopularProducr" />
            <img src={right} alt="" className="rightPopularProduct" />
          </div>
        </div>
        {isLoaded && (
          <div className="popularProductHome">
            <>
              {cardProduct.map((el, index) => (
                <ProductCard key={index} product={el} />
              ))}
            </>
          </div>
        )}
      </div>
    </div>
  );
};
