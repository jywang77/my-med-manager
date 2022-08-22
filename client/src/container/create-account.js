import { Left } from "../components/home/left";
import { RightCreate } from "../components/create-account/right-create";
import "./home.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

export const CreateAccount = () => {
  return (
    <HelmetProvider>
      <div className="main container">
        <Helmet>
          <title>myMedManager - Create Account</title>
        </Helmet>
        <Left></Left>
        <RightCreate></RightCreate>
      </div>
    </HelmetProvider>
  );
};
