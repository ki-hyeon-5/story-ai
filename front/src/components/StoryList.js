import React, { useState, useEffect } from 'react';
    
     // StoryList 컴포넌트 정의
     const StoryList = () => {
       // 동화 목록을 저장할 상태 (초기값은 빈 배열)
       const [stories, setStories] = useState([]);
       // 로딩 상태를 관리할 상태 (초기값은 true)
       const [loading, setLoading] = useState(true);
       // 에러 상태를 관리할 상태 (초기값은 null)
      const [error, setError] = useState(null);
   
      // 컴포넌트가 마운트될 때 한 번만 실행되는 useEffect
      useEffect(() => {
        // 백엔드 API에서 데이터를 가져오는 비동기 함수
        const fetchStories = async () => {
          try {
            // API 호출 (엔드포인트는 실제 백엔드 주소로 변경)
            const response = await fetch('/api/stories'); //예) http://localhost:8080/api/stories
   
            // 응답이 성공적이지 않으면 에러를 발생시킴
            if (!response.ok) {
              throw new Error('데이터를 불러오는 데실패했습니다.');
            }
   
            // 응답 데이터를 JSON 형태로 파싱
            const data = await response.json();
            // 받아온 데이터로 stories 상태 업데이트
            setStories(data);
          } catch (err) {
            // 에러가 발생하면 error 상태에 에러 메시지 저장
            setError(err.message);
          } finally {
            // 데이터 로딩이 완료되면 loading 상태를 false로변경
            setLoading(false);
          }
        };
   
        // 데이터 가져오는 함수 호출
        fetchStories();
      }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될때만 실행되도록 함
   
      // 로딩 중일 때 표시할 UI
      if (loading) {
        return <div>로딩 중...</div>;
      }
   
      // 에러가 발생했을 때 표시할 UI
      if (error) {
        return <div>에러: {error}</div>;
      }
   
      // 성공적으로 데이터를 가져왔을 때 표시할 UI
     return (
        <div>
          <h2>동화 목록</h2>
          <ul>
            {stories.map(story => (
              <li key={story.id}>{story.title}</li>
            ))}
          </ul>
        </div>
      );
    };
  export default StoryList;