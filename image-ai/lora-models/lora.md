# 🧸 사용된 LoRA 목록 (LoRA Models Used)

이 프로젝트에서는 동화 스타일의 이미지 생성을 위해 아래 3개의 LoRA를 사용했습니다.  
모든 LoRA는 [Civitai](https://civitai.com/)에서 다운로드받아 ComfyUI 환경에서 적용되었습니다.

---

## 1. [Cute Animal LoHA - SDXL](https://civitai.com/models/132819/cute-animal-loha-sdxl)

- **LoRA 파일명:** `cute-animal-loha.safetensors`
- **용도:** 귀엽고 아기자기한 동물 캐릭터 표현
- **주요 특징:**
  - 수채화 느낌의 귀여운 동물 묘사에 최적화
  - 어린이 동화책 스타일과 잘 어울림
- **버전:** LoHA for SDXL

---

## 2. [Picture Books - Children Cartoon](https://civitai.com/models/176435/picture-books-children-cartoon)

- **LoRA 파일명:** `picture-book-cartoon.safetensors`
- **용도:** 전반적인 동화책 삽화 스타일 묘사
- **주요 특징:**
  - 부드러운 색감과 카툰 렌더링 표현에 강함
  - 아이들을 위한 동화 장면 구성에 적합
- **버전:** Children Cartoon LoRA

---

## 3. [Children Illustration LoRA](https://civitai.com/models/510261?modelVersionId=567119)

- **LoRA 파일명:** `children-illustration.safetensors`
- **용도:** 사람 캐릭터, 배경의 일러스트 풍 표현
- **주요 특징:**
  - 아이와 배경이 어우러진 동화적 장면 묘사
  - pastel tone, 따뜻한 배경 중심
- **버전 ID:** 567119

---

## 📂 적용 방법

모든 LoRA 파일은 `image-generator/lora/` 경로에 저장되어 있으며, ComfyUI의 `LoraLoader` 노드를 통해 순차적으로 적용됩니다.  

---

## ❗ 저작권 안내

모든 LoRA는 각 제작자의 라이선스 정책을 준수하여 비상업적 목적으로 사용되었습니다.  
라이선스는 Civitai 페이지의 개별 모델 설명을 참고해 주세요.