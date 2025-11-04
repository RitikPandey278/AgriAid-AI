import React from 'react'
import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom'

import './App.css'
import Header from './Pages/Header/Header.jsx'
import Home from './Pages/Home/Home.jsx'
import DiseaseDetection from './Pages/DiseaseDetection/DiseaseDetection.jsx'
import WeatherAlerts from './Pages/WeatherAlerts/WeatherAlerts.jsx'
import ExpertSuggestions from './Pages/ExpertSuggestions/ExpertSuggestions.jsx'
import KnowledgeBase from './Pages/KnowledgeBase/KnowledgeBase.jsx'
import Login from './Pages/Login/Login.jsx'
import Signup from './Pages/Signup/Signup.jsx'
import Footer from './Pages/Footer/Footer.jsx'
import { Toaster } from 'react-hot-toast'

import ChatBotWidget from './Pages/ChatBoat/ChatBotWidget.jsx'
import { Toaster as SonnerToaster } from 'sonner'







function App() {
  

  return (
    <Router>
      <Header/>
      <Toaster position="top-right" reverseOrder={false}/>
      <SonnerToaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disease-detection" element={<DiseaseDetection />} />
        <Route path="/weather" element={<WeatherAlerts />} />
        <Route path="/suggestions" element={<ExpertSuggestions />} />
        <Route path="/knowledge-base" element={<KnowledgeBase/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer/>
      <ChatBotWidget/>
    
    </Router>
  )
}

export default App
