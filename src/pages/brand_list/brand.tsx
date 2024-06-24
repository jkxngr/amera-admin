import { Button, Image, Spin, Table, TableProps, message } from "antd";
import { Link } from "react-router-dom";
// import { client } from "../../config/query-client";
import { useGetBrand } from "./service/query/useGetBrand";
import { useDeleteBrand } from "./service/mutation/useDeleteBrand";
import { client } from "../../config/query-client";
interface BrandData {
  id: number;
  title: string;
  image: File;
}
export const Brand = () => {
  const { data: brand, isLoading, isError } = useGetBrand();
  const { mutate } = useDeleteBrand();
  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("success");
        client.invalidateQueries({ queryKey: ["brand"] });
      },
    });
  };
  const dataSource = brand
    ? brand.results.map((item: BrandData) => ({
        key: item.id.toString(),
        name: item.title,
        id: item.id,
        img: item.image,
        change: (
          <div>
            <Button type="primary" onClick={() => handleDelete(item.id)}>
              Delete
            </Button>
            <Link to={`/admin/edit-brand/${item.id}`}>
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
      title: "IMG",
      key: "img",
      render: (dataSource) => {
        return <Image src={dataSource.img} width={"100px"} height={"100px"} />;
      },
    },
    {
      title: "Brand Name",
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
      <Link to="/admin/create-brand">
        <Button type="primary">Create</Button>
      </Link>
      {isLoading ? (
        <Spin size="large" fullscreen />
      ) : isError ? (
        <p>Error fetching brands</p>
      ) : (
        <Table dataSource={dataSource} columns={columns} />
      )}
    </div>
  );
};
