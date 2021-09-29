import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectsInfo from './pages/ProjectsInfo';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact strict path="/" component={Home} />
          <Route exact path="/:username" component={Projects} />
          <Route exact path="/:username/:projectname" component={ProjectsInfo} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
