import React, { useState } from "react";
import { Tabs, message } from "antd";
import type { TabsProps } from "antd";
import CreateAttribute from "../attribute/create-attribute";
import { usePostCategory } from "../create-category/service/mutation/usePostCategory";
import SubCategoryFrom from "../../components/subCategoryFrom";
interface CreateSubCategoryData {
  title: string;
  parent: string;
  img: {
    file: File;
  };
}
const CreateSubCategory: React.FC = () => {
  const { mutate } = usePostCategory();
  const [selectedParent, setSelectedParent] = useState<number | null>(null);
  const [subcategoryId, setSubCategoryId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("1");
  const [TabDisabled, setTabDisabled] = useState<boolean>(true);

  const onFinish = (values: CreateSubCategoryData) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (selectedParent !== null) {
      formData.append("parent", selectedParent.toString());
    }
    if (values.img) {
      formData.append("image", values.img.file);
    }
    mutate(formData, {
      onSuccess: (data) => {
        message.success("Success");
        const subId = data.data.id;
        setSubCategoryId(subId );
        setActiveTab("2");
        setTabDisabled(false);
        console.log(data.data.id);
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
      children: (
        <SubCategoryFrom
          onFinish={onFinish}
          handleSelectChange={handleSelectChange}
        />
      ),
    },
    {
      key: "2",
      label: "Attribute",
      children: <CreateAttribute subcategoryId={subcategoryId} />,
      disabled: TabDisabled,
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

export default CreateSubCategory;
