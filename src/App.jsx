import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppHeader } from './components/app-header/app-header';
import { HomePage } from './page/home';
import { LoginPage } from './components/login/login';
import './App.css';

function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
