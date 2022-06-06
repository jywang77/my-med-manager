import "../dashboard/dashboard.css";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { SettingsComponent } from "../../components/settings/settings-component";
import { Helmet } from "react-helmet";

export const Settings = () => {
  return (
    <div className="dashboard">
      <Helmet>
        <title>myMedManager - Settings</title>
      </Helmet>
      <NavBar />
      <SettingsComponent />
    </div>
  );
};
