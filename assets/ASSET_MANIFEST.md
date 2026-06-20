# Asset Manifest

웹 포트폴리오에서 재사용하는 정리본과 원본 추출 자료는 `assets` 아래에만 보관합니다.
기존 `outputs` 산출물은 동일 해시 확인 후 `assets`로 통합했습니다.

## Web-facing curated assets

- `assets/ppt_media/`
  - PPT template/source에서 추출한 원본 media 파일입니다.
  - template-inspect 단계에서 누락됐던 media 파일까지 보강한 보존본입니다.

## Source extraction archive

- `assets/source/ppt_text/`
  - `ppt_clean.txt`
  - `ppt_text_raw.txt`
  - PPT 원문 텍스트 추출본입니다.

- `assets/source/problem_solving_be_pptx_extract/`
  - `portfolio_problem_solving_be_extracted.md`
  - `portfolio_problem_solving_be_structured.md`
  - `portfolio_restructure_plan.md`
  - `figure_inventory*.json`
  - PPT 추출 결과와 figure inventory 메타데이터입니다.

- `assets/source/problem_solving_be_pptx_extract/figures/`
  - PPT에서 추출한 figure 중 도식, 사진, 아키텍처, 테이블, 차트, 코드 캡처처럼 재사용 가능한 실제 그림만 남긴 폴더입니다.
  - 단순 텍스트 블록으로 추출된 cover, key points, challenges, lessons learned 이미지는 제거했습니다.
  - 파일명은 `car-*`, `freight-*`, `dispatch-*`, `alpharouter-*`, `code-ai-*`, `agent-*`, `k8s-*` 기준으로 정리했습니다.

- `assets/source/problem_solving_be_pptx_extract/raw_media/`
  - PPT에서 추출한 원본 media 전체입니다.

- `assets/source/original_images/`
  - 포트폴리오 제작 과정에서 확보한 원본 이미지 보존 위치입니다.

## Presentation assets

- `assets/presentations/original/`
  - `김원준 포트폴리오 - 문제 해결 중심 BE_copy.pptx`
  - `김원준 포트폴리오 - BE 중점.pptx`
  - 원본/중간본 PPT 보존 위치입니다.

- `assets/presentations/problem-led-portfolio/`
  - `김원준 포트폴리오 - 문제 해결 중심 BE.pptx`
  - 재구성된 presentation output입니다.

- `assets/presentations/problem-led-portfolio/preview-final/`
  - 최종 PPT preview PNG입니다.

## Excluded from migration

다음 항목은 재사용 asset이 아니라 생성 과정의 작업 부산물이라 `assets`로 이관하지 않았습니다.

- `node_modules/`
- `layout/`
- `template-inspect/layouts/`
- probe / repair / refine 스크립트
- 중간 preview 디렉터리

## Top-level folder policy

- `assets/`: 웹 참조 파일, curated figure, PPT 보존본, 원본 추출 archive
- `_captures/`: 화면 검수용 screenshot
- `node_modules/`: 로컬 실행 의존성

새 산출물도 재사용 가치가 있으면 `assets/source/` 또는 `assets/presentations/` 아래로 넣고,
임시 실행 결과는 top-level에 새 `outputs` 폴더를 만들지 않습니다.
