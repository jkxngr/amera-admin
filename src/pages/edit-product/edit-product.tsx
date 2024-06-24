import { Spin, message } from "antd";
import { ProductForm } from "../../components/productForm";
import { useEditProduct } from "./service/mutation/useEditProduct";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useGetProductById } from "./service/query/useGetProductById";
interface ProductValues {
  price: string;
  available: string;
  new: string;
  title: string;
  image: { file: string };
}
export const EditProduct = () => {
  const [selectedParent, setSelectedParent] = useState<number | null>(null);
  const { productId } = useParams();
  const { mutate } = useEditProduct(productId as string);
  const { data: product, isLoading } = useGetProductById(productId);
  const navigate = useNavigate();
  const onFinish = (values: ProductValues) => {
    const price = parseFloat(values.price);
    if (isNaN(price)) {
      message.error("Price must be a valid number");
      return;
    }
    const isAvailable = values.available === "true";
    const isNew = values.new === "true";
    const formData = new FormData();
    if (selectedParent !== null) {
      formData.append("category", selectedParent.toString());
    }
    formData.append("price", values.price);
    formData.append("is_available", isAvailable.toString());
    formData.append("is_new", isNew.toString());
    formData.append("title", values.title);
    if (values.image) {
      formData.append("image", values.image.file);
    }
    mutate(formData, {
      onSuccess: () => {
        message.success("success");
        navigate("/admin/product");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleSelectChange = (value: number) => {
    setSelectedParent(value);
  };
  return (
    <div>
      {isLoading ? (
        <Spin />
      ) : (
        <ProductForm
          onFinish={onFinish}
          handleSelectChange={handleSelectChange}
          initialValues={product}
        />
      )}
    </div>
  );
};
