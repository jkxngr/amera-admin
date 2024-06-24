import React, { useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
export interface ProductType {
  price: string;
  available: string;
  new: string;
  title: string;
  image: { file: string };
}

import { useSubCatGet } from "../pages/sub-category-list/service/query/useGetSubCategory";
interface Props {
  onFinish: (values: ProductType) => void;
  handleSelectChange: (values: number) => void;
  initialValues?: {
    new: boolean;
    available: boolean;
    title: string;
    price: number;
    image: string;
  };
}


export const ProductForm: React.FC<Props> = ({
  onFinish,
  handleSelectChange,
  initialValues,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const { data: subData } = useSubCatGet();
  console.log("Initial Values:", initialValues);


  return (
    <div className="container" style={{}}>

      <Form
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
      >
        <Select
          style={{ width: 350 }}
          onChange={handleSelectChange}
          options={
            subData?.results.map((item: { id: number; title: string }) => ({
              value: item.id,
              label: item.title,
            })) || []
          }
        />
        <Form.Item label="Is New" name={"new"}>
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item label="Is Available" name={"available"}>
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          initialValue={initialValues?.title}
        >
          <Input />
        </Form.Item>
        <Form.Item name={"price"} initialValue={initialValues?.price}>
          <InputNumber<number>
            name="price"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
            style={{ width: "350px" }}
          />
        </Form.Item>
        <Form.Item label="Upload" name="image">
          <Upload.Dragger
            name="image"
            beforeUpload={() => false}
            listType="picture-card"
            onChange={handleChange}
            fileList={fileList}
            multiple={false}
            maxCount={1}
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload.Dragger>
        </Form.Item>
        {initialValues && (
          <Image
            alt="lorem"
            src={initialValues?.image}
            style={{ width: "350px" }}
          />
        )}
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
