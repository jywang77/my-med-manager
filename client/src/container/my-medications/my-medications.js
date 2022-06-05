import "../dashboard/dashboard.css";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { MyMedicationsComponent } from "../../components/my-medications/my-medications-component";

export const MyMedications = () => {
  return (
    <div className="dashboard">
      <NavBar />
      <MyMedicationsComponent />
    </div>
  );
};
