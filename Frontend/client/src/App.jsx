import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './features/login/LoginPage';
import HomePage from './features/home/HomePage';
import CompliancePage from './features/compliance/CompliancePage';
import ShippingEstimator from './features/priceEstimation/PriceEstimation';
import { ThemeProvider } from './components/main/theme'
import Navbar from './components/main/navbar'
import { Ship } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-7xl mx-auto ">
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
            <Route path='/estimate' element={<ShippingEstimator/>}/>
            <Route path='/compliance' element={<CompliancePage/>}/>
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App