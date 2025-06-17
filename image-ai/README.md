## 🧠 담당 파트: 이미지 생성 AI

- 본 저장소는 이미지 생성 기능을 담당하며, **ComfyUI**를 기반으로 구축되었습니다.
- 사용자는 미리 구성된 워크플로우와 LoRA 조합을 통해 동화 스타일의 이미지를 생성할 수 있습니다.

---

## ⚙️ 기술 스택

- **Python 3.12.7**  
- **ComfyUI**
- **Conda (Anaconda 24.9.2)**
- **CUDA 12.7** (GPU 가속 시 사용)

> `requirements.txt`는 ComfyUI 기본 제공 파일을 그대로 사용하며, 커스텀 노드는 별도 설치됩니다.

---

## 🧩 디렉토리 구조

```
image-generator/
├── comfyui/                    # ComfyUI 전체 소스코드 (필수, 위치 고정)
├── generate.py                 # 이미지 생성 실행 스크립트
├── lora/                       # LoRA 모델(.safetensors)
├── workflows/                  # 이미지 생성 워크플로우(JSON)
├── prompts/                    # 프롬프트 예시 텍스트
├── screenshots/                # 생성된 이미지 예시
└── lora_models/README.md       # 사용된 LoRA 모델 설명
```

> ⚠️ `comfyui/`는 반드시 `image-generator/` 내에 위치해야 합니다.  
> 내부 코드(`generate.py`)에서 상대경로로 import하고 있으므로, 위치가 달라지면 실행되지 않습니다.

---

## 🔥 Conda 가상환경 설정

본 프로젝트는 **Conda 가상환경 `comfy`**에서 실행되었습니다.

### 1. Conda 환경 생성 및 활성화

```bash
conda create -n comfy python=3.12
conda activate comfy
```

### 2. 의존성 설치

```bash
pip install -r comfyui/requirements.txt
```

> ⚠️ PyTorch는 반드시 **CUDA 지원 버전**으로 설치해야 합니다:

```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

---

## 📦 주의 사항

- 이미지 생성에 필요한 `.ckpt`, `.safetensors`, LoRA 파일은 **저장소에 포함되어 있지 않습니다.**
- `generate.py`의 경로 설정은 `comfyui/` 디렉토리를 기준으로 하므로 절대경로 변경 시 주의가 필요합니다.
- GPU 사용을 위해 CUDA가 설치되어 있어야 하며, PyTorch도 CUDA 버전으로 설치되어야 합니다.
