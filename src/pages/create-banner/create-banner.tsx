import { message } from "antd";
import { fieldType } from "../../components/categoryForm";
import { usePostBanner } from "./service/mutation/usePostBanner";
import { BannerForm } from "../../components/bannerForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateBanner: React.FC = () => {
  const { mutate } = usePostBanner();
  const [editorHtml, setEditorHtml] = useState("");
  const navigate = useNavigate();
  const submit = (values: fieldType) => {
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
      <BannerForm
        onFinish={submit}
        setEditorHtml={setEditorHtml}
        editorHtml={editorHtml}
      />
    </div>
  );
};
export default CreateBanner;
