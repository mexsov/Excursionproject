import { useState, useContext } from 'react'
import Header from './components/Header'
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './components/Homepage';
import  RegisterForm  from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PrivateRoute from "./components/routes/privateRoutes";
import UserDashboard from "./components/userDashboard/UserDashboard";

function App() {
  
  // const { user: authUser, logoutUser } = useContext(AuthContext); //kai bus Back'as


  return (
    <>
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />

        <Route path="/signup" element={<RegisterForm />} />
        <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
        </Routes>
      </Router>
    </>
  )
}

export default App
