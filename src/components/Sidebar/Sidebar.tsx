import React from "react";
import { userDataType } from "../../types/user";

const Sidebar = (props : {
    user : userDataType
}) => {
    return (
        <>
            <h1>Hello {props.user.name}</h1>;
            <h2> {props.user.email}</h2>
            <img src={props.user.picture} alt="profile_photo" />
        </>
    );
    
}
export default Sidebar;
