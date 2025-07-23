import React, { useState } from 'react';
import '../../../../src/styles/LoginForm.css';
import { useNavigate } from 'react-router-dom'; //

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); //

  const handleSubmit = (event) => {
    event.preventDefault();

    // 예: 아이디/비밀번호가 'test'/'test'면 무조건 통과
    if (username === 'admin' && password === 'admin') {
      navigate('/Homepage'); // 원하는 경로로 이동
      return;
    }

    if (username.trim() === '') {
      setErrorMessage('아이디를 입력하세요.');
    } else if (password.trim() === '') {
      setErrorMessage('비밀번호를 입력하세요.');
    } else {
      setErrorMessage('');
      // 로그인 성공 시 처리 로직 (예: API 호출, 페이지 이동 등)
      // console.log('로그인 시도:', { username, password });
    }
  };

  return (
    <div className="login-form" style={{ marginTop: '50px' }}>
      <h2></h2>
      <form onSubmit={handleSubmit}>
        <div className="merged-input-container">
          <div className='input-group'>
            <input
              type="text"
              id="username"
              name="username"
              className={`form-input ${username ? 'has-content' : ''}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor='username' className='floating-label'>아이디 또는 이메일</label>
          </div>
          <div className='input-group'>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${password ? 'has-content' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor='password' className='floating-label'>비밀번호</label>
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="login-btn-row">
          <button type="submit" className="login-btn">로그인</button>
          <button
            type="button"
            className="find-btn"
            onClick={() => {
              alert('아이디/비밀번호 찾기 기능은 준비 중입니다.');
            }}
          >
            아이디/비밀번호 찾기
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;