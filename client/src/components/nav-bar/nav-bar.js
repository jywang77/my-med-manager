import "./nav-bar.css";
import logo from "./images/favicon.svg";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
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
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "icon1-active" : "")}
          >
            <button className="icon1" />
          </NavLink>
          <span className="tooltipText">dashboard</span>
        </div>
        {/* calendar */}
        <div className="navButton">
          <NavLink
            to="/calendar"
            className={({ isActive }) => (isActive ? "icon2-active" : "")}
          >
            <button className="icon2" />
          </NavLink>
          <span className="tooltipText">calendar</span>
        </div>
        {/* my medications */}
        <div className="navButton">
          <NavLink
            to="/my-medications"
            className={({ isActive }) => (isActive ? "icon3-active" : "")}
          >
            <button className="icon3" />
          </NavLink>
          <span className="tooltipText">my medications</span>
        </div>
        {/* settings */}
        <div className="navButton">
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "icon4-active" : "")}
          >
            <button className="icon4" />
          </NavLink>
          <span className="tooltipText">settings</span>
        </div>
      </div>
      {/* log out */}
      <div className="logout">
        <NavLink to="/">
          <button className="logoutButton" />
        </NavLink>
        <span className="tooltipText logOutTooltip">log out</span>
      </div>
    </div>
  );
};
