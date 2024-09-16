import "./Header.css";
import logoHeader from "../../Images/Logo.svg";
import downArrowr from "../../Images/downArrowr.svg";
import phoneCall from "../../Images/phone-call 1.svg";
import Frame from "../../Images/Frame.svg";
import basket from "../../Images/basket.svg";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="headerContainer">
      <div className="header">
        <div onClick={() => navigate("/")} className="logoHeader">
          <img src={logoHeader} alt="" className="logoSvgHeader" />
        </div>
        <nav className="menu">
          <ul
            onClick={() => navigate("/InfoProductPage")}
            className="menuItems"
          >
            Главная
          </ul>
          <ul
            onClick={() => navigate("/Catalog")}
            className="menuItemsDownArrow"
          >
            Каталог
            <img src={downArrowr} alt=" " className="downArrow" />
          </ul>
          <ul onClick={() => navigate("/CustomForm")} className="menuItems">
            Оптовая продажа
          </ul>
          <ul onClick={() => navigate("/Admin")} className="menuItems">
            О нас
          </ul>
        </nav>

        <div className="numberPhone">
          <div className="phoneImg">
            <img src={phoneCall} alt="" className="phoneHeader" />
          </div>
          <div className="number">
            <span className="num">+380 98 854 44 89</span>
          </div>
          <div className="favoriteBasket">
            <div className="favorite">
              <img src={Frame} alt="" className="favoriteSvg" />
            </div>
            <div className="basket">
              <img src={basket} alt="" className="basketSvg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
