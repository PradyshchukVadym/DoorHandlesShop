import "./App.css";
import { Header } from "./pages/Header/Header";
import { Home } from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import { PlusProduct } from "./componens/PlusProduct/PlusProduct";
import { CustomForm } from "./componens/TestComponents/Formik/Form/Form";
import { TestComponents } from "./componens/TestComponents/TestComponents";
// import { Footer } from "./pages/Footer.js/Footer";
import { Catalog } from "./pages/Catalog/Catalog";
import { EditProductAdmin } from "./componens/EditProduct/EditProductAdmin";
import { InfoProductPage } from "./pages/InfoProductPage/InfoProductPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Admin" element={<AdminPage />} />
        <Route path="/PlusProduct" element={<PlusProduct />} />
        <Route path="/CustomForm" element={<CustomForm />} />
        <Route path="/TestComponents" element={<TestComponents />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/EditProduct/:id" element={<EditProductAdmin />} />
        <Route path="/InfoProductPage/:id" element={<InfoProductPage />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
