### python 패키지 설치
```bash
pip install -r requirements.txt
```

### comfyui 설치
```bash
https://github.com/comfyanonymous/ComfyUI.git

comfy.py 에
image_dir = "comfyui/output" comfyui 폴더 경로 설정 (output 경로)

모델과 로라는 용량 제한으로 인해 GOOGLE DRIVE에 따로 작성 예정
```

### LLM API
```bash
story-ai Readme.md 참조
```

### 필수 사항
```bash
LM Stdio 실행 필수 - `localhost:1234` 에서 실행 중이어야 함
ComfyUI 서버 실행 - `localhost:8188`에서 서버가 실행 중이어야 함 

### FASTAPI 실행
```bash
uvicorn main:app --reload
```
