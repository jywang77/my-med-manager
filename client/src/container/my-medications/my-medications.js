import "../dashboard/dashboard.css";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { MyMedicationsComponent } from "../../components/my-medications/my-medications-component";
import { AddMedication } from "../../components/my-medications/add-medication";
import { EditMedication } from "../../components/my-medications/edit-medication";

export const MyMedications = () => {
  return (
    <div className="dashboard">
      <NavBar />
      <MyMedicationsComponent />
      <AddMedication />
      <EditMedication />
    </div>
  );
};
