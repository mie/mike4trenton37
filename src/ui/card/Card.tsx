import { Person } from "../../types";
import cl from "./Card.module.css";
import { ReactComponent as GithubSVG } from "../../assets/github.svg";
import { ReactComponent as LinkedinSVG } from "../../assets/linkedin.svg";
import { ReactComponent as TwitterSVG } from "../../assets/twitter.svg";

type Props = {
  person: Person;
};

export function Card(props: Props) {
  const svgProps = { width: "1.6em", height: "1.6em", color: "#111" };

  return (
    <div className={cl.card}>
      {/* <img
        className={cl.image}
        src={props.person.imagePortraitUrl}
        loading="lazy"
        alt={[props.person.name, "picture"].join(" ")}
      /> */}
      <div
        className={cl.image}
        style={{
          backgroundImage: `url(${
            props.person.imagePortraitUrl === null
              ? "No_picture_available.png"
              : props.person.imagePortraitUrl
          })`,
          backgroundSize: "cover",
          backgroundColor: "#333",
        }}
      ></div>
      <div className={cl.bottompane}>
        <div className={cl.personpane}>
          <span>{props.person.name}</span>
          <span>Office: {props.person.office}</span>
        </div>
        <div className={cl.linkpane}>
          {props.person.linkedIn !== null && (
            <a href={["https://linkedin.com", props.person.linkedIn].join('')}>
              <LinkedinSVG {...svgProps} />
            </a>
          )}
          {props.person.gitHub !== null && (
            <a href={["https://github.com/", props.person.gitHub].join('')}>
              <GithubSVG {...svgProps} />
            </a>
          )}
          {props.person.twitter !== null && (
            <a href={["https://twitter.com/", props.person.twitter].join('')}>
              <TwitterSVG {...svgProps} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
