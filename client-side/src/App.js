import Login from './User/Login';
import Register from './User/Register';
import Home from './Homepage/Home';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h2>
            Secondary Market
        </h2>
          <Link className="showlink" to="/">
            Home
          </Link>
          {/* TODO: when user logged in, display profile button and log out button. 
          Otherwise, display log in button without profile button */}
          {/* <Link className="showlink" to="/profile">
            Profile
          </Link> */}
          <Link className="showlink" to="/login">
            Log in
          </Link>
        </header>
        <br />
        <br />
        <div className="App-body">
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/post/:_id" component={SinglePost} /> */} 
          {/*  Recommend using this path above, otherwise Homepage need to change some link href. 
          SinglePost is just an example component name, you can rename to anything you like*/}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
      </div>
    </Router>
  );
}

export default App;
