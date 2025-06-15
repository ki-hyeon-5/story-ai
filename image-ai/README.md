# StoryAI - 이미지 생성 AI 모듈

이 프로젝트는 **StoryAI** 시스템의 일부로, 텍스트 기반 스토리에서 이미지를 생성하는 AI 모듈입니다.  
사용자는 이야기의 한 장면을 설명하면, 해당 내용을 시각적으로 표현한 이미지를 자동으로 생성할 수 있습니다.

## 🧠 담당 파트: 이미지 생성 AI

본 저장소는 이미지 생성 기능을 담당하며, **ComfyUI** 기반으로 구현되었습니다.

---

## ⚙️ 기술 스택

- **ComfyUI** (이미지 생성 파이프라인)
- **Python**
- **Conda** (가상 환경 관리)

> `requirements.txt`는 ComfyUI에서 제공된 파일을 그대로 사용합니다.

---

## 🚀 실행 방법

1. Conda 환경 생성 및 활성화:
   ```bash
   conda create -n storyai python=3.10
   conda activate storyai

2. 의존성 설치:

   ```
   pip install -r requirements.txt

   이미지 생성 실행: python generate.py
   ```
## 📦 주의 사항

이미지 생성에 필요한 LoRA 파일과 기본 모델(.ckpt 또는 .safetensors 등) 은 용량 문제로 인해 저장소에 포함되지 않았습니다.

경로 설정이 필요한 경우 generate.py 내에서 조정이 필요할 수 있습니다.