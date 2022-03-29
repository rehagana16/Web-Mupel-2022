import React from "react";
import LoginPage from "./components/LoginPage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Link
} from 'react-router-dom';
import RegistrationPage from "./components/RegistrationPage";
// import ParticipationList from "./components/ParticipationList";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< LoginPage />}></Route>
        <Route exact path='/registration' element={< RegistrationPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
