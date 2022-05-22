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

  return (
    <div>
      {/* learn more */}
      <div class="learnMore">
        <button class="learnMoreButton" onClick={showBottom}>
          learn more
        </button>
      </div>
      <div class="bottom" style={{ display: "none" }}>
        <div class="containerBottom">
          <div class="h3 about">about</div>
          <div class="containerBottom1">
            {/* about */}
            <p>
              My name is Joy Wang, and I am a pharmacy student with an interest
              in the intersection between technology and pharmacy practice. I
              coded myMedManager during summer 2022 using HTML, CSS, JavaScript
              and React. The website layout and user interface was also designed
              by me. Certain images on this site (e.g. the home page) were hand
              drawn by myself on Clip Studio Paint and a digital drawing tablet.
              The logo was created by myself on Adobe Illustrator. Creating this
              website was very rewarding for me because I could blend my
              interests in technology, art, and design with my pharmacy
              knowledge. If you would like to contact me to learn more about
              this project, you can reach me using the methods below.
            </p>
          </div>
          {/* contact me */}
          <div class="h3">contact me</div>
          <div class="containerBottom2">
            <div>
              <a
                href="mailto:jyw.wang@mail.utoronto.ca"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button class="emailButton contactButton">
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
                <button class="linkedinButton contactButton">
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
                <button class="githubButton contactButton">GitHub</button>
              </a>
            </div>
          </div>
          {/* acknowledgements */}
          <div class="h3">acknowledgements</div>
          <div class="containerBottom3">
            <p>
              Michael Chen, for being my coding mentor and for helping me with
              troubleshooting bugs.
              <br />
              <br />
              This project is non-profit. Icons and pictures used on this site
              (that are not created by myself) are from free-use sources. Icon
              and image sources will nonetheless be linked below:
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
            </p>
          </div>
          <p></p>
          {/* back to top */}
          <div class="containerBottom4">
            <a href="#top">
              <button class="top">back to top</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
