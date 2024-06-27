import { Button } from "antd"
import picture from "/src/assets/404.png"

import { HomeOutlined } from "@ant-design/icons";


export const ForOFor = () => {
  return (
	<div className="flex flex-col items-center justify-center min-h-screen text-center">
      <img src={picture} alt="404 Not Found" className="w-64 h-auto pb-10" />
      <div className="text-2xl font-bold pb-8">404</div>
      <div className="text-gray-300 text-sm pb-5">Sorry, the page you visited does not exist.</div>
	  <a href="http://localhost:5173/">

	  <Button className="bg-primary font-semibold w-[150px] h-[35px] text-white">
	  <HomeOutlined />
		Back to Home

	  </Button>
	  </a>
    </div>
  )
}
