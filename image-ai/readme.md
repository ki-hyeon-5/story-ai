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
ComfyUI는 Python 의존성 충돌을 피하기 위해 가상환경에서 설치하는 것을 권장
하나의 가상환경을 따로 생성 후 사용
```bash
conda create -n comfyui python=3.12
conda activate comfyui
or
python -m venv comfyui-env
source comfyui-env/bin/activate
```

```bash
comfyui폴더 내의 의존성 설치
pip install -r requirements.txt
Cuda와 같은 GPU 사용 시 ComfyUI의 깃허브 공식 사이트를 참조하여 cuda torch 설치
 ```

### LLM API
```bash
LLM 관련 내용은 story-ai 프로젝트의 README.md 참고
```

### 필수 사항
LM Stdio 실행 필수 - `localhost:1234`에서 정상 작동 중해야 함
ComfyUI 서버 실행 - `localhost:8188`에서 서버가 실행 중이어야 함 

### FASTAPI 실행 방법
```bash
uvicorn main:app --reload
```
