import { Button, Image, Spin, Table, TableProps, message } from "antd";
import { Link } from "react-router-dom";
import { useGetBanner } from "./service/query/useGetBanner";
import { client } from "../../config/query-client";
import { useDeleteBanner } from "./service/mutation/useDeleteBanner";
interface BannerData {
  id: number;
  title: string;
  image: string;
  description: string;
}
export const BannerList = () => {
  const { data: banner, isLoading, isError } = useGetBanner();
  const { mutate } = useDeleteBanner();
  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("success");
        client.invalidateQueries({ queryKey: ["banner"] });
      },
    });
  };
  const dataSource = banner
    ? banner.results?.map((item: BannerData) => ({
        key: item.id.toString(),
        name: item.title,
        id: item.id,
        img: item.image,
        description: item.description,
        change: (
          <div>
            <Button type="primary" onClick={() => handleDelete(item.id)}>
              Delete
            </Button>
            <Link to={`/admin/edit-banner/${item.id}`}>
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
      title: "Banner Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Banner description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
    },
  ];
  return (
    <div>
      <Link to="/admin/create-banner">
        <Button type="primary">Create</Button>
      </Link>
      {isLoading ? (
        <Spin size="large" fullscreen />
      ) : isError ? (
        <p>Error fetching banners</p>
      ) : (
        <Table dataSource={dataSource} columns={columns} />
      )}
    </div>
  );
};
