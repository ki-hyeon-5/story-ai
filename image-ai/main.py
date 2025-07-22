from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import re

from models import PromptRequest, SceneRequest
from llm import is_animal_story, get_next_scene_number, request_story, request_next_scene
from comfy import generate_image, image_dir

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/images", StaticFiles(directory=image_dir), name="images")

@app.post("/generate_story_with_images")
def generate_story_with_images(req: PromptRequest):
    user_input = req.prompt.strip()
    is_animal = is_animal_story(user_input)

    story = request_story(user_input)
    scenes = re.findall(r"\[Scene \d+\](.*?)(?=\[Scene \d+\]|$)", story, re.DOTALL)

    results = []
    for idx, scene in enumerate(scenes):
        text = scene.strip()
        image_info = generate_image(text, idx, is_animal)
        results.append({
            "scene": f"Scene {idx+1}",
            "text": text,
            "image_info": image_info
        })

    return {"story": story, "results": results}

@app.post("/generate_next_scene")
def generate_next_scene(req: SceneRequest):
    scene_num = get_next_scene_number(req.previous_scenes)
    is_animal = is_animal_story(req.previous_scenes + req.user_instruction)
    scene_text = request_next_scene(req.previous_scenes, req.user_instruction, scene_num)
    image_info = generate_image(scene_text, scene_num - 1, is_animal)

    return {
        "scene_number": scene_num,
        "scene_text": scene_text,
        "image_info": image_info
    }