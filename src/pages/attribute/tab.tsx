// import React, { useState } from "react";
// import { Tabs, message } from "antd";
// import type { TabsProps } from "antd";
// import CreateAttribute from "./create-attribute";
// import CreateSubCategory from "../create-sub-category/create-sub-category";
// import { usePostCategory } from "../create-category/service/mutation/usePostCategory";
// import SubCategoryFrom from "../../components/subCategoryFrom";

// const CreateSubTab: React.FC = () => {
//   const { mutate } = usePostCategory();
//   const [selectedParent, setSelectedParent] = useState<number | null>(null);
//   const [subcategoryId, setSubCategoryId] = useState<number | null>(null); // Add categoryId state

//   const onFinish = (values) => {
//     const formData = new FormData();
//     formData.append("title", values.title);
//     if (selectedParent !== null) {
//       formData.append("parent", selectedParent.toString());
//     }
//     if (values.img) {
//       formData.append("image", values.img.file);
//     }
//     mutate(formData, {
//       onSuccess: (data) => {
//         message.success("Success");
//         const subId = data.data.id;
//         setSubCategoryId(subId);
//         console.log(data.data.id);
//       },
//       onError: (error) => {
//         console.log(error);
//       },
//     });
//   };  const handleSelectChange = (value: number) => {
//     setSelectedParent(value);
//   };
//   const items: TabsProps["items"] = [
//     {
//       key: "1",
//       label: "Create",
//       children: (
//         <SubCategoryFrom  
//           onFinish={onFinish}
//           handleSelectChange={handleSelectChange}
//         />
//       ),
//     },
//     {
//       key: "2",
//       label: "Attribute",
//       children: <CreateAttribute subcategoryId={subcategoryId}  />,
//     },
//   ];
//   return <Tabs defaultActiveKey="1" items={items} />;
// };

// export default CreateSubTab;
