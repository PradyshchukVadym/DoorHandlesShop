import BasicRating from "../../../componens/RatingMui/RatingMui";
import "./ProductCard.css";
import StockFalse from "../../../Images/cardFilter/StockFalse.svg";
import gift from "../../../Images/cardFilter/gift.svg";
import StockTrue from "../../../Images/cardFilter/StockTrue.svg";
import { useNavigate } from "react-router-dom";

export const ProductCard = (props) => {
  const { product, rating } = props;
  const navigate = useNavigate();

  const getPhotoProduct = (arrayOfPhotos) => {
    if (arrayOfPhotos && arrayOfPhotos.length > 0) {
      return arrayOfPhotos[1].startsWith("data:")
        ? arrayOfPhotos[1]
        : `data:image/jpeg;base64,${arrayOfPhotos[1]}`;
    }

    return "";
  };

  return (
    <div className="productCard">
      <div className="product">
        <div
          onClick={() => navigate(`/InfoProductPage/${product.id}`)}
          className="photoBox"
        >
          <img
            src={getPhotoProduct(product.images)}
            alt=""
            className="imgPhoto"
          />
        </div>
        <div className="stockProduct">
          <div className="stockFalse">
            <img
              src={product.isInStock ? StockTrue : StockFalse}
              alt=""
              className="stockFalseImg"
            />
          </div>
          <div className="stockTextBox">
            <span className="stockText">
              {product.isInStock ? "В наличии" : "Нет в наличии"}
            </span>
          </div>
        </div>
        <div className="saleBox">
          <span className="Sale">Sale</span>
        </div>
        <div className="giftBox">
          <img src={gift} alt="" className="giftImg" />
          <div className="giftTextBox">
            <span className="giftText">Подарок</span>
          </div>
        </div>
      </div>
      <div className="descriptionProductCard">
        {rating ? (
          <div className="ratingProduct">
            <BasicRating ratingValue={product.rating || 0} readOnly />
          </div>
        ) : (
          ""
        )}

        <span className="titleDescProductCard">{product.title}</span>
        <div className="priceDescProductCard">
          <div className="priceDescProductCard">
            <span className="priceDescProductCardText">{product.price}₴</span>
          </div>
          <div className="priceDiscDescProductCard">
            <span className="priceDiscontDescProductCardText">
              {product.discountPrice}₴
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
