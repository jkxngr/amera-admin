import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  Image,
} from "antd";  
interface Props {
  onFinish: (values: subCategoryType) => void;
  handleSelectChange: (values: number) => void;
  initialValues?:
    | {
        title: string;
        image: string;
        parent: {
          title: string;
        };
      }
    | undefined;
}
export interface subCategoryType {
  title: string;
  parent: string;
  img: {
    file: File;
    fileList: UploadFile;
  };
}
interface SubDataMapType {
  value: number;
  label: string;
  id: number;
  title: string;
}
import { useGetCategory } from "../pages/Admin/service/query/useGetCategory";
export const SubCategoryFrom: React.FC<Props> = ({
  onFinish,
  handleSelectChange,
  initialValues,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { data: subData } = useGetCategory();

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  console.log(initialValues);

  return (
    <div className="container">
      <Form
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <Select
          style={{ width: 350 }}
          onChange={handleSelectChange}
          options={
            subData?.results.map((item: SubDataMapType) => ({
              value: item.id,
              label: item.title,
            })) || []
          }
          defaultValue={initialValues?.parent.title}
        />
        <Form.Item
          label="SubCategory "
          name="title"
          style={{ marginTop: "10px" }}
          initialValue={initialValues?.title}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Upload" name="img">
          <Upload.Dragger
            name="img"
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
          <Image src={initialValues?.image} style={{ width: "350px" }} />
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
export default SubCategoryFrom;
