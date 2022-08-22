import "./dashboard.css";
import { NavBar } from "../components/nav-bar/nav-bar";
import { SettingsComponent } from "../components/settings/settings-component";
import { Helmet, HelmetProvider } from "react-helmet-async";

export const Settings = ({ handleIsAuth }) => {
  return (
    <HelmetProvider>
      <div className="dashboard">
        <Helmet>
          <title>myMedManager - Settings</title>
        </Helmet>
        <NavBar handleIsAuth={handleIsAuth} />
        <SettingsComponent />
      </div>
    </HelmetProvider>
  );
};
