import "./left.css";
import title from "./images/title.png";

export const Left = () => {
  return (
    <div className="left">
      <img className="title" src={title} alt="my Med Manager" />
      <div className="h2">A simple medication planner and compliance aid</div>
    </div>
  );
};
