import "./dashboard.css";
import { NavBar } from "../components/nav-bar/nav-bar";
import { MyMedicationsComponent } from "../components/my-medications/my-medications-component";
import { Helmet, HelmetProvider } from "react-helmet-async";

export const MyMedications = () => {
  return (
    <HelmetProvider>
      <div className="dashboard">
        <Helmet>
          <title>myMedManager - My Medications</title>
        </Helmet>
        <NavBar />
        <MyMedicationsComponent />
      </div>
    </HelmetProvider>
  );
};
