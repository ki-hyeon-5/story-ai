import React, { useState } from 'react';
import '../../../../src/styles/LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
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
    <div className="login-form">
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
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginForm;