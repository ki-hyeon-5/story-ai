import os
import sys
import logging

# 1. comfyui 경로 추가
COMFYUI_PATH = os.path.join(os.path.dirname(__file__), "comfyui")
sys.path.append(COMFYUI_PATH)

# 2. 로깅 설정
logging.basicConfig(level=logging.INFO)

# 3. comfyui 모듈 가져오기
from main import start_comfyui
import comfyui_version
import folder_paths  # <- 경로 설정을 위해 사용

# 4. 커스텀 경로 설정 함수
def register_custom_paths():
    root_dir = os.path.dirname(__file__)

    # lora 폴더 등록
    folder_paths.add_model_folder_path("loras", os.path.join(root_dir, "lora"))

    # 워크플로우 저장 경로 등록 (편의용, 실제 실행에는 영향 X)
    os.makedirs(os.path.join(root_dir, "workflows"), exist_ok=True)
    folder_paths.set_output_directory(os.path.join(root_dir, "outputs"))

    logging.info("📁 커스텀 경로 등록 완료")


if __name__ == "__main__":
    logging.info(f"🚀 Starting ComfyUI (version: {comfyui_version.__version__})")

    # 커스텀 경로 등록
    register_custom_paths()

    # ComfyUI 서버 실행
    event_loop, _, start_all_func = start_comfyui()

    try:
        event_loop.run_until_complete(start_all_func())
    except KeyboardInterrupt:
        logging.info("🛑 ComfyUI 서버 종료됨")