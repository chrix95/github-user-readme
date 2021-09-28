import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Projects from './components/Projects';
import ProjectsInfo from './components/ProjectsInfo';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/:username" component={Projects} />
        <Route exact path="/:username/:projectname" component={ProjectsInfo} />
      </Router>
    </>
  );
}

export default App;
