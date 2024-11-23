import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './features/login/LoginPage';
import SignupPage from './features/signup/SignupPage';
import TrackPage from './features/track/TrackPage';
import HomePage from './features/home/HomePage';
import CompliancePage from './features/compliance/CompliancePage';
import PDFReader from './features/test/Test';
import ShippingEstimator from './features/priceEstimation/PriceEstimation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/track' element={<TrackPage/>} />
        <Route path='/compliance' element={<CompliancePage/>}/>
        <Route path="/estimation" element={<ShippingEstimator/>}/>
        <Route path='/test' element={<PDFReader/>}/>
      </Routes>
    </Router>
  )
}

export default App