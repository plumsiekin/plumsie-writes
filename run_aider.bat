@echo off
set MISTRAL_API_KEY=ZKT09pBgxlpAKiGg2VOTGdbD0bmHJeHz

:: Tracks your 256k context size AND forces the faster diff patch method
uv run --python 3.12 --with aider-chat aider --model mistral/codestral-latest --model-metadata-file .aider.model.metadata.json --edit-format diff

pause