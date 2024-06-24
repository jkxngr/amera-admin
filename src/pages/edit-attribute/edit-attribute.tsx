import React from "react";
import { useEditAttribute } from "./service/mutation/useEditAttribute";
import { useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import AttributeFrom from "../../components/attributeFrom";
import { useGetSelectedAttribute } from "./service/query/useGetSelectedAttribute";

interface EditAttributeProps {
  subcategoryId: string | undefined;
}
export interface AttributeData {
  items: {
    map: any;
    title: string;
    values: {
      value: string;
    };
  };
}

const EditAttribute: React.FC<EditAttributeProps> = ({ subcategoryId }) => {
  const navigate = useNavigate();
  const { mutate: postAttribute } = useEditAttribute();
  const { data: singleAttribute, isLoading } =
    useGetSelectedAttribute(subcategoryId);
  console.log(singleAttribute);
  const onFinish = (values: AttributeData) => {
    console.log(values);

    const attributes = values.items?.map(
      (item: { title: string; values: { value: string[] }[] }) => {
        return {
          attribute_id: null,
          title: item.title,
          values: item.values?.map((i: { value: Array<string> }) => {
            return {
              value: i.value,
              value_id: null,
            };
          }),
        };
      }
    );
    const attrData:any = {
      attributes,
      category_id: subcategoryId,
    };

    postAttribute(attrData, {
      onSuccess: () => {
        message.success("success");
        navigate("/admin/sub-category");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return isLoading ? (
    <Spin />
  ) : (
    <AttributeFrom onFinish={onFinish} initialValues={singleAttribute} />
  );
};

export default EditAttribute;
