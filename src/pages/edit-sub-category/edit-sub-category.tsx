// In the EditCategory component
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoryId } from "../edit-category/service/query/useGetCategoryId";
import { useState } from "react";
import { Spin, Tabs, TabsProps, UploadFile, message } from "antd";
import { useEditCategory } from "../edit-category/service/mutation/useEditCategory";
import SubCategoryFrom from "../../components/subCategoryFrom";
import EditAttribute from "../edit-attribute/edit-attribute";
type CategoryData = {
  title: string;
  img: {
    file: File;
    fileList: UploadFile;
  };
};
const EditSubCategory = () => {
  const { categoryId } = useParams();
  const { data: subData, isLoading } = useGetCategoryId(categoryId as string);
  const [activeTab, setActiveTab] = useState<string>("1");
  const [selectedParent, setSelectedParent] = useState<number | null>(null);
  const { mutate } = useEditCategory(categoryId as string);
  const navigate = useNavigate();
  const onFinish = (values: CategoryData) => {
    console.log(values);
    const editformData = new FormData();
    editformData.append("title", values.title);
    if (selectedParent !== null) {
      editformData.append("parent", selectedParent.toString());
    }
    if (values.img) {
      editformData.append("image", values.img.file);
    }
    mutate(editformData, {
      onSuccess: () => {
        message.success("success");
        navigate("/admin/sub-category");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  const handleSelectChange = (value: number) => {
    setSelectedParent(value);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create",
      children: isLoading ? (
        <Spin />
      ) : (
        <SubCategoryFrom
          onFinish={onFinish}
          handleSelectChange={handleSelectChange}
          initialValues={subData}
        />
      ),
    },
    {
      key: "2",
      label: "Attribute",
      children: <EditAttribute subcategoryId={categoryId} />,
    },
  ];
  return (
    <Tabs
      activeKey={activeTab}
      onChange={(key) => setActiveTab(key)}
      items={items}
    />
  );
};

export default EditSubCategory;
