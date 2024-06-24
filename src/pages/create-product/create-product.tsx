import { message } from "antd";
import { useState } from "react";
import { useCreateProduct } from "./service/mutation/useCreateProduct";
import { ProductForm } from "../../components/productForm";
import { ProductType } from "../../components/productForm";
import { useNavigate } from "react-router-dom";
export const CreateProduct = () => {
  const [selectedParent, setSelectedParent] = useState<number | null>(null);
  const { mutate } = useCreateProduct();
  const navigate = useNavigate();
  const onFinish = (values: ProductType) => {
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
    <ProductForm onFinish={onFinish} handleSelectChange={handleSelectChange} />
  );
};
