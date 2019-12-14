import React from "react";

//function component
function GitUser(props) {
  return (
    <div>
      <img src={props.user.avatar_url} alt="poster" />
      <p>{props.user.login}</p>
      <a href={props.user.html_url}>Github</a>
    </div>
  );
}

export default GitUser;
