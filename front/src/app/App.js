import React, { useState } from 'react';
import './App.css';
import Book from '../features/assets/Book.png';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProfileMenu from '../components/ProfileMenu';
import Chat from '../components/Chat';
import Prompt from '../components/Prompt';
import Alert from '../components/Alert';


function App() {
  const [storyContent, setStoryContent] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentView, setCurrentView] = useState('default');
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [stories, setStories] = useState([]);
  const [editingStoryId, setEditingStoryId] = useState(null);
  const navigate = useNavigate();

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
      if (!data.story && !data.imageUrl) {
        throw new Error('서버에서 예상치 못한 응답을 받았습니다.');
      }
      const assistantMessage = {
        type: 'assistant',
        content: currentView === 'image' ? data.imageUrl : data.story,
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
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
    setIsProfileOpen(false);
  };

  const handleLoginClick = () => {
    setIsProfileOpen(false);
    navigate('/login');
  };

  const handleNewStory = () => {
    setCurrentView('story');
    setStoryContent('');
    setMessages([]);
    setIsProfileOpen(false);
  };

  const handleNewImage = () => {
    setCurrentView('image');
    setStoryContent('');
    setMessages([]);
    setIsProfileOpen(false);
  };

  const handleEditStory = (storyId) => {
    const story = stories.find(s => s.id === storyId);
    if (story) {
      setStoryContent(story.content);
      setEditingStoryId(storyId);
      setCurrentView('story');
    }
  };

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

  const handleDeleteStory = (storyId) => {
    setStories((prevStories) => prevStories.filter(story => story.id !== storyId));
    showCustomAlert('동화가 삭제되었습니다.');
  };

  // 로그인 처리 예시 (실제 인증 연동 필요)
  const handleLogin = (email, password) => {
    showCustomAlert(`로그인 시도: ${email}`);
    // 실제 로그인 로직 추가 가능
  };

  return (
    <div className="app-container">
      <Alert showAlert={showAlert} alertMessage={alertMessage} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleNewStory={handleNewStory}
        handleNewImage={handleNewImage}
        stories={stories}
        handleViewStory={handleViewStory}
        handleEditStory={handleEditStory}
        handleDeleteStory={handleDeleteStory}
      />
      <button className="toggle-button" onClick={toggleSidebar}>
        <img src={Book} alt="Toggle Sidebar" className="toggle-icon"/>
      </button>
      <div className="main">
        <ProfileMenu
          isProfileOpen={isProfileOpen}
          toggleProfile={toggleProfile}
          handleMyPage={handleMyPage}
          handleLoginClick={handleLoginClick}
                navigate={navigate}
        />
        
        <div className="content">
          {currentView === 'chat' ? (
            <Chat messages={messages} isLoading={isLoading} currentView={currentView} />
          ) : (
            <h1>{currentView === 'image' ? '동화 내용을 입력하여 이미지를 생성해 보세요!' : '세상에서 하나뿐인 당신만의 동화책을 생성해 보세요!'}</h1>
          )}
        </div>
        <Prompt
          storyContent={storyContent}
          setStoryContent={setStoryContent}
          isLoading={isLoading}
          currentView={currentView}
          handleImageGeneration={handleImageGeneration}
        />
      </div>
    </div>
  );
}

export default App;
