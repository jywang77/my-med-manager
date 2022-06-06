import "../dashboard/dashboard.css";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { MyMedicationsComponent } from "../../components/my-medications/my-medications-component";
import { Helmet } from "react-helmet";

export const MyMedications = () => {
  return (
    <div className="dashboard">
      <Helmet>
        <title>myMedManager - My Medications</title>
      </Helmet>
      <NavBar />
      <MyMedicationsComponent />
    </div>
  );
};
