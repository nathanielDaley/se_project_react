import "./SideBar.css";
import avatar from "../../assets/avatar-default.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </div>
  );
}

export default Sidebar;
