import Login from './User/Login';
import Register from './User/Register';
import Home from './Component/Home';
import Profile from './User/Profile';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import cookie from 'react-cookies'

function App() {
  const [currentLogin, SetCurrentLogin] = useState(false);
  let current_email;
  useEffect(() => {
    console.log('on load useeffect');
    async function fetchData() {
      try {
        current_email = cookie.load('current_email');
        if(current_email){
          SetCurrentLogin(true);
        }else{
          SetCurrentLogin(false);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [current_email]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>
            Secondary Market
        </h1>
          <Link className="showlink" to="/">
            Home
          </Link>
          {/* TODO: when user logged in, display profile button and log out button. 
          Otherwise, display log in button without profile button */}
          {/* <Link className="showlink" to="/profile">
            Profile
          </Link> */}

          {currentLogin === true ? <div style={{float:'right'}}><Link className="showlink" onClick={() => {
            cookie.remove('current_email');
            SetCurrentLogin(false);
            console.log('log out');
          }}>
            Log out
          </Link> <Link className="showlink" to="/profile"> Profile </Link></div>
          : <div style={{float:'right'}}><Link className="showlink" to="/login" onClick={() => {
            console.log('log in');
          }}>
            Log in
          </Link></div>}
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
          <Route exact path="/profile" component={Profile} />
        </div>
      </div>
    </Router>
  );
}

export default App;
