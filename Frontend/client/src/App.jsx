import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './features/login/LoginPage';
import SignupPage from './features/signup/SignupPage';
import TrackPage from './features/track/TrackPage';
import HomePage from './features/home/HomePage';
import CompliancePage from './features/compliance/CompliancePage';
import PDFReader from './features/test/Test';
import ShippingEstimator from './features/priceEstimation/PriceEstimation';
import { ThemeProvider } from './components/main/theme'
import Navbar from './components/main/navbar'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path='/signup' element={<SignupPage/>} />
            <Route path='/track' element={<TrackPage/>} />
            <Route path='/compliance' element={<CompliancePage/>}/>
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App