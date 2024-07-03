import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router";

import {
  PieChartOutlined,
  TeamOutlined,
  //   CalendarOutlined,
  CrownOutlined,
  ToolOutlined,
  //   ProjectOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "", <PieChartOutlined />),
  //   getItem("Calendar", "Calendar", <CalendarOutlined />),
  getItem("Product", "Product", <ToolOutlined />),
  getItem("Clients", "Clients", <TeamOutlined />),
  //   getItem("Management", "sub1", <ProjectOutlined />, [
  //     getItem("Project Kanban", "Management"),
  //   ]),
  getItem("Administration", "sub2", <CrownOutlined />, [
    getItem("Settings", "Administration"),
  ]),
];

export const RootLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3333/auth/check-login",
          { withCredentials: true }
        );
        if (response.status === 200) {
          if (!response.data.logged_in) navigate("/sign-in");
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    };

    fetchLoginStatus();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [collapsed, setCollapsed] = useState(true);

  const handleMenuClick = (e: any) => {
    navigate(`/${e.key}`);
  };

  return (
    <>
      <div className="flex fixed z-50 w-full items-center justify-between px-10 pl-3 text-lg font-semibold traking-wider bg-white h-[70px]">
        <div className="flex items-center justify-center">
          <button>
            <img className="w-[60px]" src="/src/assets/logo.webp"></img>
          </button>
          <div className="text-lg font-semibold traking-wider">Mapira</div>
        </div>
        <img
          className="rounded-full h-[40px] w-[40px] object-cover"
          src="/src/assets/profile.jpeg"
        ></img>
      </div>
      <Layout className="min-h-screen pt-[70px]">
        <Sider
          theme="light"
          className={`bg-red-500 ${
            collapsed ? "w-[80px]" : "w-[300px]"
          } transition-all duration-300`}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={280}
          collapsedWidth={80}
          style={{ width: collapsed ? "80px" : "300px" }}
        >
          <Menu
            className="h-full bg-[#F5F5F5] text-white"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout className="p-10">
          <Outlet />
        </Layout>
      </Layout>
    </>
  );
};
