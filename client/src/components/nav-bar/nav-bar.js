import "./nav-bar.css";
import logo from "./images/favicon.svg";
import home from "./images/home.svg";
import calendar from "./images/calendar.svg";
import edit from "./images/edit.svg";
import settings from "./images/settings.svg";
import logout from "./images/logout.svg";
import arrow from "./images/triangle.svg";

export const NavBar = () => {
  return (
    <div className="navBar">
      <div className="logo">
        <a href="/dashboard">
          <img className="icon" src={logo} alt="myMedManager" />
        </a>
      </div>
      <div className="middle">
        <div className="navButton">
          <a href="/dashboard">
            <div>
              <img className="icon colorChange current" src={home} alt="home" />
            </div>
          </a>
          <div>
            <img className="arrow" src={arrow} alt="arrow" />
          </div>
        </div>
        <div className="navButton">
          <a href="/calendar">
            <div>
              <img className="icon colorChange" src={calendar} alt="calendar" />
            </div>
          </a>
          <div>
            <img className="arrow" src={arrow} alt="arrow" />
          </div>
        </div>
        <div className="navButton">
          <a href="/my-medications">
            <div>
              <img className="icon colorChange" src={edit} alt="edit" />
            </div>
          </a>
          <div>
            <img className="arrow" src={arrow} alt="arrow" />
          </div>
        </div>
        <div className="navButton">
          <a href="/settings">
            <div>
              <img className="icon colorChange" src={settings} alt="settings" />
            </div>
          </a>
          <div>
            <img className="arrow" src={arrow} alt="arrow" />
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
