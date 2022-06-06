import "./nav-bar.css";
import logo from "./images/favicon.svg";
import home from "./images/home.svg";
import calendar from "./images/calendar.svg";
import edit from "./images/edit.svg";
import settings from "./images/settings.svg";
import logout from "./images/logout.svg";
import arrow from "./images/triangle.svg";
// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

export const NavBar = () => {
  // // script runs automatically when page loads - checks for path and displays navigation pointer (arrow) depending on what page you are on
  // useEffect(() => {
  //   // change nav bar display depending on what page you are on
  //   const location = useLocation().pathname;

  //   // import identifiers for each of the icons/tabs
  //   const icon1 = document.querySelector(".icon1");
  //   const icon2 = document.querySelector(".icon2");
  //   const icon3 = document.querySelector(".icon3");
  //   const icon4 = document.querySelector(".icon4");

  //   // import identifiers for each of the triangles/arrows
  //   const tab1 = document.querySelector(".tab1");
  //   const tab2 = document.querySelector(".tab2");
  //   const tab3 = document.querySelector(".tab3");
  //   const tab4 = document.querySelector(".tab4");

  //   if (location === "/dashboard") {
  //     icon1.style.filter =
  //       "invert(45%) sepia(4%) saturate(2411%) hue-rotate(114deg) brightness(93%) contrast(86%)";
  //     tab1.style.display = "block";
  //   }
  // }, []);

  return (
    <div className="navBar">
      <div className="logo">
        <a href="/dashboard">
          <img className="icon" src={logo} alt="myMedManager" />
        </a>
      </div>
      <div className="middle">
        {/* dashboard */}
        <div className="navButton">
          <div className="colorChange">
            <a href="/dashboard">
              <img className="icon  icon1" src={home} alt="dashboard" />
            </a>
          </div>
          <div>
            <img className="arrow tab1" src={arrow} alt="arrow" />
          </div>
          <span className="tooltipText">dashboard</span>
        </div>
        {/* calendar */}
        <div className="navButton">
          <div className="colorChange">
            <a href="/calendar">
              <img className="icon  icon2" src={calendar} alt="calendar" />
            </a>
          </div>
          <div>
            <img className="arrow tab2" src={arrow} alt="arrow" />
          </div>
          <span className="tooltipText">calendar</span>
        </div>
        {/* my medications */}
        <div className="navButton">
          <div className="colorChange">
            <a href="/my-medications">
              <img className="icon  icon3" src={edit} alt="my medications" />
            </a>
          </div>
          <div>
            <img className="arrow tab3" src={arrow} alt="arrow" />
          </div>
          <span className="tooltipText">my medications</span>
        </div>
        {/* settings */}
        <div className="navButton">
          <div className="colorChange">
            <a href="/settings">
              <img className="icon  icon4" src={settings} alt="settings" />
            </a>
          </div>
          <div>
            <img className="arrow tab4" src={arrow} alt="arrow" />
          </div>
          <span className="tooltipText">settings</span>
        </div>
      </div>
      {/* log out */}
      <div className="logout">
        <div className="colorChange">
          <a href="/">
            <img className="icon" src={logout} alt="log out" />
          </a>
        </div>
        <span className="tooltipText logOutTooltip">log out</span>
      </div>
    </div>
  );
};
