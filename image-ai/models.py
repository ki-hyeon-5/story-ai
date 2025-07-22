from pydantic import BaseModel

class PromptRequest(BaseModel):
    prompt: str

class SceneRequest(BaseModel):
    previous_scenes: str
    user_instruction: str