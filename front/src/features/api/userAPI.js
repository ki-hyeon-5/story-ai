// src/features/api/userAPI.js
export async function registerUser({ name, email, password, phone }) {
  const response = await fetch('http://백엔드서버주소/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, phone }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '회원가입 실패');
  }

  return response.json();
}
