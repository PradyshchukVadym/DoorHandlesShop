import { useState } from "react";
import "../TabsSelector/TabsSelector.css";

export const Tabs = (props) => {
  const { isShowContentOfTabs, product } = props;
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="tabs">
      <div className="btnDescCharacteristics">
        <div className="firstTab">
          <button
            onClick={() => setSelectedTab(0)}
            className={selectedTab === 0 ? "selectedTab" : "btnDesc"}
          >
            Характеристики
          </button>
        </div>
        <div className="secondTab">
          <button
            onClick={() => setSelectedTab(1)}
            className={selectedTab === 1 ? "selectedTab" : "btnDesc"}
          >
            Описание
          </button>
        </div>
        <div className="threeTab">
          <button
            onClick={() => setSelectedTab(2)}
            className={selectedTab === 2 ? "selectedTab" : "btnDesc"}
          >
            Отзывы
          </button>
        </div>
      </div>
      {isShowContentOfTabs === true && (
        <div>
          {selectedTab === 1 && (
            <div className="descriptionTextMain">
              <span className="descTitleText">
                Запись изображения в фотоаппарате осуществляется фотохимическим
                способом<br></br>при воздействии света на светочувствительный
                фотоматериал. Получаемое таким способом<br></br>скрытое
                изображение преобразуется в видимое при лабораторной обработке.
                В цифровом<br></br>
                фотоаппарате фотофиксация происходит путём фотоэлектрического
                преобразования<br></br>оптического изображения в электрический
                сигнал, цифровые данные о котором сохраняются<br></br> на
                энергонезависимом носителе.
              </span>
            </div>
          )}
          {selectedTab === 0 && (
            <div>
              {product.characteristics.map((el, index) => (
                <div
                  key={index}
                  className={`detalisInfo ${index % 2 === 0 ? "even" : "odd"}`}
                >
                  <div className="keyBox">
                    <span className="textLeftDesc">{el.key}</span>
                  </div>
                  <div className="valueBox">
                    <span className="textRightDesc">{el.value}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
