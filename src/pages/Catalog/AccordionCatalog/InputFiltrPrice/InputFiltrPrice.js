import "./InputFiltrPrice.css";

export const InputFiltrPrice = (props) => {
  const { minPrice, maxPrice, changeMaxPrice, changeMinPrice } = props;
  return (
    <div className="inputFilterPrixe">
      <div className="boxLowPrice">
        <input
          type="number"
          className="lowPrice"
          value={minPrice}
          onChange={(e) => changeMinPrice(e.target.value)}
        />
      </div>

      <div className="boxHighPrice">
        <input
          type="number"
          className="hightPrice"
          value={maxPrice}
          onChange={(e) => changeMaxPrice(e.target.value)}
        />
      </div>
    </div>
  );
};
