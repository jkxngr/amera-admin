import { Button, Spin, TableProps } from "antd";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { useGetAttribute } from "./service/query/useGetAttribute";

export const AttributeList = () => {
  const { data: attributes, isLoading, isError } = useGetAttribute();

  //   const { mutate } = useDeleteCategory();
  //   const handleDelete = (id: number) => {
  //     mutate(id, {
  //       onSuccess: () => {
  //         message.success("success");
  //         client.invalidateQueries({ queryKey: ["category"] });
  //       },
  //     });
  //   };
  console.log(attributes);

  const dataSource = attributes
    ? attributes.results.map((attribute: any) => ({
        key: attribute.id.toString(),
        id: attribute.id,
        name: attribute.title,
        parentName: attribute.category_title[0]?.title,
        change: (
          <div>
            {/* <Button type="primary" onClick={() => handleDelete(attribute.id)}>
              Delete
            </Button> */}
            <Link to={`/admin/edit-category/${attribute.id}`}>
              <Button type="primary" style={{ marginLeft: "10px" }}>
                Edit
              </Button>
            </Link>
          </div>
        ),
      }))
    : [];
  const columns: TableProps<{}>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Parent",
      dataIndex: "parentName",
      key: "parentName",
    },
    {
      title: "Attribute Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
    },
  ];
  return (
    <div>
      <br />
      {isLoading ? (
        <Spin size="large" fullscreen />
      ) : isError ? (
        <p>Error fetching categories</p>
      ) : (
        <Table dataSource={dataSource} columns={columns} />
      )}
      {/* <Table dataSource={dataSource} columns={columns} /> */}
    </div>
  );
};
