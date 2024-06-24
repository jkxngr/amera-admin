import { Spin, message } from "antd";
import { BannerForm } from "../../components/bannerForm";
import { useState } from "react";
import { useEditBanner } from "./service/mutation/useEditBanner";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBannerById } from "./service/query/useGetBannerById";
interface BannerEditValues {
  title: string;
  image: { file: string | File };
  description: string;
}
export const EditBanner: React.FC = () => {
  const { bannerId } = useParams();
  const navigate = useNavigate();
  const { mutate } = useEditBanner(bannerId);
  const { data: BannerData, isLoading: BannerLoading } =
    useGetBannerById(bannerId);
  const [editorHtml, setEditorHtml] = useState("");

  const submit = (values: BannerEditValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", editorHtml);
    if (values.image) {
      formData.append("image", values.image.file);
    }
    mutate(formData, {
      onSuccess: () => {
        message.success("success");
        navigate("/admin/banner");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <div>
      {BannerLoading ? (
        <Spin />
      ) : (
        <BannerForm
          onFinish={submit}
          setEditorHtml={setEditorHtml}
          editorHtml={editorHtml}
          initialValues={BannerData}
        />
      )}
    </div>
  );
};
export default EditBanner;
