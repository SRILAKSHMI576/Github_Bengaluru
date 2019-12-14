import React from "react";
import "./style.css";

//function component
function GitUser(props) {
  return (
    <div className="user">
      <img src={props.user.avatar_url} alt="poster" />
      <div className="user-details">
        <p>{props.user.login}</p>
        <a href={props.user.html_url}>Github</a>
      </div>
    </div>
  );
}

export default GitUser;
