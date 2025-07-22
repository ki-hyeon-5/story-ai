import requests
import json
import os
import time

LLM_API_URL = "http://localhost:1234/v1/chat/completions"
HEADERS = {"Content-Type": "application/json"}
image_dir = "comfyui/output"

def extract_image_prompt(scene_text: str) -> str:
    prompt_guide = """
You are a prompt engineer for a children's book illustration system.
Convert the following Korean scene into an English image prompt.
Guidelines:
- Only use realistic animal behavior. No human-like actions (e.g., no "holding hands", "hugging", "smiling").
- Describe one animal per scene clearly. Do not include humans or anthropomorphic features.
- Do not describe human body parts like hands, fingers, faces, etc.
- Use natural animal behavior only (e.g., hopping, sitting, swimming, walking).
- Always include illustration style: "children's book, pastel, watercolor".
- The prompt should be one clear English sentence. No explanation or markdown.
"""
    full_prompt = f"{prompt_guide}\n\n{scene_text.strip()}"
    payload = {
        "model": "story-1-llama-3-8b",
        "messages": [{"role": "user", "content": full_prompt}],
        "temperature": 0.3,
        "top_k": 30,
        "repetition_penalty": 1.3,
        "top_p": 0.9,
        "max_tokens": 100
    }
    try:
        res = requests.post(LLM_API_URL, headers=HEADERS, json=payload)
        res.raise_for_status()
        return res.json()["choices"][0]["message"]["content"].strip()
    except Exception as e:
        print(f"프롬프트 생성 실패: {e}")
        return "a rabbit in a forest, children's book, pastel, watercolor"

def wait_for_image(target_hint, timeout=20, interval=0.5):
    start_time = time.time()
    while time.time() - start_time < timeout:
        files = [f for f in os.listdir(image_dir) if target_hint in f and f.endswith(".png")]
        if files:
            return max(files, key=lambda x: os.path.getmtime(os.path.join(image_dir, x)))
        time.sleep(interval)
    return None

def generate_image(scene_text: str, scene_index: int, is_animal: bool) -> dict:
    prompt_text = extract_image_prompt(scene_text)
    print(f"\nScene {scene_index+1} 프롬프트: {prompt_text}")

    with open("1.json", "r", encoding="utf-8") as f:
        workflow = json.load(f)

    timestamp = int(time.time() * 1000)
    filename_prefix = f"scene_{scene_index+1}_{timestamp}"

    workflow["6"]["inputs"]["text"] = prompt_text
    workflow["7"]["inputs"]["text"] = (
        "realistic, 3d, photo, photographic, nude, ugly, deformed, disfigured, lowres, "
        "bad anatomy, extra limbs, missing eyes, blurry, distorted, bad proportions, "
        "poorly drawn face, bad hands, mutated, text, watermark, logo, signature, glitch, "
        "horror, scary, dark, monochrome, clothes, human hands, human body, anthropomorphic, suit, dress, "
        "extra fingers, fused fingers, cloned face, long neck, broken limbs, mutated body, duplicate limbs, "
        "extra arms, malformed hands, cropped, jpeg artifacts, bad feet, low quality, blurry background, noisy"
    )
    workflow["9"]["inputs"]["filename_prefix"] = filename_prefix

    try:
        res = requests.post("http://localhost:8188/prompt", json={"prompt": workflow})
        res.raise_for_status()
    except Exception as e:
        print(f"ComfyUI 요청 실패: {e}")
        return {"image_url": "Not found", "image_prompt": prompt_text}

    image_name = wait_for_image(filename_prefix)
    image_url = f"http://localhost:8000/images/{image_name}" if image_name else "Not found"
    return {"image_url": image_url, "image_prompt": prompt_text}