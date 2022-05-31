// import { useState } from "react";
import { Left } from "../../components/home/left";
import { Right } from "../../components/home/right";
import { Bottom } from "../../components/home/bottom";
import "./home.css";

export const Home = () => {
  // const [username, setUsername] = useState("");

  return (
    <div className="main">
      {/* {username} */}
      <div className="container">
        <Left />
        <Right />
        {/* <Right username={username} setUsername={setUsername} /> */}
      </div>
      <div>
        <Bottom />
      </div>
    </div>
  );
};
