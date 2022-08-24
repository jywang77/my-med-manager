import "./not-found.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import image from "./not-found.png";

export const NotFound = () => {
  return (
    <HelmetProvider>
      <div className="main">
        <Helmet>
          <title>myMedManager - 404 Not Found</title>
        </Helmet>
        <div className="errorContainer">
          <div className="errorLeft">
            <img className="errorImage" src={image} alt="" />
          </div>
          <div className="errorRight">
            <div className="errorH1">error 404:</div>
            <div className="errorH2">page not found</div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};
