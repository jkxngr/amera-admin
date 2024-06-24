import { CategoryForm } from "../../components/categoryForm";
import { useEditCategory } from "./service/mutation/useEditCategory";
import { fieldType } from "../../components/categoryForm";
import { Spin, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoryId } from "./service/query/useGetCategoryId";

export const EditCategory = () => {
  const { categoryId } = useParams();
  const { data: categoryData, isLoading } = useGetCategoryId(
    categoryId as string
  );
  const navigate = useNavigate();
  const { mutate } = useEditCategory(categoryId as string);

  const onFinish = (values: fieldType) => {
    const editformData = new FormData();
    editformData.append("title", values.title);
    if (values.image) {
      editformData.append("image", values.image.file);
    }
    mutate(editformData, {
      onSuccess: () => {
        message.success("success");
        navigate("/admin");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div>
      {isLoading ? (
        <Spin />
      ) : (
        <CategoryForm onFinish={onFinish} initialValues={categoryData} />
      )}
    </div>
  );
};

export default EditCategory;
