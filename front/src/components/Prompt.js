import React from 'react';

function Prompt({ 
  storyContent, 
  setStoryContent, 
  isLoading, 
  currentView, 
  handleImageGeneration 
}) {
  return (
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
  );
}

export default Prompt;
