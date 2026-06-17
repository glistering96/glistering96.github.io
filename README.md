# 김원준 Backend Portfolio

GitHub Pages로 배포하는 백엔드 포트폴리오 사이트입니다.

## Positioning

> AI 서비스를 운영 가능한 백엔드 시스템으로 만드는 엔지니어

이 사이트는 기존 PPT 포트폴리오를 프로젝트 나열형이 아니라 백엔드 case study 중심으로 재구성한 버전입니다.

## Sections

- Hero / Positioning
- Backend Capability Map
- Case 01. 자동차선 적부 최적화 Backend Service
- Case 02. Personal AI Agent Runtime Platform
- Case 03. Internal Kubernetes Platform for AI Services
- Case 04. Steel TMS MLOps Backend
- Performance Note. Freight Matching API Optimization
- Tech Stack
- Publications & Patents

## Local Preview

정적 HTML/CSS만 사용하므로 별도 빌드가 필요 없습니다.

```bash
python3 -m http.server 8000
```

브라우저에서 아래 주소로 확인합니다.

```text
http://localhost:8000
```

## GitHub Pages

이 repository는 user site 표준 이름인 `glistering96.github.io`입니다. repository가 public이고 Pages가 활성화되어 있으면 아래 주소로 배포됩니다.

```text
https://glistering96.github.io
```

## 공개 전 확인 필요

`SECURITY_REVIEW.md`를 기준으로 회사명, 내부 시스템명, 내부 IP, 상세 장애 원인, 미공개 특허/프로젝트 세부 내용이 공개 가능한 수준인지 확인해야 합니다.

## Editing Guide

- 메인 콘텐츠: `index.html`
- 스타일: `assets/css/styles.css`
- 404 페이지: `404.html`
- 공개 전 점검: `SECURITY_REVIEW.md`
