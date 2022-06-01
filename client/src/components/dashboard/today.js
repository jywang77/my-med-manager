import "./today.css";

export const Today = () => {
  // name
  const name = "demo";

  // decides if greeting is good morning, good afternoon, or good evening
  const today = new Date();
  const time = today.getHours();
  let greeting = "";

  if (time >= 6 && time < 12) {
    greeting = "morning";
  } else if (time >= 12 && time < 19) {
    greeting = "afternoon";
  } else {
    greeting = "evening";
  }

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

  return (
    <div>
      <div className="schedule">
        <div className="greeting">
          good {greeting}, <span className="green">{name}</span>!
        </div>
        <div className="greeting2">here is today's medication schedule:</div>
        <div className="greeting">
          {day} <span className="green">{month}</span> {date}
        </div>
        <div className="table">
          <div className="row">
            <div className="medTime">breakfast</div>
            <div className="medication">
              <div className="medName">
                {/* <input type="checkbox" className="checkbox" /> */}
                ramipril 5mg
              </div>
              <div classname="instructions">take 1 capsule once daily</div>
            </div>
          </div>
          <div className="row">
            <div className="medTime">lunch</div>
            <div className="medication">
              <div className="medName">no medications</div>
              <div classname="instructions">no medications</div>
            </div>
          </div>

          <div className="row">
            <div className="medTime">dinner</div>
            <div className="medication">
              <div className="medName">metformin 500mg</div>
              <div classname="instructions">take 2 tablets once daily</div>
            </div>
          </div>
          <div className="row">
            <div className="medTime">bedtime</div>
            <div className="medication">
              <div className="medName">zolpidem 10mg</div>
              <div classname="instructions">
                take 1 tablet at bedtime if needed for sleep
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};