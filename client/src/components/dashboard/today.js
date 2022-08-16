import "./today.css";
import { useState, useEffect } from "react";
import Axios from "axios";

export const Today = ({ medArray }) => {
  // name
  const [name, setName] = useState("");

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/users/user",
    }).then((res) => {
      if (res.data.name) {
        setName(res.data.name);
      } else {
        setName(res.data.username);
      }
    });
  }, []);

  // decides if greeting is good morning, good afternoon, or good evening
  const today = new Date();
  const time = today.getHours();

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (time >= 6 && time < 12) {
      setGreeting("morning");
    } else if (time >= 12 && time < 19) {
      setGreeting("afternoon");
    } else {
      setGreeting("evening");
    }
  }, [time]);

  // displays today's date
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = days[today.getDay()];
  const month = months[today.getMonth()];
  const date = today.getDate();

  // filter medArray so that only the medications taken today are shown in todaysMedArray
  const [todaysMedArray, setTodaysMedArray] = useState([]);
  const dayOfWeek = today.getDay();

  useEffect(() => {
    setTodaysMedArray([]);
    medArray.filter((med) => {
      if (med.freq[Object.keys(med.freq)[dayOfWeek]] === true) {
        return setTodaysMedArray((old) => [...old, med]);
      } else return setTodaysMedArray((old) => old);
    });
  }, [dayOfWeek, medArray]);

  // make separate arrays to hold breakfast, lunch, dinner, bedtime medications
  const [breakfastArray, setBreakfastArray] = useState([]);
  useEffect(() => {
    setBreakfastArray([]);
    todaysMedArray.filter((med) => {
      if (med.time.breakfast === true) {
        return setBreakfastArray((old) => [...old, med]);
      } else return setBreakfastArray((old) => old);
    });
  }, [todaysMedArray]);

  const [lunchArray, setLunchArray] = useState([]);
  useEffect(() => {
    setLunchArray([]);
    todaysMedArray.filter((med) => {
      if (med.time.lunch === true) {
        return setLunchArray((old) => [...old, med]);
      } else return setLunchArray((old) => old);
    });
  }, [todaysMedArray]);

  const [dinnerArray, setDinnerArray] = useState([]);
  useEffect(() => {
    setDinnerArray([]);
    todaysMedArray.filter((med) => {
      if (med.time.dinner === true) {
        return setDinnerArray((old) => [...old, med]);
      } else return setDinnerArray((old) => old);
    });
  }, [todaysMedArray]);

  const [bedtimeArray, setBedtimeArray] = useState([]);
  useEffect(() => {
    setBedtimeArray([]);
    todaysMedArray.filter((med) => {
      if (med.time.bedtime === true) {
        return setBedtimeArray((old) => [...old, med]);
      } else return setBedtimeArray((old) => old);
    });
  }, [todaysMedArray]);

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

  // record checkbox information
  const handleCheckbox = ({ time, linkedMed, checked }) => {
    Axios({
      method: "POST",
      data: {
        linkedUser: id,
        linkedMed: linkedMed,
        time: time,
        date: new Date().toDateString(),
        checked: checked,
      },
      withCredentials: true,
      url: "http://localhost:3001/history/add",
    }).then((res) => {
      if (res.data === true) {
        Axios({
          method: "PATCH",
          data: {
            linkedUser: id,
            linkedMed: linkedMed,
            time: time,
            date: new Date().toDateString(),
            checked: checked,
          },
          withCredentials: true,
          url: "http://localhost:3001/history/edit",
        });
      }
    });
  };

  // get checkbox info from back end
  const [checkboxHistory, setCheckboxHistory] = useState([]);

  useEffect(() => {
    if (id) {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3001/history/med/${id}/${new Date().toDateString()}`,
      }).then((res) => {
        setCheckboxHistory(res.data);
      });
    }
  }, [id]);

  return (
    <div className="schedule">
      <div className="greeting">
        good {greeting}, <span className="green">{name}</span>!
      </div>
      <div className="greeting2">here is today's medication schedule:</div>
      <div className="greeting">
        {day} <span className="green">{month}</span> {date}
      </div>
      <div className="table">
        {/* if array is empty, show "no medications here" message */}
        <p
          className={
            "noMedications2" +
            (breakfastArray.length === 0 &&
            lunchArray.length === 0 &&
            dinnerArray.length === 0 &&
            bedtimeArray.length === 0
              ? " show"
              : "")
          }
        >
          There are currently no medications to show. You can add or edit a
          medication using the 'my medications' tab.
        </p>
        {/* breakfast */}
        <div className={"row" + (breakfastArray.length === 0 ? " hide" : "")}>
          <div className="medTime">breakfast</div>
          <div className="medContainer">
            {breakfastArray.map((med) => {
              // look for corresponding checkbox
              const result = checkboxHistory.filter((obj) => {
                return obj.linkedMed === med._id && obj.time === "breakfast";
              });
              return (
                <div className="medication" key={med._id}>
                  <div className="medName">
                    <input
                      type="checkbox"
                      defaultChecked={
                        result.length === 1 ? result[0].checked : false
                      }
                      onChange={(e) => {
                        handleCheckbox({
                          time: "breakfast",
                          linkedMed: med._id,
                          checked: e.target.checked,
                        });
                      }}
                    />
                    <div className="strikethrough">
                      <label className="medLabel">
                        {med.medName} {med.dose}
                      </label>
                      <div className="instructions">{med.instructions}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* lunch */}
        <div className={"row" + (lunchArray.length === 0 ? " hide" : "")}>
          <div className="medTime">lunch</div>
          <div className="medContainer">
            {lunchArray.map((med) => {
              // look for corresponding checkbox
              const result = checkboxHistory.filter((obj) => {
                return obj.linkedMed === med._id && obj.time === "lunch";
              });
              return (
                <div className="medication" key={med._id}>
                  <div className="medName">
                    <input
                      type="checkbox"
                      defaultChecked={
                        result.length === 1 ? result[0].checked : false
                      }
                      onChange={(e) => {
                        handleCheckbox({
                          time: "lunch",
                          linkedMed: med._id,
                          checked: e.target.checked,
                        });
                      }}
                    />
                    <div className="strikethrough">
                      <label className="medLabel">
                        {med.medName} {med.dose}
                      </label>
                      <div className="instructions">{med.instructions}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* dinner */}
        <div className={"row" + (dinnerArray.length === 0 ? " hide" : "")}>
          <div className="medTime">dinner</div>
          <div className="medContainer">
            {dinnerArray.map((med) => {
              // look for corresponding checkbox
              const result = checkboxHistory.filter((obj) => {
                return obj.linkedMed === med._id && obj.time === "dinner";
              });
              return (
                <div className="medication" key={med._id}>
                  <div className="medName">
                    <input
                      type="checkbox"
                      defaultChecked={
                        result.length === 1 ? result[0].checked : false
                      }
                      onChange={(e) => {
                        handleCheckbox({
                          time: "dinner",
                          linkedMed: med._id,
                          checked: e.target.checked,
                        });
                      }}
                    />
                    <div className="strikethrough">
                      <label className="medLabel">
                        {med.medName} {med.dose}
                      </label>
                      <div className="instructions">{med.instructions}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* bedtime */}
        <div className={"row" + (bedtimeArray.length === 0 ? " hide" : "")}>
          <div className="medTime">bedtime</div>
          <div className="medContainer">
            {bedtimeArray.map((med) => {
              // look for corresponding checkbox
              const result = checkboxHistory.filter((obj) => {
                return obj.linkedMed === med._id && obj.time === "bedtime";
              });
              return (
                <div className="medication" key={med._id}>
                  <div className="medName">
                    <input
                      type="checkbox"
                      defaultChecked={
                        result.length === 1 ? result[0].checked : false
                      }
                      onChange={(e) => {
                        handleCheckbox({
                          time: "bedtime",
                          linkedMed: med._id,
                          checked: e.target.checked,
                        });
                      }}
                    />
                    <div className="strikethrough">
                      <label className="medLabel">
                        {med.medName} {med.dose}
                      </label>
                      <div className="instructions">{med.instructions}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
