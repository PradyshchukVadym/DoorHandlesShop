import "../CategoryHome/CategoryHome.css";
import category from "../../Images/category.png";

export const CategoryHome = () => {
  return (
    <div className="CategoryHomeContainer">
      <div className="CategoryCard">
        <div className="btnCategoryHome">
          <span className="titleKeyInCompany">для отелей</span>
          <div className="btnGoOverBox">
            <button className="btnGoOver">Перейти</button>
          </div>
        </div>
        <div className="CategoryImg">
          <img src={category} alt="" className="imgInCategory" />
        </div>
      </div>
      <div className="CategoryCard">
        <div className="btnCategoryHome">
          <span className="titleKeyInCompany">для отелей</span>
          <div className="btnGoOverBox">
            <button className="btnGoOver">Перейти</button>
          </div>
        </div>
        <div className="CategoryImg">
          <img src={category} alt="" className="imgInCategory" />
        </div>
      </div>
      <div className="CategoryCard">
        <div className="btnCategoryHome">
          <span className="titleKeyInCompany">для отелей</span>
          <div className="btnGoOverBox">
            <button className="btnGoOver">Перейти</button>
          </div>
        </div>
        <div className="CategoryImg">
          <img src={category} alt="" className="imgInCategory" />
        </div>
      </div>
      <div className="CategoryCard">
        <div className="btnCategoryHome">
          <span className="titleKeyInCompany">для отелей</span>
          <div className="btnGoOverBox">
            <button className="btnGoOver">Перейти</button>
          </div>
        </div>
        <div className="CategoryImg">
          <img src={category} alt="" className="imgInCategory" />
        </div>
      </div>
    </div>
  );
};
