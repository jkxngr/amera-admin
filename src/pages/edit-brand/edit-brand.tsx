import { useEditBrand } from "./service/mutate/useEditBrand";
import { fieldType } from "../../components/categoryForm";
import { Spin, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Brandform } from "../../components/brandform";
import { useGetBrandById } from "./service/query/useGetBrandById";

export const EditBrand = () => {
  const { brandId } = useParams();
  const { data: categoryData, isLoading } = useGetBrandById(brandId as string);
  const navigate = useNavigate();
  const { mutate } = useEditBrand(brandId as string);

  const onFinish = (values: fieldType) => {
    const editformData = new FormData();
    editformData.append("title", values.title);
    if (values.image) {
      editformData.append("image", values.image.file);
    }
    mutate(editformData, {
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
      {isLoading ? (
        <Spin />
      ) : (
        <Brandform onFinish={onFinish} initialValues={categoryData} />
      )}
    </div>
  );
};

export default EditBrand;
