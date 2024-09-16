import "./ProductCarusel.css";
import bigPoint from "../../Images/slider/bigPoint.svg";
import left from "../../Images/slider/left.svg";
import right from "../../Images/slider/right.svg";
import smallPoint from "../../Images/slider/smallPoint.svg";
import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { handleInstallationArray } from "../../constants";

export const ProductCarusel = () => {
  const [popularProducts, setPopularProducts] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/GetAllProducts");
        console.log(response);
        const products = response.data;

        setPopularProducts(products);
        setIsLoaded(true);
        if (products && Array.isArray(products)) {
          setCurrentProductId(products[0].id);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  console.log(popularProducts);

  const getCurrentProduct = () => {
    return popularProducts.find((product) => product.id === currentProductId);
  };

  const getPhotoProduct = (arrayOfPhotos) => {
    if (arrayOfPhotos && arrayOfPhotos.length > 0) {
      return arrayOfPhotos[2].startsWith("data:")
        ? arrayOfPhotos[2]
        : `data:image/jpeg;base64,${arrayOfPhotos[2]}`;
    }

    return "";
  };

  const handleClickArrowRight = () => {
    const currentIndex = popularProducts.findIndex(
      (product) => product.id === currentProductId
    );
    if (currentIndex < popularProducts.length - 1) {
      setCurrentProductId(popularProducts[currentIndex + 1].id);
    }
  };

  const handleClickArrowLeft = () => {
    const currentIndex = popularProducts.findIndex(
      (product) => product.id === currentProductId
    );
    if (currentIndex > 0) {
      setCurrentProductId(popularProducts[currentIndex - 1].id);
    }
  };

  const handleDotClick = (id) => {
    setCurrentProductId(id);
  };

  const getVisibleDots = () => {
    const total = popularProducts.length;
    const currentIndex = popularProducts.findIndex(
      (product) => product.id === currentProductId
    );
    const ids = popularProducts.map((product) => product.id);

    let start = Math.max(currentIndex - 1, 0);
    let end = Math.min(currentIndex + 1, total - 1);

    if (total <= 3) {
      start = 0;
      end = total - 1;
    } else {
      if (currentIndex === 0) {
        end = 2;
      } else if (currentIndex === total - 1) {
        start = total - 3;
      }
    }

    return ids.slice(start, end + 1);
  };

  return (
    <div className="ProductCaruselContainer">
      {isLoaded && (
        <>
          <div className="containerBlock">
            <>
              {" "}
              <div className="imgLeftBlock">
                <img
                  src={getPhotoProduct(getCurrentProduct().images)}
                  alt=""
                  className="titleImg"
                />
              </div>
              <div className="titleRightt">
                <h1 className="titleProduct">{getCurrentProduct()?.title}</h1>
                <p className="desc">{getCurrentProduct()?.description}</p>
                <p className="installation">
                  {handleInstallationArray.find(
                    (option) =>
                      option.value === getCurrentProduct()?.handleInstallation
                  )?.label || "Не указано"}
                </p>
                <p className="priceProductTitle">Цена</p>
                <div className="totalPrice">
                  <p className="priceTitle">{getCurrentProduct()?.price} ₴</p>
                  <span className="priceWithout">
                    {getCurrentProduct()?.discountPrice} ₴
                  </span>
                </div>
                <div className="BtnAddBasket">
                  <button className="addBasket">Добавить в корзину</button>
                </div>
              </div>
            </>
          </div>
          <div className="caruselContainer">
            <div className="carusel">
              <div onClick={handleClickArrowLeft} className="arrowLeft">
                <img src={left} alt="" className="left" />
              </div>
              <div className="points">
                {getVisibleDots().map((id) => (
                  <img
                    key={id}
                    src={currentProductId === id ? bigPoint : smallPoint}
                    alt=""
                    className="point"
                    onClick={() => handleDotClick(id)}
                  />
                ))}
              </div>
              <div onClick={handleClickArrowRight} className="arrowRight">
                <img src={right} alt="" className="right" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
