import { useState } from "react";
import { userDataType } from "../../types/user";
import { ApplicationType } from "./constants";
import "./Content.css";
import Calender from "../Calender";
const Content = (props: { user: userDataType }) => {
  const [application, setApplication] = useState<string>(
    ApplicationType.CALENDER,
  );
  const [expanded, modifyExpanded] = useState<boolean>(true);
  return (
    <>
      <div className="content">
        <div
          className={`btn btn-grp-vertical ${expanded ? "expanded" : "compressed"}`}
          id="navBar"
        >
          <button
            className="btn"
            onClick={() => {
              modifyExpanded((exp) => !exp);
            }}
          >
            <span className="material-symbols-outlined">menu</span>
            <span className="text">{expanded ? "Apps" : null}</span>
          </button>
          <button
            className="btn"
            onClick={() => setApplication(ApplicationType.CHAT)}
          >
            <span className="material-symbols-outlined">chat</span>
            <span className="text">{expanded ? "Chat" : null}</span>
          </button>
          <button
            className="btn"
            onClick={() => setApplication(ApplicationType.CALENDER)}
          >
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text">{expanded ? "Calender" : null}</span>
          </button>
          <button
            className="btn"
            onClick={() => setApplication(ApplicationType.MEET)}
          >
            <span className="material-symbols-outlined">video_call</span>
            <span>{expanded ? "Meet" : null}</span>
          </button>
        </div>
        <div id="content">
          {application === ApplicationType.CHAT ? <h1>Hello</h1> : null}
          {application === ApplicationType.MEET ? <h1>Hello</h1> : null}
          {application === ApplicationType.CALENDER ? (
            <Calender user={props.user} />
          ) : null}
        </div>
      </div>
    </>
  );
};
export default Content;
