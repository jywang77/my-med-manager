import "./my-medications-component.css";
import "../settings/settings-component.css";
import add from "./images/add.svg";
import edit from "./images/edit.svg";

export const MyMedicationsComponent = () => {
  const drugName = "ramipril";
  const drugDose = "5mg";
  const instructions = "take 1 capsule once daily";
  const refillDate = "06/05/2022";
  const note = "for blood pressure, target is 140/90 mmHg";

  return (
    <div className="background">
      <div className="editContainer">
        <div className="heading">
          <div className="h4">my medications</div>
          <div>
            <button className="addButton">
              <img className="addIcon" src={add} alt="add medication" />
            </button>
          </div>
        </div>
        <div className="medList">
          <div className="medDetails">
            <div className="h6">
              {drugName} {drugDose}
            </div>
            <div>{instructions}</div>
            <div>
              <span className="bold">refill date:</span> {refillDate}
            </div>
            <div>
              <span className="bold">notes:</span> {note}
            </div>
          </div>
          <div>
            <button className="editButton">
              <img className="editIcon" src={edit} alt="edit medication" />
            </button>
          </div>
        </div>
        {/* can delete */}
        <div className="medList">
          <div className="medDetails">
            <div className="h6">
              {drugName} {drugDose}
            </div>
            <div>{instructions}</div>
            <div>
              <span className="bold">refill date:</span> {refillDate}
            </div>
            <div>
              <span className="bold">notes:</span> {note}
            </div>
          </div>
          <div>
            <button className="editButton">
              <img className="editIcon" src={edit} alt="edit medication" />
            </button>
          </div>
        </div>
        <div className="medList">
          <div className="medDetails">
            <div className="h6">
              {drugName} {drugDose}
            </div>
            <div>{instructions}</div>
            <div>
              <span className="bold">refill date:</span> {refillDate}
            </div>
            <div>
              <span className="bold">notes:</span> {note}
            </div>
          </div>
          <div>
            <button className="editButton">
              <img className="editIcon" src={edit} alt="edit medication" />
            </button>
          </div>
        </div>
        {/* can delete */}
      </div>
    </div>
  );
};
