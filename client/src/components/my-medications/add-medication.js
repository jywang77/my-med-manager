import "./add-medication.css";
import trash from "./images/trash.svg";
import { useState } from "react";

export const AddMedication = ({ setShowAdd }) => {
  // set default value of certain variables
  const [checked, setChecked] = useState(true);
  const [reminder, setReminder] = useState(3);

  // mades 'refill date' and 'remind me x days before the refill date' pop up if 'yes' is chosen for refill reminder
  const showRefillPopup = () => {
    const refillPopup = document.querySelector(".refillPopup");
    refillPopup.style.display = "block";
  };

  // hides refill popup if 'no' is chosen for refill reminder
  const hideRefillPopup = () => {
    const refillPopup = document.querySelector(".refillPopup");
    refillPopup.style.display = "none";
  };

  return (
    <div className="add">
      <div className="margin">
        <div className="h4">add new medication</div>
        <form>
          {/* medication name */}
          <div>
            <span className="bold">medication name:</span>
            <span className="red"> *</span>
            <input className="addInput addMedName" type="text" required />
          </div>
          {/* medication dose */}
          <div>
            <span className="bold">medication dose:</span>
            <input className="addInput addMedDose" type="number" />
            <select className="doseType">
              <option value="mg">mg</option>
              <option value="mcg">mcg</option>
              <option value="g">g</option>
              <option value="mL">mL</option>
              <option value="drop">drop(s)</option>
              <option value="puff">puff(s)</option>
              <option value="%">%</option>
              <option value="mg/mL">mg/mL</option>
              <option value="units">units</option>
            </select>
          </div>
          {/* instructions */}
          <div className="addInstructions">
            <div>
              <span className="bold">instructions:</span>
              <span className="red"> *</span>
            </div>
            <textarea className="largeInput" type="text" required />
          </div>
          {/* when i will take it */}
          <div>
            <div>
              <span className="bold">when I will take it:</span>
              <span className="red"> *</span>
            </div>
            <div className="checkboxMedTimeContainer">
              <div className="checkboxMedTime">
                <input
                  className="addMedTime"
                  type="checkbox"
                  id="morning"
                  value="morning"
                />
                <label htmlFor="morning" className="addMedLabel">
                  morning
                </label>
              </div>
              <div className="checkboxMedTime">
                <input
                  className="addMedTime"
                  type="checkbox"
                  id="breakfast"
                  value="breakfast"
                />
                <label htmlFor="breakfast" className="addMedLabel">
                  breakfast
                </label>
              </div>
              <div className="checkboxMedTime">
                <input
                  className="addMedTime"
                  type="checkbox"
                  id="lunch"
                  value="lunch"
                />
                <label htmlFor="lunch" className="addMedLabel">
                  lunch
                </label>
              </div>
              <div className="checkboxMedTime">
                <input
                  className="addMedTime"
                  type="checkbox"
                  id="dinner"
                  value="dinner"
                />
                <label htmlFor="dinner" className="addMedLabel">
                  dinner
                </label>
              </div>
              <div className="checkboxMedTime">
                <input
                  className="addMedTime"
                  type="checkbox"
                  id="bedtime"
                  value="bedtime"
                />
                <label htmlFor="bedtime" className="addMedLabel">
                  bedtime
                </label>
              </div>
            </div>
          </div>
          {/* what days i will take it  */}
          <div>
            <span className="bold">what days I will take it:</span>
          </div>
          <div className="checkboxMedDayContainer">
            <div className="checkboxMedDay">
              <input
                className="addMedDay"
                type="checkbox"
                id="sun"
                value="Sun"
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
              />
              <label htmlFor="sun" className="addMedLabel">
                Sun
              </label>
            </div>
            <div className="checkboxMedDay">
              <input
                className="addMedDay"
                type="checkbox"
                id="mon"
                value="Mon"
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
              />
              <label htmlFor="mon" className="addMedLabel">
                Mon
              </label>
            </div>
            <div className="checkboxMedDay">
              <input
                className="addMedDay"
                type="checkbox"
                id="tues"
                value="Tues"
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
              />
              <label htmlFor="tues" className="addMedLabel">
                Tues
              </label>
            </div>
            <div className="checkboxMedDay">
              <input
                className="addMedDay"
                type="checkbox"
                id="wed"
                value="Wed"
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
              />
              <label htmlFor="wed" className="addMedLabel">
                Wed
              </label>
            </div>
            <div className="checkboxMedDay">
              <input
                className="addMedDay"
                type="checkbox"
                id="thurs"
                value="Thurs"
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
              />
              <label htmlFor="thurs" className="addMedLabel">
                Thurs
              </label>
            </div>
            <div className="checkboxMedDay">
              <input
                className="addMedDay"
                type="checkbox"
                id="fri"
                value="Fri"
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
              />
              <label htmlFor="fri" className="addMedLabel">
                Fri
              </label>
            </div>
            <div className="checkboxMedDay">
              <input
                className="addMedDay"
                type="checkbox"
                id="sat"
                value="Sat"
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
              />
              <label htmlFor="sat" className="addMedLabel">
                Sat
              </label>
            </div>
          </div>
          {/* custom schedule */}
          <div>
            <span className="bold">
              Custom schedule: If none of the above, I take this medication
              every
            </span>
            <input className="addInput addMedFrequency" type="number" />
            <select className="doseFrequency">
              <option value="days">days</option>
              <option value="weeks">weeks</option>
              <option value="months">months</option>
            </select>
            <span className="bold">starting </span>
            <input type="date" className="startDate" />
          </div>
          {/* refill */}
          <div className="red addRefill">
            <div>
              <span className="bold">refill reminder: * </span>choose yes if you
              would like to be reminded when it is time to refill your
              medication. Refill notifications will appear on your dashboard.
            </div>
            <div className="refillReminder">
              <label>
                <input
                  type="radio"
                  name="refillYesNo"
                  id="yes"
                  value="yes"
                  onClick={showRefillPopup}
                  required
                />
                yes
              </label>
              <label>
                <input
                  type="radio"
                  name="refillYesNo"
                  id="no"
                  value="no"
                  onClick={hideRefillPopup}
                  required
                />
                no
              </label>
            </div>
            {/* refill reminder */}
            <div className="refillPopup" style={{ display: "none" }}>
              <div>
                <span className="bold">refill date: *</span>
              </div>
              <div className="presetDays">
                <label>
                  <input type="radio" name="refill" id="30d" value="30d" />
                  30 days from today
                </label>
                <label>
                  <input type="radio" name="refill" id="90d" value="90d" />
                  90 days from today
                </label>
                <label>
                  <input
                    type="radio"
                    name="refill"
                    id="pickDate"
                    value="pick date"
                  />
                  I will choose my own refill date from the calendar:{" "}
                  <input type="date" className="refillDate" />
                </label>
              </div>
              <div>
                Remind me
                <input
                  type="number"
                  className="addInput remindDate"
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                />
                days before the refill date.
              </div>
            </div>
          </div>
          {/* notes */}
          <div className="notes">
            <div>
              <span className="bold">notes: </span>e.g. what the medication is
              used for, how to take it, treatment targets, or whatever else you
              would like to keep track of.
            </div>
            <textarea className="largeInput" type="text" />
          </div>
          {/* buttons at the bottom */}
          <div className="addButtonsBottom">
            <button className="deleteButton visibilityHide">
              <img className="delete" src={trash} alt="delete" />
            </button>
            <div className="cancelSave">
              <div className="cancel" onClick={() => setShowAdd(false)}>
                cancel
              </div>
              <div>
                <button type="submit" className="submitButton">
                  save changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
