import React from "react";
import { usePostAttribute } from "./service/mutation/usePostAttribute";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { AttributeData } from "../edit-attribute";
import AttributeFrom from "../../components/attributeFrom";
interface CreateAttributeProps {
  subcategoryId: number | null; 
}
const CreateAttribute: React.FC<CreateAttributeProps> = ({ subcategoryId }) => {
  const navigate = useNavigate();
  const { mutate: postAttribute } = usePostAttribute();
  console.log(subcategoryId);
  const onFinish = (values: AttributeData) => {
    const attributes = values.items?.map(
      (item: { title: string; values: [] }) => {
        return {
          attribute_id: null,
          title: item.title,
          values: item.values?.map((i: { value: string }) => {
            return {
              value: i.value,
              value_id: null,
            };
          }),
        };
      }
    );
    const attrData: any = {
      attributes,
      category_id: subcategoryId,
    };
    postAttribute(attrData, {
      onSuccess: (data) => {
        console.log(data);
        message.success("success");
        navigate("/admin/sub-category");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return <AttributeFrom onFinish={onFinish} />;
};

export default CreateAttribute;
