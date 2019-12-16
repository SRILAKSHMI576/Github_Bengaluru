import React from "react"; //import react
import Axios from "axios"; //import axios
import GitUser from "../GitUser/GitUser";
import "./style.css";
import Pagination from "react-js-pagination";

function searchingFor(search) {
  return function(x) {
    return x.login.toLowerCase().includes(search.toLowerCase()) || false;
  };
}

class GitUsers extends React.Component {
  constructor() {
    super();

    this.state = {
      Users: [],

      activePage: 1,
      perPage: 20,
      totalCount: 0,
      search: ""
    };
  }
  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber }, () => {
      this.getUser();
    });
  };

  searchHandler = event => {
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
        console.log(error);
      });
  };
  componentDidMount() {
    this.getUser();
  }
  render() {
    const { search } = this.state;
    return (
      //apply map() method

      <div>
        <h1 className="title">Github Users</h1>

        <div>
          <input
            className="search"
            type="text"
            value={search}
            name="search"
            onChange={this.searchHandler}
          />
        </div>
        <div className="users">
          {this.state.Users.filter(searchingFor(search)).map(user => {
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
