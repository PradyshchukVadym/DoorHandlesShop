import "../GridAdmin/GridAdmin.css";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import plus from "../../Images/icons8-plus.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import editIcon from "../../Images/edit.svg";
import deleteIcon from "../../Images/delete.svg";
import axiosInstance from "../../axiosInstance";
import { categoryArray } from "../../constants";

export const GridAdmin = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/GetAllProducts");
        const productsWithCategoryLabels = response.data.map((product) => {
          const category = categoryArray.find(
            (category) => category.value === product.category
          );
          return {
            ...product,
            category: category ? category.label : "Неизвестная категория",
          };
        });
        setAllProducts(productsWithCategoryLabels);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await axiosInstance.delete(`/DeleteProduct/${productId}`);
      setAllProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (err) {
      console.error("Ошибка при удалении продукта:", err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "title",
      headerName: "Название",
      width: 350,
    },
    {
      field: "category",
      headerName: "Категория",
      width: 250,
    },

    {
      field: "price",
      headerName: "Цена",
      type: "number",
      width: 100,
    },
    {
      field: "isInStock",
      headerName: "Наличие",
      type: "number",
      width: 100,
      valueGetter: (value) => (value === true ? "В наличии" : "Нет в наличии"),
    },
    {
      field: "rating",
      headerName: "Рейтинг",
      type: "number",
      width: 90,
    },
    {
      field: "images",
      headerName: "Фото товара",
      description: "Отображение изображения товара",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        const images = params.row.images;
        const imageUrl = images.length ? images[0] : "";
        return (
          <div className="gridPhoto">
            {imageUrl ? (
              <img
                className="imgInGrid"
                src={
                  imageUrl.startsWith("data:")
                    ? imageUrl
                    : `data:image/jpeg;base64,${imageUrl}`
                }
                alt="Product"
              />
            ) : (
              "Нет изображения"
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Редактировать товар",
      sortable: false,
      width: 300,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => (
        <>
          <button
            onClick={() => navigate(`/EditProduct/${params.row.id}`)}
            className="btnEditProduct"
          >
            <img src={editIcon} alt="" className="imgEditProduct" />
          </button>
          <button
            onClick={() => deleteProduct(params.row.id)}
            className="btnDeleteProduct"
          >
            <img src={deleteIcon} alt="" className="imgDeleteProduct" />
          </button>
        </>
      ),
      filterable: false,
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          disableDensitySelector={true}
          disableColumnResize={true}
          density="comfortable"
          rows={allProducts}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
      <div className="plusNewProduct">
        <img
          onClick={() => navigate("/PlusProduct")}
          src={plus}
          alt=""
          className="plus"
        />
      </div>
    </>
  );
};
