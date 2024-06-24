import {
  Button,
  Form,
  Image,
  Input,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
  onFinish: (values: fieldType) => void;
  initialValues?: { title: string; image: string };
}
export interface fieldType {
  title: string;
  image: {
    file: File;
  };
}
export const CategoryForm: React.FC<Props> = ({ onFinish, initialValues }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  return (
    <div className="container">
      <Form
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Category Name"
          name="title"
          initialValue={initialValues?.title}
        >
          <Input />
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
