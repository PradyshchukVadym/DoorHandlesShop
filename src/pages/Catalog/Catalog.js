import "./Catalog.css";
import { SelectedForm } from "../../componens/PlusProduct/SelectedForm/SelectedForm";
import {
  colorArray,
  popularRatingFilter,
  materialsArray,
} from "../../constants";
import { AccordionCatalog } from "./AccordionCatalog/AccordionCatalog";
import { useState, useEffect } from "react";
import { InputFiltrPrice } from "./AccordionCatalog/InputFiltrPrice/InputFiltrPrice";
import { CategoryCheckboxes } from "./CheckBox/CheckBox";
import { ProductCard } from "./ProductCard/ProductCard";
import axiosInstance from "../../axiosInstance";

export const Catalog = () => {
  const [sortBySelectSort, setSortBySelectSort] = useState(0);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRemoveSelected, setIsRemoveSelected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/GetAllProducts");
        const products = response.data;
        const prices = products.map((product) => product.price);
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));

        setAllProducts(products);
        setFilteredProducts(products);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  console.log(allProducts);

  const handleColorChange = (isChecked, valueOfColor) => {
    if (isChecked) {
      setSelectedColors([...selectedColors, valueOfColor]);
    } else {
      const newColorArray = selectedColors.filter((e) => e !== valueOfColor);
      setSelectedColors(newColorArray);
    }
  };

  const handleMaterialChange = (isChecked, valueOfMaterial) => {
    if (isChecked) {
      setSelectedMaterials([...selectedMaterials, valueOfMaterial]);
    } else {
      const newMaterialArray = selectedMaterials.filter(
        (e) => e !== valueOfMaterial
      );
      setSelectedMaterials(newMaterialArray);
    }
  };

  const filterProducts = () => {
    const filtered = allProducts.filter((product) => {
      const withinPriceRange =
        product.price >= minPrice && product.price <= maxPrice;
      const matchesColor =
        selectedColors.length === 0 || selectedColors.includes(product.color);
      const matchesMaterial =
        selectedMaterials.length === 0 ||
        selectedMaterials.includes(product.material);

      return withinPriceRange && matchesColor && matchesMaterial;
    });

    setFilteredProducts(filtered);
  };

  const cleanFilter = () => {
    const prices = allProducts.map((product) => product.price);
    setMinPrice(Math.min(...prices));
    setMaxPrice(Math.max(...prices));

    setFilteredProducts(allProducts);
    setIsRemoveSelected(!isRemoveSelected);
    setSelectedColors([]);
    setSelectedMaterials([]);
  };

  useEffect(() => {
    filterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColors, selectedMaterials, minPrice, maxPrice]);

  return (
    <div className="catalogContainer">
      <div className="wrapperCatalogContainer">
        <div className="headerCatalogContainer">
          <h2 className="titleCatalog">Накладные електронные замки</h2>
          <div className="btnBoxResetFiltr">
            <button className="ResetFiltr" onClick={() => cleanFilter()}>
              Сбросить фильтры
            </button>
            <SelectedForm
              selectBoxArray={popularRatingFilter}
              value={sortBySelectSort}
              onChange={(e) => setSortBySelectSort(e)}
              label="Сортировка"
              className="selectedStyle"
              selectContainerClassName="selectBoxContainer"
            />
          </div>
          <div className="bodyContainer">
            <div className="filterWrapper">
              <div className="filterBlock">
                <h4 className="titleFilter">Фильтры</h4>
                <div className="accordionFiltr">
                  <AccordionCatalog
                    label="Цена"
                    component={
                      <InputFiltrPrice
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        changeMaxPrice={setMaxPrice}
                        changeMinPrice={setMinPrice}
                      />
                    }
                  />
                </div>
                <div className="accordionFiltr">
                  <AccordionCatalog
                    label="Цвет"
                    component={colorArray.map((color) => {
                      return (
                        <>
                          <CategoryCheckboxes
                            onChange={(e) => handleColorChange(e, color.value)}
                            isRemoveSelected={isRemoveSelected}
                            label={color.label}
                          />
                        </>
                      );
                    })}
                  />
                </div>
                <div className="accordionFiltr">
                  <AccordionCatalog
                    label="Материал"
                    component={materialsArray.map((material) => {
                      return (
                        <>
                          <CategoryCheckboxes
                            onChange={(e) =>
                              handleMaterialChange(e, material.value)
                            }
                            isRemoveSelected={isRemoveSelected}
                            label={material.label}
                          />
                        </>
                      );
                    })}
                  />
                </div>
                <div className="btnFilter">
                  <button onClick={() => cleanFilter()} className="resetFilter">
                    Сбросить
                  </button>
                </div>
              </div>
            </div>
            {isLoaded && (
              <>
                <div className="productCardContainer">
                  {filteredProducts.map((el, index) => (
                    <ProductCard key={index} product={el} rating={true} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
