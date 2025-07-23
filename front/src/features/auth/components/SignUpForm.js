import React, { useState } from "react";
import { registerUser } from '../../api/userAPI'; // 경로는 실제 위치에 맞게 수정

function SignUpForm({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[\w.-]+@[\w-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^01[016789]-\d{3,4}-\d{4}$/; // 예: 010-1234-5678

    if (!email.trim()) {
      setErrorMessage("이메일을 입력하세요.");
    } else if (!emailRegex.test(email)) {
      setErrorMessage("올바른 이메일 형식을 입력하세요. (예: StoryBook@email.com)");
    } else if (!password.trim()) {
      setErrorMessage("비밀번호를 입력하세요.");
    } else if (!passwordCheck.trim()) {
      setErrorMessage("비밀번호 확인을 입력하세요.");
    } else if (password !== passwordCheck) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
    } else if (!phone.trim()) {
      setErrorMessage("휴대폰 번호를 입력하세요.");
    } else if (!name.trim()) {
      setErrorMessage("이름을 입력하세요.");
    } else if (!phoneRegex.test(phone)) {
      setErrorMessage("휴대폰 번호는 010-0000-0000 형식으로 입력하세요.");
    } else {
      setErrorMessage("");
      try {
        await registerUser({ name, email, password, phone });
        alert('회원가입이 완료되었습니다!');
        // 필요하다면 로그인 페이지로 이동 등 추가 처리
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="merged-input-container">
          <div className="input-group">
            <input
              type="text"
              id="email"
              name="email"
              className={`form-input ${email ? "has-content" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email" className="floating-label">이메일</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${password ? "has-content" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="floating-label">비밀번호</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              className={`form-input ${passwordCheck ? "has-content" : ""}`}
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <label htmlFor="passwordCheck" className="floating-label">비밀번호 확인</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${name ? "has-content" : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name" className="floating-label">이름</label>
          </div>
          <div className="input-group">
            <input
              type="text"
              id="phone"
              name="phone"
              className={`form-input ${phone ? "has-content" : ""}`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="phone" className="floating-label">휴대폰 번호</label>
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" style={{ marginTop: '20px' }}>회원가입</button>
      </form>
    </div>
  );
}

export default SignUpForm;