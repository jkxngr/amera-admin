import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, message } from "antd";
import { useDeleteAttribute } from "../pages/edit-attribute/service/mutation/useDeleteAttribute";
import { client } from "../config/query-client";
import { useDeleteAttrTitle } from "../pages/edit-attribute/service/mutation/useDeleteAttrTitle";
import { AttributeData } from "../pages/edit-attribute";
interface Props {
  onFinish: (values: AttributeData) => void;
  initialValues?: {
    attributes: {
      id: number | undefined;
      title: string;
      values: {
        id: number | undefined;
        value: string;
      }[];
    }[];
  };
}
[];

export const AttributeFrom: React.FC<Props> = ({ onFinish, initialValues }) => {
  const [form] = Form.useForm();
  const { mutate: attrDelete } = useDeleteAttribute();
  const { mutate: attrTitleDel } = useDeleteAttrTitle();

  const handleDelete = (id: number) => {
    attrDelete(id, {
      onSuccess: () => {
        message.success("success");
        client.invalidateQueries({ queryKey: ["attribute"] });
      },
    });
  };
  const titleDelete = (id: number) => {
    attrTitleDel(id, {
      onSuccess: () => {
        message.success("success");
        client.invalidateQueries({ queryKey: ["attribute"] });
      },
    });
  };
  return (
    <div>
      <Form
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: 600 }}
        autoComplete="off"
      >
        <Form.List name="items" initialValue={initialValues?.attributes}>
          {(fields, { add, remove }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Item ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                        titleDelete(
                          Number(initialValues?.attributes[field.key].id)
                        );
                      }}
                    />
                  }
                >
                  <Form.Item label="Name" name={[field.name, "title"]}>
                    <Input />
                  </Form.Item>

                  {/* Nest Form.List */}
                  <Form.Item label="List">
                    <Form.List name={[field.name, "values"]}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <Space key={subField.key}>
                              <Form.Item
                                noStyle
                                name={[subField.name, "value"]}
                              >
                                <Input placeholder="first" />
                              </Form.Item>

                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                  handleDelete(
                                    Number(
                                      initialValues?.attributes[field.key]
                                        .values[subField.key].id
                                    )
                                  );
                                }}
                              />
                            </Space>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => subOpt.add()}
                            block
                          >
                            + Add Sub Item
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Add Item
              </Button>
            </div>
          )}
        </Form.List>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AttributeFrom;
