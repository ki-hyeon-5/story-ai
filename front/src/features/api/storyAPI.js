const API_BASE_URL = 'http://localhost:8000'; // 실제 API 주소로 변경

export const generateContent = async (prompt, type) => {
  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ prompt, type }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    let errorMessage;
    try {
      const errorJson = JSON.parse(errorData);
      errorMessage = errorJson.detail || errorData;
    } catch {
      errorMessage = errorData;
    }
    throw new Error(`서버 오류 (${response.status}): ${errorMessage}`);
  }

  return response.json();
};

// 다른 API 호출 함수들도 여기에 추가할 수 있습니다. 