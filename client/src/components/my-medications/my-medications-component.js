import "./my-medications-component.css";
import "../settings/settings-component.css";
import add from "./images/add.svg";
import edit from "./images/edit.svg";
import { AddMedication } from "./add-medication";
import { EditMedication } from "./edit-medication";
import { useState, useEffect } from "react";
import Axios from "axios";

export const MyMedicationsComponent = () => {
  // grab user id from back end
  const [linkedUser, setLinkedUser] = useState("");

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/users/user",
    }).then((res) => {
      setLinkedUser(res.data._id.toString());
    });
  }, []);

  // use the user id to query all medications for user and place in array
  const [medArray, setMedArray] = useState([]);

  useEffect(() => {
    if (linkedUser) {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3001/meds/all/${linkedUser}`,
      }).then((res) => {
        setMedArray(res.data);
      });
    }
  }, [linkedUser]);

  // show/hide the add and edit medication pop-ups
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div>
      <div className="background">
        <div className="editContainer">
          <div className="heading">
            <div className="h4">my medications</div>
            <div>
              <button
                className="addButton"
                onClick={() => setShowAdd((prev) => !prev)}
              >
                <img className="addIcon" src={add} alt="add medication" />
              </button>
            </div>
          </div>
          {/* loop based on number of meds */}
          {medArray.map((med) => {
            return (
              <div className="medList" key={med._id}>
                <div className="medDetails">
                  <div className="h6">
                    {med.medName} {med.dose}
                  </div>
                  <div>{med.instructions}</div>
                  <div>
                    <span className="bold">refill date:</span>{" "}
                    {med.refillDate
                      ? new Date(med.refillDate).toDateString()
                      : "none"}
                  </div>
                  <div>
                    <span className="bold">notes:</span>{" "}
                    {med.notes ? med.notes : "none"}
                  </div>
                </div>
                <div>
                  <button
                    className="editButton"
                    onClick={() => setShowEdit((prev) => !prev)}
                  >
                    <img
                      className="editIcon"
                      src={edit}
                      alt="edit medication"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showAdd && <AddMedication setShowAdd={setShowAdd} />}
      {showEdit && <EditMedication setShowEdit={setShowEdit} />}
    </div>
  );
};
