import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"; //import react-router-dom
import GitUsers from "./Components/GitUsers/GitUsers";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={GitUsers} />
      </Router>
    </div>
  );
}

export default App;
