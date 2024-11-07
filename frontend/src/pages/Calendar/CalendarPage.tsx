import { Button, Table, Calendar, Checkbox } from "antd";
import {
  PlusSquareOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
export const CalendarPage = () => {
  const dataSource = [
    {
      key: "1",
      taskdisc: (
        <div className="py-1 pl-2 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="border-2 w-[8px] border-calendarRed h-[8px] bg-calendarRed rounded-full"></div>
            <div className="text-xs">Today 8:30am - 9:30am</div>
          </div>
          <span className="font-semibold pl-5">Mike</span>
        </div>
      ),
    },
    {
      key: "2",
      taskdisc: (
        <div className="py-1 pl-2 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="border-2 w-[8px] border-calendarRed h-[8px] bg-calendarRed rounded-full"></div>
            <div className="text-xs">Today 8:30am - 9:30am</div>
          </div>
          <span className="font-semibold pl-5">Mike</span>
        </div>
      ),
    },
    {
      key: "3",
      taskdisc: (
        <div className="py-1 pl-2 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="border-2 w-[8px] border-calendarRed h-[8px] bg-calendarRed rounded-full"></div>
            <div className="text-xs">Today 8:30am - 9:30am</div>
          </div>
          <span className="font-semibold pl-5">Mike</span>
        </div>
      ),
    },
  ];

  const columnsTableone = [
    {
      title: (
        <div className="flex gap-2">
          <CalendarOutlined />
          <span>Upcoming events</span>
        </div>
      ),
      dataIndex: "taskdisc",
    },
  ];

  const datasourceCategory = [
    {
      key: "1",
      category: <Checkbox>Meeting</Checkbox>,
    },
    {
      key: "1",
      category: <Checkbox>Holiday</Checkbox>,
    },
    {
      key: "1",
      category: <Checkbox>Conference</Checkbox>,
    },
    {
      key: "1",
      category: <Checkbox>Birthday</Checkbox>,
    },
  ];

  const columnsTabletwo = [
    {
      title: (
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <AppstoreOutlined />
            <span>Categories</span>
          </div>
          <div>
            <div className="flex transition-colors duration-500 hover:text-primary items-center cursor-pointer w-[30px] h-[30px] justify-center border-gray-200 border-[1px] rounded-full border-gray-300 hover:border-primary">
              <SettingOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: "category",
    },
  ];

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <>
      <div className="flex gap-5 w-full">
        <div className="flex flex-col gap-5 w-1/4">
          <Button
            icon={<PlusSquareOutlined />}
            className="h-[40px]"
            type="primary"
          >
            Create event
          </Button>
          <Table
            dataSource={dataSource}
            columns={columnsTableone}
            pagination={false}
          />
          <Table
            dataSource={datasourceCategory}
            columns={columnsTabletwo}
            pagination={false}
          />
        </div>
        <div className="flex w-10/12">
          <Calendar className="px-10" onPanelChange={onPanelChange} />
        </div>
      </div>
    </>
  );
};
