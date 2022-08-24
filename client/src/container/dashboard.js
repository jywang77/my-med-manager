import "./dashboard.css";
import { NavBar } from "../components/nav-bar/nav-bar";
import { Today } from "../components/dashboard/today";
import { Reminder } from "../components/dashboard/reminder";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [linkedUser, setLinkedUser] = useState("");
  const [name, setName] = useState("");

  // protect route
  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "/users/isauth",
    }).then((res) => {
      if (res.data === false) {
        navigate("/");
      } else {
        // grab user id from back end
        Axios({
          method: "GET",
          withCredentials: true,
          url: "/users/user",
        }).then((res) => {
          if (res.data.name) {
            setName(res.data.name);
          } else {
            setName(res.data.username);
          }
          setLinkedUser(res.data._id.toString());
        });
      }
    });
  }, [navigate]);

  // use the user id to query all medications for user and place in array
  const [medArray, setMedArray] = useState([]);

  useEffect(() => {
    if (linkedUser) {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `/meds/all/${linkedUser}`,
      }).then((res) => {
        setMedArray(res.data);
      });
    }
  }, [linkedUser]);

  return (
    <HelmetProvider>
      <div className="dashboard">
        <Helmet>
          <title>myMedManager - Dashboard</title>
        </Helmet>
        <NavBar />
        <Today medArray={medArray} linkedUser={linkedUser} name={name} />
        <Reminder medArray={medArray} />
      </div>
    </HelmetProvider>
  );
};
