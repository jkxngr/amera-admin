import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Admin from "./pages/Admin/admin";
import CreateCategory from "./pages/create-category/create-category";
import EditCategory from "./pages/edit-category/edit-category";
import MainLayout from "./layout/main-layout";
import SubCategoryList from "./pages/sub-category-list/sub-category-list";
import EditSubCategory from "./pages/edit-sub-category/edit-sub-category";
import { AttributeList } from "./pages/attribute-list/attribute-list";
import CreateSubCategory from "./pages/create-sub-category/create-sub-category";
import { Brand } from "./pages/brand_list";
import { ProductList } from "./pages/product-list";
import { CreateProduct } from "./pages/create-product";
import { EditProduct } from "./pages/edit-product";
import CreateBanner from "./pages/create-banner/create-banner";
import { BannerList } from "./pages/banner-list/banner-list";
import EditBanner from "./pages/edit-banner/edit-banner";
import CreateBrand from "./pages/create-brand/create-brand";
import EditBrand from "./pages/edit-brand/edit-brand";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Admin />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-sub-category" element={<CreateSubCategory />} />
          <Route path="sub-category" element={<SubCategoryList />} />
          <Route path="attribute" element={<AttributeList />} />
          <Route path="brand" element={<Brand />} />
          <Route path="product" element={<ProductList />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="create-banner" element={<CreateBanner />} />
          <Route path="banner" element={<BannerList />} />
          <Route path="create-brand" element={<CreateBrand />} />
          <Route path="edit-category/:categoryId" element={<EditCategory />} />
          <Route path="edit-product/:productId" element={<EditProduct />} />
          <Route path="edit-banner/:bannerId" element={<EditBanner />} />
          <Route path="edit-brand/:brandId" element={<EditBrand />} />
          <Route
            path="edit-sub-category/:categoryId"
            element={<EditSubCategory />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
