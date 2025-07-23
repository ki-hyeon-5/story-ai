import { useState, useCallback } from 'react';

const useStories = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 백엔드 API에서 동화 목록을 가져옵니다.
      const response = await fetch('/api/stories'); // 실제 API 엔드포인트로 수정
      if (!response.ok) {
        throw new Error('동화 목록을 불러오는 데 실패했습니다.');
      }
      const data = await response.json();
      setStories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addStory = useCallback(async (newStoryData) => {
    // 새로운 동화를 백엔드에 추가하는 로직 (필요 시 구현)
    // 예시:
    // const response = await fetch('/api/stories', { method: 'POST', body: JSON.stringify(newStoryData) });
    // const newStory = await response.json();
    // setStories(prev => [newStory, ...prev]);
    const newStory = {
      id: Date.now(),
      title: newStoryData.content.slice(0, 30) + '...',
      ...newStoryData,
      date: new Date().toLocaleDateString(),
    };
    setStories((prevStories) => [newStory, ...prevStories]);
  }, []);

  const deleteStory = useCallback(async (storyId) => {
    // 백엔드에서 동화를 삭제하는 로직 (필요 시 구현)
    // 예시:
    // await fetch(`/api/stories/${storyId}`, { method: 'DELETE' });
    setStories((prevStories) => prevStories.filter(story => story.id !== storyId));
  }, []);

  return { stories, isLoading, error, fetchStories, addStory, deleteStory };
};

export default useStories;
