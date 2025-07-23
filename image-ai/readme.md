## 1. 가상환경 생성 및 활성화

### Conda 환경
```bash
conda create -n comfyui python=3.12
conda activate comfyui
```

### 또는 venv 환경
```bash
python -m venv comfyui-env
source comfyui-env/bin/activate  # (Windows의 경우: comfyui-env\Scripts\activate)
```

---

## 2. ComfyUI 설치

### GitHub에서 클론
```bash
git clone https://github.com/comfyanonymous/ComfyUI.git
```

### 의존성 설치
```bash
pip install -r requirements.txt
```

- `comfy.py`에서 이미지 경로를 실제 ComfyUI 폴더의 output경로로 설정
```python
image_dir = "ComfyUI/output"
```

- **GPU 사용 시**: CUDA 또는 Intel 환경에 따라 아래 공식 문서 참고
https://github.com/comfyanonymous/ComfyUI#requirements-for-cuda

>  모델과 LoRA는 용량 문제로 Google Drive를 통해 별도 제공 예정

---

## 3. LLM API 연동

- LLM 관련 내용은 `story-ai` 프로젝트의 `README.md` 참고  
  (예: LLM 모델 실행, 프롬프트 설정 방식 등)

---

## 4. 필수 실행 조건

- **LM Studio 실행 중이어야 함**  
  → `http://localhost:1234`에서 정상 작동해야 함

- **ComfyUI 서버 실행**  
  → `http://localhost:8188` 접속 가능해야 함

---

## 5. FastAPI 실행 방법

```bash
uvicorn main:app --reload
