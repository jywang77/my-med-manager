import "./nav-bar.css";
import logo from "./images/favicon.svg";
import home from "./images/home.svg";
import calendar from "./images/calendar.svg";
import edit from "./images/edit.svg";
import settings from "./images/settings.svg";
import logout from "./images/logout.svg";
import arrow from "./images/triangle.svg";
import { useLocation } from "react-router-dom";

export const NavBar = () => {
  // change nav bar display depending on what page you are on
  const location = useLocation().pathname;
  //console.log(location);

  // import identifiers for each of the icons/tabs
  const icon1 = document.querySelector(".icon1");
  const icon2 = document.querySelector(".icon2");
  const icon3 = document.querySelector(".icon3");
  const icon4 = document.querySelector(".icon4");

  // import identifiers for each of the triangles/arrows
  const tab1 = document.querySelector(".tab1");
  const tab2 = document.querySelector(".tab2");
  const tab3 = document.querySelector(".tab3");
  const tab4 = document.querySelector(".tab4");

  const pageNav = () => {
    if (location === "/dashboard") {
      icon1.style.filter =
        "invert(45%) sepia(4%) saturate(2411%) hue-rotate(114deg) brightness(93%) contrast(86%)";
      tab1.style.display = "block";
    }
  };

  return (
    <div className="navBar">
      <div className="logo">
        <a href="/dashboard" onClick={pageNav}>
          <img className="icon" src={logo} alt="myMedManager" />
        </a>
      </div>
      <div className="middle">
        <div className="navButton">
          <a href="/dashboard">
            <div>
              <img
                className="icon colorChange icon1"
                src={home}
                alt="dashboard"
              />
            </div>
          </a>
          <div>
            <img className="arrow tab1" src={arrow} alt="arrow" />
          </div>
        </div>
        <div className="navButton">
          <a href="/calendar">
            <div>
              <img
                className="icon colorChange icon2"
                src={calendar}
                alt="calendar"
              />
            </div>
          </a>
          <div>
            <img className="arrow tab2" src={arrow} alt="arrow" />
          </div>
        </div>
        <div className="navButton">
          <a href="/my-medications">
            <div>
              <img
                className="icon colorChange icon3"
                src={edit}
                alt="my medications"
              />
            </div>
          </a>
          <div>
            <img className="arrow tab3" src={arrow} alt="arrow" />
          </div>
        </div>
        <div className="navButton">
          <a href="/settings">
            <div>
              <img
                className="icon colorChange icon4"
                src={settings}
                alt="settings"
              />
            </div>
          </a>
          <div>
            <img className="arrow tab4" src={arrow} alt="arrow" />
          </div>
        </div>
      </div>
      <div className="logout">
        <a href="/">
          <img className="icon colorChange" src={logout} alt="log out" />
        </a>
      </div>
    </div>
  );
};
