import { useState } from "react";
import { userDataType } from "../../types/user";
import { ApplicationType } from "./constants";
import "./Content.css";
import Calender from "../Calender";
import Chat from "../Chat";
import pureLogo from "../../assets/images/pureLogo.png";
const Content = (props: { user: userDataType }) => {
  const [application, setApplication] = useState<string>(
    ApplicationType.CALENDER
  );
  const [expanded, modifyExpanded] = useState<boolean>(false);
  return (
    <>
      <div className='content'>
        <div
          className={`btn btn-grp-vertical ${expanded ? "expanded" : "compressed"}`}
          id='navBar'
        >
          <div className='btn'>
            <img
              className='material-symbols-outlined'
              id='navbarLogo'
              src={pureLogo}
              alt='Logo'
            />
            <span className='text'>{expanded ? "Freeknect" : null}</span>
          </div>
          <button
            className='btn'
            onClick={() => {
              modifyExpanded((exp) => !exp);
            }}
          >
            <span className='material-symbols-outlined'>menu</span>
            <span className='text'>{expanded ? "Apps" : null}</span>
          </button>
          <button
            className='btn'
            onClick={() => {
              modifyExpanded(false);
              setApplication(ApplicationType.CHAT);
            }}
          >
            <span className='material-symbols-outlined'>chat</span>
            <span className='text'>{expanded ? "Chat" : null}</span>
          </button>
          <button
            className='btn'
            onClick={() => {
              modifyExpanded(false);
              setApplication(ApplicationType.CALENDER);
            }}
          >
            <span className='material-symbols-outlined'>calendar_month</span>
            <span className='text'>{expanded ? "Calender" : null}</span>
          </button>
          <button
            className='btn'
            onClick={() => {
              modifyExpanded(false);
              setApplication(ApplicationType.MEET);
            }}
          >
            <span className='material-symbols-outlined'>video_call</span>
            <span>{expanded ? "Meet" : null}</span>
          </button>
        </div>
        <div id='actualContent'>
          {application === ApplicationType.CHAT ? (
            <Chat user={props.user} />
          ) : null}
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
