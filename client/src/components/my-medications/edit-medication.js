import "./add-medication.css";
import trash from "./images/trash.svg";
import { useState, useEffect } from "react";
import Axios from "axios";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const EditMedication = ({ setShowEdit, medId }) => {
  // grab details for a medication
  const [med, setMed] = useState({});

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3001/meds/med/${medId}`,
    }).then((res) => {
      setMed(res.data);
    });
  }, [medId]);

  // storing information entered into form
  const [medName, setMedName] = useState("");
  const [dose, setDose] = useState("");
  const [instructions, setInstructions] = useState("");
  const [notes, setNotes] = useState("");
  const [refill, setRefill] = useState(false);
  const [refillDate, setRefillDate] = useState(null);
  const [reminderDate, setReminderDate] = useState(""); // # of days before refill
  const [reminderDate2, setReminderDate2] = useState(null); // actual date you will get reminder

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

  // prepopulate form with medication info
  useEffect(() => {
    if (med.medName) {
      setMedName(med.medName);
    }

    if (med.dose) {
      setDose(med.dose);
    }

    if (med.instructions) {
      setInstructions(med.instructions);
    }

    if (med.time) {
      setBreakfast(med.time.breakfast);
      setLunch(med.time.lunch);
      setDinner(med.time.dinner);
      setBedtime(med.time.bedtime);
    }

    if (med.freq) {
      setSun(med.freq.sun);
      setMon(med.freq.mon);
      setTues(med.freq.tues);
      setWed(med.freq.wed);
      setThurs(med.freq.thurs);
      setFri(med.freq.fri);
      setSat(med.freq.sat);
    }

    if (med.refill === true || med.refill === false) {
      setRefill(med.refill);
    }

    if (med.refillDate) {
      setRefillDate(new Date(med.refillDate));
    }

    if (med.reminderDate) {
      setReminderDate(med.reminderDate);
    }

    if (med.reminderDate2) {
      setReminderDate2(new Date(med.reminderDate2));
    }

    if (med.notes) {
      setNotes(med.notes);
    }
  }, [med]);

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
      method: "PUT",
      data: {
        linkedUser: med.linkedUser,
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
      url: `http://localhost:3001/meds/edit/${medId}`,
    }).then((res) => {
      if (res.data) {
        setShowEdit(false);
        window.location.reload();
      }
    });
  };

  // delete medication
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    await Axios({
      method: "DELETE",
      withCredentials: true,
      url: `http://localhost:3001/meds/delete/${medId}`,
    }).then((res) => {
      if (res.data === true) {
        setShowEdit(false);
        window.location.reload();
      }
    });
  };

  // show/hide refill popup
  const showRefillPopup = () => {
    const refillPopup = document.querySelector(".refillPopup");
    refillPopup.style.display = "block";
  };

  const hideRefillPopup = () => {
    const refillPopup = document.querySelector(".refillPopup");
    refillPopup.style.display = "none";
  };

  useEffect(() => {
    if (refill) {
      document.getElementById("yes").checked = true;
      showRefillPopup();
    } else {
      document.getElementById("no").checked = true;
      hideRefillPopup();
    }
  }, [refill]);

  // grab today's date
  const today = new Date();
  today.getDate();

  return (
    <div className="editMedication">
      <div className="margin">
        <div className="h4">edit medication</div>
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
                  checked={breakfast}
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
                  checked={lunch}
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
                  checked={dinner}
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
                  checked={bedtime}
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
                checked={sun}
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
                checked={mon}
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
                checked={tues}
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
                checked={wed}
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
                checked={thurs}
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
                checked={fri}
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
                checked={sat}
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
                <span className="bold">refill date: * </span> (mm/dd/yyyy){" "}
                <Datepicker
                  className="refillDate"
                  selected={refillDate}
                  value={refillDate}
                  onChange={(date) => setRefillDate(date)}
                  minDate={today}
                  required={refill}
                />
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
            <button
              className="deleteButton"
              onClick={() => {
                setShowDelete(true);
              }}
            >
              <img className="delete" src={trash} alt="delete" />
            </button>
            <div className="cancelSave">
              <div className="cancel" onClick={() => setShowEdit(false)}>
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
        <div className={"deletePopup" + (showDelete ? "" : " visibilityHide")}>
          Are you sure you would like to delete this medication?
          <div className="deletePopupButtons">
            <button className="noDelete" onClick={() => setShowDelete(false)}>
              No, go back
            </button>
            <button className="yesDelete" onClick={handleDelete}>
              Yes, delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
