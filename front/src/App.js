import React, { useState } from 'react';
import './App.css';
import Book from './assets/Book.png';
import DefaultProfile from './assets/default-profile.png';
import PencilIcon from './assets/pencil.png';
import TrashIcon from './assets/trash.png';

function App() {
  const [storyContent, setStoryContent] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentView, setCurrentView] = useState('default');
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null); // 에러 상태 추가
  const [stories, setStories] = useState([]); // 생성된 동화 목록을 저장할 상태
  const [editingStoryId, setEditingStoryId] = useState(null); // 수정 중인 동화의 ID

  /*
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "용감한 토끼의 모험",
      content: "한 마을에 작은 토끼가 살고 있었습니다. 이 토끼는 다른 토끼들과 달리 항상 모험을 꿈꾸었습니다. 어느 날, 토끼는 마을을 떠나 먼 곳으로 여행을 떠나기로 결심했습니다...",
      date: "2024-03-15"
    },
    {
      id: 2,
      title: "마법의 나무 이야기",
      content: "숲 속 깊은 곳에 마법의 나무가 있었습니다. 이 나무는 매일 밤 반짝이는 열매를 맺었고, 그 열매를 먹은 동물들은 특별한 능력을 얻게 되었습니다...",
      date: "2024-03-14"
    },
    {
      id: 3,
      title: "친구가 된 늑대와 양",
      content: "한 마리의 늑대가 양을 잡아먹으려고 했습니다. 하지만 양의 순수한 마음에 늑대는 마음이 바뀌었고, 그들은 서로를 이해하는 친구가 되었습니다...",
      date: "2024-03-13"
    }
  ]);
  const [editingStoryId, setEditingStoryId] = useState(null);
  */

  const showCustomAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleImageGeneration = async () => {
    if (!storyContent.trim()) return;

    const userMessage = {
      type: 'user',
      content: storyContent,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setStoryContent('');
    setCurrentView('chat');

    setIsLoading(true);
    setError(null);

    try {
      console.log('API 호출 시작:', storyContent);
      
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          prompt: storyContent,
          type: currentView === 'image' ? 'image' : 'story'
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('API 응답 에러:', errorData);
        let errorMessage;
        try {
          const errorJson = JSON.parse(errorData);
          errorMessage = errorJson.detail || errorData;
        } catch {
          errorMessage = errorData;
        }
        const fullErrorMessage = `서버 오류 (${response.status}): ${errorMessage}`;
        showCustomAlert(fullErrorMessage);
        setError(fullErrorMessage);
        throw new Error(fullErrorMessage);
      }

      const data = await response.json();
      console.log('API 응답 성공:', data);

      if (!data.story && !data.imageUrl) {
        throw new Error('서버에서 예상치 못한 응답을 받았습니다.');
      }

      const assistantMessage = {
        type: 'assistant',
        content: currentView === 'image' ? data.imageUrl : data.story,
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      // 동화가 생성되면 목록에 추가
      if (currentView === 'story') {
        const newStory = {
          id: Date.now(),
          title: storyContent.slice(0, 30) + '...',
          content: data.story,
          date: new Date().toLocaleDateString(),
        };
        setStories((prevStories) => [newStory, ...prevStories]);
      }
      
    } catch (err) {
      console.error('API 호출 상세 에러:', err);
      const errorMessage = err.message || '서버와 통신 중 오류가 발생했습니다.';
      showCustomAlert(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleMyPage = () => {
    console.log('마이페이지 클릭');
    // 마이페이지 이동 로직 추가
    setIsProfileOpen(false); // 드롭다운 닫기
  };

  const handleLogout = () => {
    console.log('로그아웃 클릭');
    // 로그아웃 로직 추가
    setIsProfileOpen(false); // 드롭다운 닫기
  };

  const handleNewStory = () => {
    setCurrentView('story');
    setStoryContent('');
    setMessages([]);
    setIsProfileOpen(false); // 드롭다운 닫기
  };

  const handleNewImage = () => {
    setCurrentView('image');
    setStoryContent('');
    setMessages([]);
    setIsProfileOpen(false); // 드롭다운 닫기
  };

  // 동화 수정 함수
  const handleEditStory = (storyId) => {
    const story = stories.find(s => s.id === storyId);
    if (story) {
      setStoryContent(story.content);
      setEditingStoryId(storyId);
      setCurrentView('story');
    }
  };

  // 동화 내용 보기 함수 추가
  const handleViewStory = (storyId) => {
    const story = stories.find(s => s.id === storyId);
    if (story) {
      setMessages([
        { type: 'user', content: story.title },
        { type: 'assistant', content: story.content }
      ]);
      setCurrentView('chat');
    }
  };

  // 동화 삭제 함수
  const handleDeleteStory = (storyId) => {
    setStories((prevStories) => prevStories.filter(story => story.id !== storyId));
    showCustomAlert('동화가 삭제되었습니다.');
  };

  return (
    <div className="app-container">
      {showAlert && (
        <div className="custom-alert">
          <div className="alert-content">
            {alertMessage.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="logo">
          {/* <img src={logo} alt="Storybook Creation Logo" /> 로고 이미지 제거 */}
        </div>
        <div className="sidebar-icons">
          <button className="icon-button new-chat" onClick={handleNewStory}>
            <span className="icon">+</span>
            <span className="label">새로운 동화 생성</span>
          </button>
          <button className="icon-button new-image" onClick={handleNewImage}>
            <span className="icon">🖼️</span>
            <span className="label">이미지 생성</span>
          </button>
          <div className="history-section">
            <div className="history-header">
              <span className="icon"></span>
              <span className="label">- 동화 목록 -</span>
            </div>
            <div className="history-list">
              {stories.length === 0 ? (
                <div className="history-item">
                  <span className="history-title">생성된 동화가 없습니다</span>
                  <span className="history-date">-</span>
                </div>
              ) : (
                stories.map((story) => (
                  <div key={story.id} className="history-item" onClick={() => handleViewStory(story.id)}>
                    <span className="history-title">{story.title}</span>
                    <span className="history-date">{story.date}</span>
                    <div className="action-buttons">
                      <button 
                        className="action-button edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditStory(story.id);
                        }}
                      >
                        <img src={PencilIcon} alt="수정" />
                      </button>
                      <button 
                        className="action-button delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteStory(story.id);
                        }}
                      >
                        <img src={TrashIcon} alt="삭제" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <button className="toggle-button" onClick={toggleSidebar}>
        <img src={Book} alt="Toggle Sidebar" className="toggle-icon"/>
      </button>
      <div className="main">
        <div className="profile-menu-container">
          {/* 기존 toggle-button 대신 user-menu-button 사용 */}
          <button className="user-menu-button" onClick={toggleProfile}>
            <img src={DefaultProfile} alt="Toggle Profile" className="user-icon"/>
          </button>
          {isProfileOpen && (
            <div className="user-dropdown show">
              <div className="dropdown-item" onClick={handleMyPage}>
                마이페이지
              </div>
              <div className="dropdown-item" onClick={handleLogout}>
                로그아웃
              </div>
            </div>
          )}
        </div>
        <div className="content">
          {currentView === 'chat' ? (
            <div className="chat-container">
              <div className="messages">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.type}`}>
                    <div className="message-content">
                      {message.type === 'assistant' && currentView === 'image' ? (
                        <img src={message.content} alt="Generated" className="generated-image" />
                      ) : (
                        <p>{message.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>생성 중입니다...</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <h1>{currentView === 'image' ? '동화 내용을 입력하여 이미지를 생성해 보세요!' : '세상에서 하나뿐인 당신만의 동화책을 생성해 보세요!'}</h1>
          )}
        </div>
        <footer className="prompt">
          <textarea
            placeholder={currentView === 'image' ? 
              "생성된 동화 내용을 입력하세요.(그에 맞는 이미지가 생성됩니다.)" : 
              "무엇이든 생성하고 싶은 동화책의 대략적인 시나리오를 입력해 주세요. (최소한 등장인물, 등장인물 수, 대략적인 줄거리, 원하는 결말의 방향성 등)"}
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
          ></textarea>
          <button 
            className={isLoading ? 'loading' : ''} 
            disabled={!storyContent || isLoading}
            onClick={handleImageGeneration}
          >
            {currentView === 'image' ? '이미지 생성' : '동화 생성'}
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App;
