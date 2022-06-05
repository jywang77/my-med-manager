import "../dashboard/dashboard.css";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { MyMedicationsComponent } from "../../components/my-medications/my-medications-component";
import { AddMedication } from "../../components/my-medications/add-medication";
import { EditMedication } from "../../components/my-medications/edit-medication";

export const MyMedications = () => {
  // show add medications container

  // const showAdd = () => {
  //   const addContainer = document.querySelector(".add");

  //   if (addContainer.style.display === "flex") {
  //     addContainer.style.display === "none";
  //   } else {
  //     addContainer.style.display === "flex";
  //   }
  // };

  // show edit medications container

  return (
    <div className="dashboard">
      <NavBar />
      <MyMedicationsComponent />
      <AddMedication />
      <EditMedication />
    </div>
  );
};
