import { Input } from "antd";
import { useState } from "react";
import "../../App.css";
import Toggle from "../Toggle/Toggle";
const { Search } = Input;
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux-tookit/themeSlice";

const HeaderDashboard = () => {
  // loading search  
  const [load, setLoad] = useState(false);

  // theme
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`flex items-center justify-between px-6 h-15 w-full`}>
      <div className="w-2/8">
        <Search
          placeholder="Tìm cái gì đó..."
          enterButton="Tìm kiếm"
          size="large"
          loading={load}
          onSearch={() => setLoad(true)}
        />
      </div>
      <div className="flex-1 text-right mb-4">
        <Toggle onClick={handleToggle} />
      </div>
    </div>
  );
};

export default HeaderDashboard;