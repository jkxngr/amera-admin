import { Button, Image, Spin, Table, TableProps, message } from "antd";
import { Link } from "react-router-dom";
import { useGetProduct } from "./service/query/useGetProduct";
import { useDeleteProduct } from "../create-product/service/mutation/useDeleteProduct";
import { client } from "../../config/query-client";
// interface ProductDataType {}
export const ProductList = () => {
  const { data: categories, isLoading, isError } = useGetProduct();

  const { mutate } = useDeleteProduct();
  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("success");
        client.invalidateQueries({ queryKey: ["product"] });
      },
    });
  };

  const dataSource = categories
    ? categories?.results?.map(
        (product: { id: number; title: string; image: string }) => ({
          key: product.id.toString(),
          name: product.title,
          id: product.id,
          img: product.image,
          change: (
            <div>
              <Button type="primary" onClick={() => handleDelete(product.id)}>
                Delete
              </Button>
              <Link to={`/admin/edit-product/${product.id}`}>
                <Button type="primary" style={{ marginLeft: "10px" }}>
                  Edit
                </Button>
              </Link>
            </div>
          ),
        })
      )
    : [];

  const columns: TableProps<{}>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "IMG",
      key: "img",
      render: (dataSource) => {
        return <Image src={dataSource.img} width={"100px"} height={"100px"} />;
      },
    },
    {
      title: "Category Name",
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
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/admin/create-product">
          <Button type="primary">Create</Button>
        </Link>
      </div>
      {isLoading ? (
        <Spin size="large" fullscreen />
      ) : isError ? (
        <p>Error fetching categories</p>
      ) : (
        <Table dataSource={dataSource} columns={columns} />
      )}
    </div>
  );
};
