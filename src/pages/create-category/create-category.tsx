import { CategoryForm } from "../../components/categoryForm";
import { usePostCategory } from "./service/mutation/usePostCategory";
import { message } from "antd";
import { fieldType } from "../../components/categoryForm";
import { useNavigate } from "react-router-dom";

export const CreateCategory: React.FC = () => {
  const { mutate } = usePostCategory();
  const navigate = useNavigate();
  const submit = (values: fieldType) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("parent", "");
    if (values.image) {
      formData.append("image", values.image.file);
    }
    mutate(formData, {
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
      <CategoryForm onFinish={submit} />
    </div>
  );
};
export default CreateCategory;
