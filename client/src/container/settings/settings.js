import "../dashboard/dashboard.css";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { SettingsComponent } from "../../components/settings/settings-component";

export const Settings = () => {
  return (
    <div className="dashboard">
      <NavBar />
      <SettingsComponent />
    </div>
  );
};
