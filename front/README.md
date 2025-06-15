# StoryBook UI/UX

필수 Node.js 설치,

### 1. 프론트엔드 (React)

*   **설치:** 프로젝트 루트에서 'npm install'
*   **실행:** `npm run start' -> `http://localhost:3000`에서 실행

### 2. 백엔드 (FastAPI)

*   **설치:** FastAPI 프로젝트 디렉토리 (`backend/` 등)로 이동 후, `pip install fastapi uvicorn python-dotenv "uvicorn[standard]"`
*   **실행:** `uvicorn main:app --reload --port 8000` -> `http://localhost:8000`에서 실행

## 🤖 AI 모델 통합

AI 모델 연동은 FastAPI 백엔드에서 연동 필요

### 1. AI API 키 등록

*   보안을 위해 `.env` 파일에 `YOUR_AI_API_KEY=YOUR_ACTUAL_API_KEY_HERE` 형식으로 저장하세요.
*   FastAPI 코드에서 `from dotenv import load_dotenv; load_dotenv(); ai_api_key = os.getenv("YOUR_AI_API_KEY")`를 사용해 로드합니다.

### 2. AI 모델 엔드포인트 (`/generate`) 형식

*   프론트엔드는 `http://localhost:8000/generate`로 `POST` 요청을 보냅니다.
*   **요청 형식:** `{"prompt": "사용자 입력 내용", "type": "story" 또는 "image"}`

### 3. 예상되는 응답 형식

*   **동화 생성 시:** `{"story": "생성된 동화 내용 텍스트"}`
*   **이미지 생성 시:** `{"imageUrl": "생성된 이미지의 직접 접근 가능한 URL"}`

**참고:** `imageUrl`은 브라우저에서 직접 접근 가능한 URL이어야 합니다. Base64 이미지 데이터는 FastAPI에서 URL로 변환
