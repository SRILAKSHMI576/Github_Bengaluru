import React from "react"; //import react
import Axios from "axios"; //import axios
import GitUser from "../GitUser/GitUser";
import "./style.css";
import Pagination from "react-js-pagination";

//class component
class GitUsers extends React.Component {
  constructor() {
    super();

    this.state = {
      Users: [],
      activePage: 1,
      perPage: 20,
      totalCount: 0,
      search: "Search..."
    };
  }
  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber }, () => {
      this.getUser();
    });
  };

  handleSearch = event => {
    this.setState({
      search: event.target.value
    });
  };
  getUser = () => {
    Axios.get(
      "https://api.github.com/search/users?q=location:Bengaluru&page=" +
        this.state.activePage +
        "&per_page=" +
        this.state.perPage
    ) //requesting server
      .then(response => {
        // console.log("------------", response.data.items);
        this.setState({
          Users: response.data.items,
          totalCount: response.data.total_count,
          filterUsers: response.data.items
        }); //get response data
      })
      .catch(error => {
        console.log(error); //show error
      });
  };
  componentDidMount() {
    this.getUser();
  }
  render() {
    return (
      //apply map() method

      <div>
        <h1 className="title">Github Users</h1>

        <div>
          <input
            className="search"
            type="text"
            value={this.state.search}
            name="search"
            onChange={this.handleSearch}
          />
        </div>

        <div className="users">
          {this.state.Users.map(user => {
            return <GitUser user={user} />;
          })}
        </div>

        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.perPage}
          totalItemsCount={this.state.totalCount}
          pageRangeDisplayed={10}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default GitUsers;
