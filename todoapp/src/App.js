import { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './App.css';

import Header from './components/header';
import Home from './components/home';

function App() {

  const todoList = []

  const inProgressList = []

  const finishList = []

  const [appState, updateAppState] = useState({
    todo: todoList,
    inProgress: inProgressList,
    finish: finishList,
  });

  return (
    <Router>
      <Header />
      <hr />
      <Home appState={appState} />
    </Router>
  );
}

export default App;
