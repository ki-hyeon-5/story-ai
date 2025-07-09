import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import '../../../../src/styles/LoginPage.css';
import zerodose_img from '../../assets/Book.png';

function LoginPage() {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate('/entry');
  };

  return (
    <div className="login-page-container">
      <img src={zerodose_img} alt="ZeroDose Logo" className="top-left-icon" onClick={handleIconClick} />
      <div className="login-box">
        <h1>Welcome StoryBook Creation</h1>
        <LoginForm />
      </div>
  </div>
  );
}

export default LoginPage;
