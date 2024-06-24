import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PartitionOutlined,
  FileOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
// const { categoryId } = useParams();
const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const selectedKey = (() => {
    if (
      location.pathname === "/admin/sub-category" ||
      location.pathname.startsWith("/admin/create-sub-category") ||
      location.pathname.startsWith("/admin/edit-sub-category/:categoryId")
    ) {
      return "2";
    } else if (
      location.pathname === "/admin/brand" ||
      location.pathname.startsWith("/admin/brand/create") ||
      location.pathname.startsWith("/admin/brand/edit")
    ) {
      return "3";
    } else if (
      location.pathname === "/admin/product" ||
      location.pathname.startsWith("/admin/create-product") ||
      location.pathname.startsWith("/admin/edit-product")
    ) {
      return "5";
    } else if (
      location.pathname === "/admin/banner" ||
      location.pathname.startsWith("/admin/create-banner") ||
      location.pathname.startsWith("/admin/banner/edit")
    ) {
      return "6";
    } else {
      return "1";
    }
  })();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]} // Set the selected key based on the current path
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to="/admin">Category List</Link>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <Link to="/admin/sub-category">Create Sub Category</Link>,
            },
            {
              key: "3",
              icon: <SkinOutlined />,
              label: <Link to="/admin/brand">Brand</Link>,
            },
            // {
            //   key: "4",
            //   icon: <PicRightOutlined />,
            //   label: <Link to="/admin/attribute">Attribute</Link>,
            // },
            {
              key: "5",
              icon: <PartitionOutlined />,
              label: <Link to="/admin/product">Product</Link>,
            },
            {
              key: "6",
              icon: <FileOutlined />,
              label: <Link to="/admin/banner">Banner</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
