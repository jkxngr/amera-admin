import { useState } from "react";
import { Button, message, Spin, Input, Pagination } from "antd";
import { Table, Image } from "antd";
import { useGetCategory } from "./service/query/useGetCategory";
import { Link } from "react-router-dom";
import { useDeleteCategory } from "./service/mutation/useDelCategory";
import { client } from "../../config/query-client";
import { useGetSearch } from "./service/query/useGetSearch";
import useDebounce from "../../hook/useDebounce";

interface SearchDataType {
  id: number;
  image: string | undefined;
  title: string | undefined;
}

interface CategoryData {
  id: number;
  title: string;
  image: {
    file: File;
  };
}

const Admin = () => {
  const [currentPage, setCurrentPage] = useState<number>(0); 
  const pageSize = 10;
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetCategory(currentPage, pageSize);
  const { mutate } = useDeleteCategory();
  const [value, setValue] = useState("");
  const search = useDebounce(value);
  const { data: searchData } = useGetSearch(search);
  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("success");
        client.invalidateQueries({ queryKey: ["category"] });
      },
    });
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page); 
  };

  const dataSource = categories
    ? categories.results.map((category: CategoryData) => ({
        key: category.id.toString(),
        name: category.title,
        id: category.id,
        img: category.image,
        change: (
          <div>
            <Button type="primary" onClick={() => handleDelete(category.id)}>
              Delete
            </Button>
            <Link to={`/admin/edit-category/${category.id}`}>
              <Button type="primary" style={{ marginLeft: "10px" }}>
                Edit
              </Button>
            </Link>
          </div>
        ),
      }))
    : [];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "IMG",
      key: "img",
      render: (dataSource: { img: string | undefined }) => {
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
        <Link to="/admin/create-category">
          <Button type="primary">Create</Button>
        </Link>
        <Input.Search
          type="search"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {value && (
        <div
          style={{
            position: "absolute",
            zIndex: "10",
            backgroundColor: "whitesmoke",
            marginTop: "50px",
            width: "500px",
            marginLeft: "100px",
          }}
        >
          {value.length > 2 ? (
            <>
              {searchData?.results.map((item: SearchDataType) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px",
                  }}
                >
                  <img src={item.image} style={{ width: "100px" }} />
                  <h3>{item.title}</h3>
                </div>
              ))}
            </>
          ) : (
            ""
          )}
        </div>
      )}
      {isLoading ? (
        <Spin size="large" fullscreen />
      ) : isError ? (
        <p>Error fetching categories</p>
      ) : (
        <>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
          <Pagination
            defaultCurrent={1}
            current={currentPage} 
            total={categories?.count} 
            onChange={handleChangePage} 
          />
        </>
      )}
    </div>
  );
};

export default Admin;
