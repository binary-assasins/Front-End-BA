import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './components/home.js';
import Login from "./components/login.js";
import Register from "./components/register.js"; 

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Register}  />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
      </Router>
    </div>
  );
}

export default App;
