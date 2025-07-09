import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import App from './App'; // App 컴포넌트 임포트

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/entry" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;