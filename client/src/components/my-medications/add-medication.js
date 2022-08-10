import "./add-medication.css";
import trash from "./images/trash.svg";
import { useState, useEffect } from "react";
import Axios from "axios";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AddMedication = ({ setShowAdd }) => {
  // show/hide refill popup
  const showRefillPopup = () => {
    const refillPopup = document.querySelector(".refillPopup");
    refillPopup.style.display = "block";
  };

  const hideRefillPopup = () => {
    const refillPopup = document.querySelector(".refillPopup");
    refillPopup.style.display = "none";
  };

  // grab user id from back end
  const [id, setId] = useState("");

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/users/user",
    }).then((res) => {
      setId(res.data._id.toString());
    });
  }, []);

  // storing information entered into form
  const [medName, setMedName] = useState("");
  const [dose, setDose] = useState("");
  const [instructions, setInstructions] = useState("");
  const [notes, setNotes] = useState("");
  const [refill, setRefill] = useState(null);
  const [refillDate, setRefillDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // select custom refill date
  const [reminderDate, setReminderDate] = useState(""); // # of days before refill
  const [reminderDate2, setReminderDate2] = useState(null); // actual date you will get reminder
  const [customDate, setCustomDate] = useState(false); // make custom refill date field required

  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [bedtime, setBedtime] = useState(false);

  const [sun, setSun] = useState(true);
  const [mon, setMon] = useState(true);
  const [tues, setTues] = useState(true);
  const [wed, setWed] = useState(true);
  const [thurs, setThurs] = useState(true);
  const [fri, setFri] = useState(true);
  const [sat, setSat] = useState(true);

  // calculate date you will be reminded to refill (reminderDate2)
  useEffect(() => {
    var next = new Date();

    if (refillDate) {
      next.setTime(
        new Date(refillDate).getTime() - reminderDate * 1000 * 60 * 60 * 24
      );
    } else {
      next = null;
    }

    setReminderDate2(next);
  }, [refillDate, reminderDate]);

  // sending form information to back end
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        linkedUser: id,
        medName: medName,
        dose: dose,
        instructions: instructions,
        time: {
          breakfast: breakfast,
          lunch: lunch,
          dinner: dinner,
          bedtime: bedtime,
        },
        freq: {
          sun: sun,
          mon: mon,
          tues: tues,
          wed: wed,
          thurs: thurs,
          fri: fri,
          sat: sat,
        },
        refill: refill,
        refillDate: refillDate,
        reminderDate: reminderDate,
        reminderDate2: reminderDate2,
        notes: notes,
      },
      withCredentials: true,
      url: "http://localhost:3001/meds/add",
    }).then((res) => {
      if (res.data) {
        setShowAdd(false);
        window.location.reload();
      }
    });
  };

  // grab today's date
  const today = new Date();
  today.getDate();

  return (
    <div className="add">
      <div className="margin">
        <div className="h4">add new medication</div>
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* medication name */}
          <div>
            <span className="bold">medication name:</span>
            <span className="red"> *</span>
            <input
              className="addInput addMedName"
              type="text"
              required
              onChange={(e) => setMedName(e.target.value)}
              id="medName"
              value={medName}
            />
          </div>
          {/* medication dose */}
          <div>
            <span className="bold">medication dose:</span>
            <input
              className="addInput addMedDose doseType"
              type="text"
              onChange={(e) => setDose(e.target.value)}
              id="dose"
              value={dose}
            />
          </div>
          {/* instructions */}
          <div className="addInstructions">
            <div>
              <span className="bold">instructions:</span>
              <span className="red"> *</span>
            </div>
            <textarea
              className="largeInput"
              type="text"
              required
              onChange={(e) => setInstructions(e.target.value)}
              id="instructions"
              value={instructions}
              maxLength="1000"
            />
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
                  id="breakfast"
                  value="breakfast"
                  defaultChecked={breakfast}
                  onChange={() => setBreakfast(!breakfast)}
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
                  defaultChecked={lunch}
                  onChange={() => setLunch(!lunch)}
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
                  defaultChecked={dinner}
                  onChange={() => setDinner(!dinner)}
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
                  defaultChecked={bedtime}
                  onChange={() => setBedtime(!bedtime)}
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
            <span className="red"> *</span>
          </div>
          <div className="checkboxMedDayContainer">
            <div className="checkboxMedDay">
              <input
                className="addMedDay"
                type="checkbox"
                id="sun"
                value="Sun"
                defaultChecked={sun}
                onChange={() => setSun(!sun)}
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
                defaultChecked={mon}
                onChange={() => setMon(!mon)}
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
                defaultChecked={tues}
                onChange={() => setTues(!tues)}
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
                defaultChecked={wed}
                onChange={() => setWed(!wed)}
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
                defaultChecked={thurs}
                onChange={() => setThurs(!thurs)}
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
                defaultChecked={fri}
                onChange={() => setFri(!fri)}
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
                defaultChecked={sat}
                onChange={() => setSat(!sat)}
              />
              <label htmlFor="sat" className="addMedLabel">
                Sat
              </label>
            </div>
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
                  onClick={() => {
                    showRefillPopup();
                    setRefill(true);
                    setReminderDate(3);
                  }}
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
                  onClick={() => {
                    hideRefillPopup();
                    setRefill(false);
                    setReminderDate("");
                    setRefillDate(null);
                  }}
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
                  <input
                    type="radio"
                    name="refill"
                    id="30d"
                    value="30d"
                    onClick={() => {
                      const today = new Date();
                      const next = new Date();
                      next.setDate(today.getDate() + 30);
                      setRefillDate(next);
                      setCustomDate(false);
                    }}
                    required={refill}
                  />
                  30 days from today
                </label>
                <label>
                  <input
                    type="radio"
                    name="refill"
                    id="90d"
                    value="90d"
                    onClick={() => {
                      const today = new Date();
                      const next = new Date();
                      next.setDate(today.getDate() + 90);
                      setRefillDate(next);
                      setCustomDate(false);
                    }}
                    required={refill}
                  />
                  90 days from today
                </label>
                <label>
                  <input
                    type="radio"
                    name="refill"
                    id="pickDate"
                    value="pick date"
                    required={refill}
                    onClick={() => setCustomDate(true)}
                  />
                  I will choose my own refill date:{" "}
                  <Datepicker
                    className="refillDate"
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setRefillDate(date);
                    }}
                    minDate={today}
                    required={customDate}
                  />
                </label>
              </div>
              <div>
                <span className="bold">* </span>Remind me
                <input
                  type="number"
                  className="addInput remindDate"
                  value={reminderDate}
                  min="0"
                  onChange={(e) => {
                    setReminderDate(e.target.value);
                  }}
                  required={refill}
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
            <textarea
              className="largeInput"
              type="text"
              onChange={(e) => setNotes(e.target.value)}
              id="notes"
              value={notes}
              maxLength="1000"
            />
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
