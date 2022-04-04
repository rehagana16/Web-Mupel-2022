import React from "react";
import LoginPage from "./components/LoginPage";
import Pengumuman from "./components/Pengumuman";
import DataPeserta from "./components/DataPeserta";

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
        <Route path='/registration' element={< RegistrationPage />}></Route>
        <Route path='/pengumuman' element={< Pengumuman />}></Route>
        <Route path='/dataPeserta' element={< DataPeserta />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
