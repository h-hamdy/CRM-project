import { useEffect, useState } from "react";
import { Table } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  GlobalOutlined,
  MailOutlined,
  ShopOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import axios from "axios";
import { EditCompanyInfo } from "./EditCompanyInfo";

interface CompanyInfo {
  address: string;
  email: string;
  phone: string;
  website: string;
}

export const CompanyInfoTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleIconClick = () => {
    setIsModalVisible(true);
  };

  const fetchCompanyInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3333/users/CompanyInfo",
        { withCredentials: true }
      );
      setCompanyInfo(response.data);
    } catch (error) {
      console.error("Error fetching company info:", error);
    }
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, []);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  const companyInfos = [
    {
      key: "Address",
      label: companyInfo?.address,
      icon: <EnvironmentOutlined />,
    },
    {
      key: "Email",
      label: companyInfo?.email,
      icon: <MailOutlined />,
    },
    {
      key: "Phone",
      label: companyInfo?.phone,
      icon: <PhoneOutlined />,
    },
    {
      key: "Identification",
      label: companyInfo?.website,
      icon: <GlobalOutlined />,
    },
  ];
  const column = [
    {
      title: (
        <Space className="flex justify-between">
          <div className="flex gap-2">
            <ShopOutlined />
            <span>Company Info</span>
          </div>
          <EditOutlined
            onClick={handleIconClick}
            style={{ cursor: "pointer", marginLeft: "auto" }}
          />
        </Space>
      ),
      dataIndex: "label",
      key: "label",
      render: (text: any, record: any) => (
        <Space className="">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div>{record.icon}</div>
              <div className="font-light text-gray-500 text-xs">
                {record.key}
              </div>
            </div>
            <div className="pl-5">{text}</div>
          </div>
        </Space>
      ),
    },
  ];

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {isModalVisible && (
        <EditCompanyInfo
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          handleModalClose={handleModalClose}
          setCompanyInfo={setCompanyInfo}
          fetchCompanyInfo={fetchCompanyInfo}
        />
      )}
      <div className="xl:w-2/5 xl:pt-[80px] w-full">
        <Table columns={column} dataSource={companyInfos} pagination={false} />
      </div>
    </>
  );
};
