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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface Props {
  onFinish: (values: BannerType) => void;
  initialValues?: {
    title: string;
    image: string;
    id: number;
    description: string;
  };
  setEditorHtml: React.Dispatch<React.SetStateAction<string>>;
  editorHtml: string;
}
export interface BannerType {
  title: string;
  description: string;
  image: {
    file: File;
  };
}
export const BannerForm: React.FC<Props> = ({
  onFinish,
  setEditorHtml,
  initialValues,
  editorHtml,
}) => {
  const handleEditorChange = (html: string) => {
    setEditorHtml(html);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <div className="container">
      <Form
        onFinish={(values) => onFinish(values)}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        style={{ maxWidth: 700 }}
        initialValues={initialValues}
      >
        <Form.Item label="Banner Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" initialValue={initialValues?.description}>
          <div>
            <ReactQuill
              theme="snow" 
              value={editorHtml}
              onChange={handleEditorChange}
            />
            <div
              dangerouslySetInnerHTML={{ __html: editorHtml }}
              style={{ marginBottom: "10px" }}
            ></div>
          </div>
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
