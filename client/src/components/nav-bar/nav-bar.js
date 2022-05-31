import "./nav-bar.css";
import logo from "./images/favicon.svg";
import home from "./images/home.svg";
import calendar from "./images/calendar.svg";
import edit from "./images/edit.svg";
import settings from "./images/settings.svg";
import logout from "./images/logout.svg";

export const NavBar = () => {
  return (
    <div className="navBar">
      <div className="logo">
        <a href="/dashboard">
          <img className="icon" src={logo} alt="myMedManager" />
        </a>
      </div>
      <div className="middle">
        <div>
          <a href="/dashboard">
            <img className="icon colorChange" src={home} alt="home" />
          </a>
        </div>
        <div>
          <a href="/calendar">
            <img className="icon colorChange" src={calendar} alt="calendar" />
          </a>
        </div>
        <div>
          <a href="/my-medications">
            <img className="icon colorChange" src={edit} alt="edit" />
          </a>
        </div>
        <div>
          <a href="/settings">
            <img className="icon colorChange" src={settings} alt="settings" />
          </a>
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
