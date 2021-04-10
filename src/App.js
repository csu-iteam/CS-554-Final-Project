import Login from './User/Login';
import Register from './User/Register';
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
          <Link className="showlink" to="/login">
            Log in
          </Link>
        </header>
        <br />
        <br />
        <div className="App-body">
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
      </div>
    </Router>
  );
}

export default App;
