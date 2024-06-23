import { UsersTable } from "./components/UsersTable";
import { CompanyInfoTable } from "./components/CompanyInfoTable";

export const Administration = () => {
  return (
    <>
      <div className="flex flex-col xl:flex-row w-full gap-5 pt-5">
        <UsersTable />
        <CompanyInfoTable />
      </div>
    </>
  );
};

export default Administration;
