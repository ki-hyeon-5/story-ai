import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import '../../../../src/styles/LoginPage.css';
import Book_img from '../../assets/Book.png';

function LoginPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // 'login' 또는 'signup'

  const handleIconClick = () => {
    navigate('/');
  };

  return (
    <div className="login-page-container">
      <img src={Book_img} alt="Book_img" className="top-left-icon" onClick={handleIconClick} />
      <div className="login-box">
        <h1>Welcome StoryBook Creation</h1>
        <div className="login-tab-group">
          <button
            className={`login-tab-btn${activeTab === 'login' ? ' active' : ''}`}
            onClick={() => setActiveTab('login')}
            type="button"
          >
            로그인
          </button>
          <button
            className={`login-tab-btn${activeTab === 'signup' ? ' active' : ''}`}
            onClick={() => setActiveTab('signup')}
            type="button"
          >
            회원가입
          </button>
        </div>
        {activeTab === 'login' ? (
        <LoginForm />
        ) : (
          <SignUpForm onBackToLogin={() => setActiveTab('login')} />
        )}
      </div>
  </div>
  );
}

export default LoginPage;
