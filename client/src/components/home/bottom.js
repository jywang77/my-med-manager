import "./bottom.css";
import down from "./images/down.svg";
import up2 from "./images/up2.svg";

export const Bottom = () => {
  const showBottom = () => {
    const learnMoreButton = document.querySelector(".learnMoreButton");
    const bottom = document.querySelector(".bottom");

    if (bottom.style.display === "block") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      learnMoreButton.style.backgroundImage = `url(${down})`;
      setTimeout(() => {
        bottom.style.display = "none";
      }, 700);
    } else {
      bottom.style.display = "block";
      learnMoreButton.style.backgroundImage = `url(${up2})`;
      learnMoreButton.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* learn more */}
      <div className="learnMore">
        <button className="learnMoreButton" onClick={showBottom}>
          learn more
        </button>
      </div>
      <div className="bottom" style={{ display: "none" }}>
        <div className="containerBottom">
          <div className="h3 about">about</div>
          <div className="containerBottom1">
            {/* about */}
            <p>
              My name is Joy Wang, and I am a pharmacy student with an interest
              in the intersection between technology and pharmacy practice. I
              coded myMedManager during summer 2022 using React (HTML, CSS,
              JavaScript) for the front end and Express (+ MongoDB for data
              storage) for the back end. I used Figma to help me design the user
              interface. Certain images on this site (e.g. the home page) were
              hand drawn by myself on Clip Studio Paint and a digital drawing
              tablet. The logo was created by myself on Adobe Illustrator.
              Creating this website was very rewarding for me because I could
              blend my interests in technology, art, and design with my pharmacy
              knowledge. If you would like to contact me to learn more about
              this project, you can reach me using the methods below.
            </p>
          </div>
          {/* contact me */}
          <div className="h3">contact me</div>
          <div className="containerBottom2">
            <div>
              <a
                href="mailto:jyw.wang@mail.utoronto.ca"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="emailButton contactButton">
                  jyw.wang@mail.utoronto.ca
                </button>
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/in/jywang77/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="linkedinButton contactButton">
                  LinkedIn Profile
                </button>
              </a>
            </div>
            <div>
              <a
                href="https://github.com/jywang77/my-med-manager"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="githubButton contactButton">GitHub</button>
              </a>
            </div>
          </div>
          {/* acknowledgements */}
          <div className="h3">acknowledgements</div>
          <div className="containerBottom3">
            <p>
              Michael Chen, for being my coding mentor and for helping me with
              troubleshooting bugs.
              <br />
              <br />
              Icons and pictures used on this site (that are not created by
              myself) are from free-use sources. Icon and image sources be
              linked below:
              <br />
              <br />
              <a
                href="https://www.flaticon.com/free-icon-font/angle-down_3916923?page=1&position=6&term=down+arrow"
                target="_blank"
                rel="noopener noreferrer"
              >
                Arrow
              </a>
              <span> | </span>
              <a
                href="https://www.flaticon.com/free-icon-font/envelope_3916611?page=1&position=1&term=email"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email icon
              </a>
              <span> | </span>
              <a
                href="https://www.flaticon.com/free-icon-font/linkedin_6422202"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn icon
              </a>
              <span> | </span>
              <a
                href="https://www.flaticon.com/free-icon/github_2111425?term=github&related_id=2111425"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub icon
              </a>
              <span> | </span>
              <a
                href="https://www.flaticon.com/free-icon-font/home_3917033"
                target="_blank"
                rel="noopener noreferrer"
              >
                Home icon
              </a>
              <span> | </span>
              <a
                href="https://www.flaticon.com/free-icon-font/calendar_3917244 "
                target="_blank"
                rel="noopener noreferrer"
              >
                Calendar icon
              </a>
              <span> | </span>
              <a
                href="https://www.flaticon.com/free-icon-font/edit_3917361"
                target="_blank"
                rel="noopener noreferrer"
              >
                Edit icon
              </a>
              <span> | </span>
              <a
                href="https://www.flaticon.com/free-icon-font/settings_3917058"
                target="_blank"
                rel="noopener noreferrer"
              >
                Settings icon
              </a>
              <span> | </span>
              <a
                href="https://www.flaticon.com/free-icon-font/sign-out_3917349"
                target="_blank"
                rel="noopener noreferrer"
              >
                Log out icon
              </a>
              <span> | </span>
              <a
                href="https://www.flaticon.com/free-icon-font/trash_3917378"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trash icon
              </a>
              <span> | </span>
              <a
                href="https://www.flaticon.com/free-icon-font/exclamation_3917663"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alert icon
              </a>
              <span> | </span>
              <a
                href="https://www.flaticon.com/free-icon-font/check_3917749"
                target="_blank"
                rel="noopener noreferrer"
              >
                Checkmark
              </a>
              <span> | </span>
              <a
                href="https://www.flaticon.com/free-icon-font/add_3914248"
                target="_blank"
                rel="noopener noreferrer"
              >
                Plus icon
              </a>
              <br />
              <br />
              This project is non-profit and for demonstration purposes only. If
              you choose enter your real personal medication information into
              this website, you do so at your own risk.
            </p>
          </div>
          <p></p>
          {/* back to top */}
          <div className="containerBottom4">
            <button className="top" onClick={scrollToTop}>
              back to top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
