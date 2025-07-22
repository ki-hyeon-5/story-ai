import requests
import re

LLM_API_URL = "http://localhost:1234/v1/chat/completions"
HEADERS = {"Content-Type": "application/json"}

system_prompt = """
따뜻하고 감성적인 동화를 쓰는 작가.
이야기 전체를 6개의 장면(문단)으로 나눠서 작성.
각 장면은 [Scene 1], [Scene 2] 같은 태그로 시작하고, 한 장면에는 한 문단만 자연스럽게 작성.
"""

animal_keywords = ['토끼', '호랑이', '곰', '사자', '여우', '고양이', '강아지', '쥐', '새', '코끼리', '사슴', '거북이', '다람쥐', '늑대']

def is_animal_story(prompt: str) -> bool:
    return any(animal in prompt for animal in animal_keywords)

def get_next_scene_number(text: str) -> int:
    matches = re.findall(r"\[Scene (\d+)\]", text)
    return int(matches[-1]) + 1 if matches else 1

def request_story(user_prompt: str) -> str:
    payload = {
        "model": "story-1-llama-3-8b",
        "messages": [{"role": "user", "content": f"{system_prompt.strip()}\n\n{user_prompt}"}],
        "temperature": 0.5,
        "top_k": 40,
        "repetition_penalty": 1.55,
        "top_p": 0.85,
        "min_p": 0.05,
        "max_tokens": 1500
    }
    res = requests.post(LLM_API_URL, headers=HEADERS, json=payload)
    res.raise_for_status()
    return res.json()["choices"][0]["message"]["content"]

def request_next_scene(prev_scenes: str, instruction: str, scene_num: int) -> str:
    prompt = f"""
아래는 지금까지의 이야기
{prev_scenes}

사용자가 이번 장면에서 반드시 일어나길 원하는 사건.
"{instruction}"

이 내용을 바탕으로 [Scene {scene_num}] 이어지는 이야기 작성.
""".strip()

    payload = {
        "model": "story-1-llama-3-8b",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.5,
        "top_k": 40,
        "repetition_penalty": 1.55,
        "top_p": 0.85,
        "min_p": 0.05,
        "max_tokens": 500
    }
    res = requests.post(LLM_API_URL, headers=HEADERS, json=payload)
    res.raise_for_status()
    return res.json()["choices"][0]["message"]["content"].strip()