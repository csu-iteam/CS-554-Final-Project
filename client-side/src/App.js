import Login from './User/Login';
import Register from './User/Register';
import Home from './Components/Home';
import Profile from './User/Profile';
import MakeNewPost from './User/MakeNewPost';
import MyPost from './User/MyPost';
import ChatApp from './Chat/ChatApp';
import Post from './Components/Post';

import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import cookie from 'react-cookies'

function App() {
  const [currentLogin, SetCurrentLogin] = useState(false);
  const [currentEmail, SetCurrentEmail] = useState('');
  let current_email;
  useEffect(() => {
    console.log('on load useeffect');
    async function fetchData() {
      try {
        current_email = cookie.load('current_email');
        if (current_email) {
          SetCurrentLogin(true);
          SetCurrentEmail(current_email);
        } else {
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
          <h1 className='website-title'>
            Secondary Market
        </h1>
          <Link className="showlink" id="home-btn" to="/">
            Home
          </Link>
          {/* TODO: when user logged in, display profile button and log out button. 
          Otherwise, display log in button without profile button */}
          {/* <Link className="showlink" to="/profile">
            Profile
          </Link> */}

          {currentLogin === true ? <div style={{ float: 'right' }}>
            <Link className="showlink" to="/" onClick={() => {
              cookie.remove('current_email');
              SetCurrentLogin(false);
              console.log('log out');
            }}>
              Log out
          </Link> <Link className="showlink" to="/profile"> Profile </Link>
            <Link className="showlink" to={`/makenewpost/${currentEmail}`}> New Post </Link>
            {/* <Link className="showlink" to="/makenewpost"> New Post </Link> */}
            <Link className="showlink" to={`/mypost/${currentEmail}`}> My Posts </Link>
            <Link className="showlink" to="/chat">Chat</Link></div>
            : <div style={{ float: 'right' }}><Link className="showlink" to="/login" onClick={() => {
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
          <Route exact path="/makenewpost/:currentEmail" component={MakeNewPost} />
          <Route exact path="/mypost/:currentEmail" component={MyPost} />
          <Route exact path="/chat" component={ChatApp} />
          <Route exact path="/post/:id" component={Post} />
        </div>
      </div>
    </Router>
  );
}

export default App;
