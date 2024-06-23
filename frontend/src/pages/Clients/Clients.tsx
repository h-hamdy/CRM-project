import { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchClient } from "./components/SearchSearch";
import { ClientTable } from "./components/ClientTable";

export const Clients = () => {
  const [showDrawerUser, setShowDrawer] = useState(false);

  const _showDrawer = () => {
    setShowDrawer(true);
  };

  const onCloseDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <>
      <div className="flex justify-between">
        <Button
          icon={<PlusOutlined />}
          className="h-[40px] w-[170px] rounded-lg"
          type="primary"
          onClick={_showDrawer}
        >
          Add New Client
        </Button>
		<SearchClient/>
      </div>
	  <ClientTable showDrawerUser={showDrawerUser} onCloseDrawer={onCloseDrawer}/>
    </>
  );
};

export default Clients;
