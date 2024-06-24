import { message } from "antd";
import { fieldType } from "../../components/categoryForm";
import { usePostBrand } from "./service/mutation/usePostBrand";
import { Brandform } from "../../components/brandform";
import { useNavigate } from "react-router-dom";
export const CreateBrand: React.FC = () => {
  const navigate = useNavigate();
  const { mutate } = usePostBrand();
  const submit = (values: fieldType) => {
    console.log(values);
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.image) {
      formData.append("image", values.image.file);
    }
    mutate(formData, {
      onSuccess: () => {
        message.success("success");
        navigate("/admin/brand");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <div>
      <Brandform onFinish={submit} />
    </div>
  );
};
export default CreateBrand;
