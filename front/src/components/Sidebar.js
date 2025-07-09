import React from 'react';
import PencilIcon from '../features/assets/pencil.png';
import TrashIcon from '../features/assets/trash.png';

function Sidebar({
  isSidebarOpen,
  handleNewStory,
  handleNewImage,
  stories,
  handleViewStory,
  handleEditStory,
  handleDeleteStory
}) {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="logo"></div>
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
  );
}

export default Sidebar;
