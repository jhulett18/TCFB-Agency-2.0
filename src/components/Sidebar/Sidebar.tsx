import { Sidebar, Menu } from "react-pro-sidebar";
import SidebarHeader from "./SidebarHeader/SidebarHeader";
import FormInput from "./FormInput/FormInput";
import AgencyList from "../AgencyList/AgencyList";
import "./Sidebar.css"; // custom styles

export default function LeftSidebar() {
  return (
    <Sidebar width="400px" className="sidebar">
      <Menu>
        <SidebarHeader />
        <FormInput />
        <div className="agency-scroll-container">
          <AgencyList />
        </div>
      </Menu>
    </Sidebar>
  );
}
