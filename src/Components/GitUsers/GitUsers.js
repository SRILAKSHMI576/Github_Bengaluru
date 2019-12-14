import React from "react"; //import react
import Axios from "axios"; //import axios
import GitUser from "../GitUser/GitUser";

//class component
class GitUsers extends React.Component {
  constructor() {
    super();

    this.state = { Users: [] }; //Users empty state
  }
  componentDidMount() {
    Axios.get("https://api.github.com/search/users?q=location:Bengaluru") //requesting server
      .then(response => {
        // console.log("------------", response.data.items);
        this.setState({ Users: response.data.items }); //get response data
      })
      .catch(error => {
        console.log(error); //show error
      });
  }
  render() {
    return (
      //apply map() method
      <div className="users">
        {this.state.Users.map(user => {
          console.log("--------", user.avatar_url);
          return <GitUser user={user} />;
        })}
      </div>
    );
  }
}

export default GitUsers;
