import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar/Sidebar"
import HeaderDashboard from "../components/HeaderDashboard/HeaderDashboard"
import { useSelector } from "react-redux"

const LayoutDashboard = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={`flex h-screen theme-${theme}`}>
        <Sidebar/>
        <div className="flex flex-col w-full">
            <HeaderDashboard />
            <Outlet />
        </div>
    </div>
  )
}

export default LayoutDashboard