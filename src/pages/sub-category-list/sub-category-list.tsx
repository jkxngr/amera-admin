import { Button, Spin, TableProps, message } from "antd";
import { Table, Image } from "antd";
import { useSubCatGet } from "./service/query/useGetSubCategory";
import { Link } from "react-router-dom";
import { client } from "../../config/query-client";
import { useDeleteSubCategory } from "./service/mutation/useDeleteSubCategory";
interface SubCategoryData {
  id: number;
  parent: { title: string };
  title: any;
  image: any;
}
const SubCategoryList = () => {
  const { data: subCategory, isLoading, isError } = useSubCatGet();
  console.log(subCategory);

  const { mutate } = useDeleteSubCategory();
  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("success");
        client.invalidateQueries({ queryKey: ["sub-category"] });
      },
    });
  };
  const dataSource = subCategory
    ? subCategory.results.map((item: SubCategoryData) => ({
        key: item.id,
        parentName: item.parent.title,
        name: item.title,
        id: item.id,
        img: item.image,
        change: (
          <div>
            <Button type="primary" onClick={() => handleDelete(item.id)}>
              Delete
            </Button>
            <Link to={`/admin/edit-sub-category/${item.id}`}>
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
      title: "Parent",
      dataIndex: "parentName",
      key: "parentName",
    },
    {
      title: "Sub Category Name",
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
      <Link to="/admin/create-sub-category/">
        <Button type="primary" style={{ marginBottom: "10px" }}>
          Create
        </Button>
      </Link>
      <br />
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

export default SubCategoryList;
