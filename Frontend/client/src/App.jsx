import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './features/login/LoginPage';
import SignupPage from './features/signup/SignupPage';
import TrackPage from './features/track/TrackPage';
import HomePage from './features/home/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/track' element={<TrackPage/>} />
      </Routes>
    </Router>
  )
}

export default App