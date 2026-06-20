# 김원준 포트폴리오 - 문제 해결 중심 BE 정리본

이 문서는 `김원준 포트폴리오 - 문제 해결 중심 BE.pptx`에서 추출한 텍스트와 figure를 포트폴리오 서술 흐름에 맞게 다시 정리한 버전입니다.

원본 슬라이드별 전체 텍스트와 전체 figure index는 [`portfolio_problem_solving_be_extracted.md`](portfolio_problem_solving_be_extracted.md)에 보존되어 있습니다. 이 파일은 채용자 또는 리뷰어가 읽기 쉬운 형태로 핵심 프로젝트, 문제 해결 과정, 결과, 관련 figure를 연결하는 것을 목적으로 합니다.

## 1. Positioning

김원준은 물류 도메인의 복잡한 최적화 문제를 실제 운영 가능한 BE/ML 서비스로 만드는 엔지니어입니다.

핵심 메시지는 단순히 모델을 만들었다는 것이 아니라, 연구/모델/알고리즘 형태의 결과물을 기존 사내 시스템에서 호출 가능한 API 서비스와 운영 인프라로 연결했다는 점입니다.

대표적으로 자동차선 적부 계획 최적화 서비스에서는 장시간 실행되는 최적화 모델을 비동기 callback 구조로 감싸고, Kubernetes scale-out 환경에서 callback routing과 pod-local state 문제를 queue, Redis, service routing 구조로 해결했습니다. 철강 복화 운송 매칭에서는 brute-force 탐색 문제를 pandas self-merge와 boolean indexing 문제로 재정의해 응답 시간을 약 900초에서 약 1초 수준으로 줄였습니다.

![Cover](figures/slide01_fig01_group_2021-2026.png)

## 2. Representative Impact

| Impact | 핵심 성과 | 보여주는 역량 |
|---|---|---|
| 자동차선 적부 최적화 서비스화 | 연구 과제형 최적화 문제를 실제 사내 시스템에서 호출 가능한 BE/ML 서비스로 구체화 | 문제 정의, 시스템 설계, 모델 연동 |
| 장기 추론 모델 운영화 | 5~20분 걸릴 수 있는 모델을 비동기 callback 구조로 연동 | 비동기 API, queue 기반 처리, 운영 안정성 |
| Scale-out 상태 관리 해결 | callback이 원 요청 pod가 아닌 다른 pod로 라우팅될 수 있는 문제 해결 | Kubernetes, Redis, 전역 상태 관리 |
| 적부 추론 성능 개선 | 모델 호출 병렬화와 routing 개선으로 약 10분 → 2~3분 수준 단축 | 병목 분석, 분산 실행, 인프라 활용 |
| 복화 매칭 성능 개선 | brute-force 탐색을 self-merge/filtering 문제로 재정의해 약 900초 → 약 1초 단축 | 데이터 처리 최적화, 알고리즘적 사고 |
| AI 서비스 운영 인프라 | 폐쇄망 Kubernetes 클러스터와 모니터링/배포 기반 구성 | DevOps, MLOps, 운영 인프라 |
| 자동배차 구조 개선 | 영업소별 business logic을 scorer 구조로 추상화 | 도메인 로직 추상화, 유지보수성 |

## 3. Main Case Study: 자동차선 적부 계획 최적화 서비스

### 한 줄 요약

연구 과제에 가까운 자동차선 적부 최적화 문제를 실제 사내 시스템에서 호출 가능한 BE/ML 서비스로 구체화하고, 장기 추론 모델의 응답 시간을 약 10분에서 2~3분 수준으로 줄였습니다.

### 문제 상황

자동차선 적부 계획은 차량을 많이 싣는 단순 배치 문제가 아닙니다. 선적지, 양하지, 차량 높이, 선박 내부 구조, 차량 통행 가능성, 작업 순서 등을 함께 고려해야 하는 복잡한 최적화 문제입니다.

또한 모델 추론 시간이 입력 난도에 따라 5~20분까지 걸릴 수 있어, 기존 사내 시스템에서 일반적인 동기 API 방식으로 호출하기에는 timeout, polling 비용, 장애 복구, 서버 리소스 점유 문제가 있었습니다.

![자동차선 내부 구조](figures/slide11_fig01_picture_우선-자동차선에-차를-넣는다는-것은.png)

위 figure는 자동차선 내부가 대형 주차장처럼 여러 층으로 구성되어 있으며, 층별 공간과 통행 가능성이 적부 계획의 핵심 제약이 된다는 점을 보여줍니다.

### 선박 공간을 graph로 추상화

현업자는 선박 도면 위에 다각형으로 차량 적재 구역을 표시합니다. 이 형태를 그대로 시스템과 모델이 다루기 어렵기 때문에, 차량을 실을 수 있는 공간을 node로 보고 공간 간 연결 관계를 edge로 보는 graph 구조로 추상화했습니다.

이 추상화는 선박별 내부 구조 차이를 모델 입력으로 다룰 수 있게 만들고, 향후 여러 선박으로 확장할 때도 동일한 자료구조 기반으로 처리할 수 있게 합니다.

![선박 공간 graph 추상화](figures/slide12_fig02_group_선박-내-차량을-적재하는-구조를-어떻게-자료구조로-표현-하는가.png)

![차량 통행 graph 예시](figures/slide13_fig04_diagram_차량-통행-graph-예시.png)

### 시스템 간 데이터 모델 설계

기존 사내 시스템, API 서버, Engine 서버, 외부 모델, 내부 모델은 각자 요구하는 데이터 형태가 달랐습니다. 특정 시스템이나 모델의 입력 형식에 서비스 전체가 끌려가면 모델 교체나 기능 확장이 어려워질 수 있었습니다.

이를 방지하기 위해 선박, 데크, 홀드, 화물, 선적지, 양하지, 높이, 용량 등 핵심 개념을 서비스 내부 표준 데이터 모델로 구조화했습니다. 각 시스템과 모델은 이 표준 모델을 기준으로 입출력을 변환하도록 설계했습니다.

![데이터 모델 개념](figures/slide14_fig01_group_시스템과-인터페이싱-하기-위한-데이터-모델.png)

![표준 데이터 모델 인터페이스 구조](figures/slide18_fig02_diagram_표준-데이터-모델-인터페이스-구조.png)

### 장기 추론 모델을 비동기 callback 구조로 연동

동기 API 방식은 장시간 연결 유지와 반복 polling이 필요했고, 연결이 끊겼을 때 복구 흐름도 복잡했습니다. 여러 요청이 동시에 들어오면 API 서버와 추론 엔진의 리소스를 오래 점유하는 문제도 있었습니다.

이를 해결하기 위해 요청 수신과 모델 결과 수신을 분리했습니다. API 서버는 요청을 검증하고 queue에 넣으며, Engine 또는 모델 서버는 처리가 끝난 뒤 callback으로 결과를 전달합니다. 이 구조를 통해 기존 사내 시스템은 장기 실행 모델을 서비스 API처럼 사용할 수 있게 됩니다.

![비동기 callback 요청-응답 구조](figures/slide15_fig01_group_결과를-기존-시스템에-어떻게-쏴줄-것인가.png)

![비동기 구조 선택 이유](figures/slide15_fig02_group_결과를-기존-시스템에-어떻게-쏴줄-것인가.png)

### Scale-out 상태 관리 문제 해결

초기 구조에서는 요청 상태를 API pod 내부 메모리에 보관할 수 있었습니다. 단일 인스턴스에서는 문제가 드러나지 않지만, scale-out 이후에는 모델 처리 완료 callback이 원 요청을 받은 pod가 아닌 다른 pod로 라우팅될 수 있습니다. 이 경우 해당 pod는 요청 상태를 찾지 못해 결과 처리에 실패할 수 있습니다.

이를 해결하기 위해 공용 message queue와 Redis 기반 전역 상태 관리 구조로 변경했습니다. 요청과 결과 흐름을 producer/consumer 구조로 중앙화하고, 특정 pod의 내부 상태에 의존하지 않도록 구성했습니다.

![Scale-out AS-IS 문제](figures/slide16_fig01_group_Scale-out-시-문제점.png)

![Scale-out TO-BE queue Redis 구조](figures/slide17_fig04_diagram_Scale-out-TO-BE-queue-Redis-구조.png)

### 결과

- 연구 성격의 적부 최적화 문제를 운영 가능한 API 서비스 구조로 전환
- 장기 추론 모델을 비동기 callback 기반으로 서비스화
- User, API 레이어, Engine 레이어, 적입 모델 간 책임 분리
- scale-out 환경에서 공용 queue와 Redis 기반 전역 상태 관리 구조 확보
- pod-local state 의존을 줄이고 멱등성, 재처리, 장애 추적 가능성 개선
- 모델 호출 병렬화와 routing 개선으로 추론 시간 약 10분 → 2~3분 수준 단축
- 모델 교체와 선박 확장을 고려한 표준 데이터 모델 확보

## 4. Supporting Case Study: 철강 복화 운송 매칭 성능 개선

### 한 줄 요약

철강 물류 복화 운송 후보 탐색 문제를 pandas self-merge와 boolean indexing 문제로 재정의해, 계산 시간을 약 900초에서 약 1초 수준으로 단축했습니다.

### 문제 상황

B2C 모바일 서비스에서 화물 기사에게 복화 운송 후보를 제공해야 했기 때문에 응답 시간은 3초 이내여야 했습니다. 기존 brute-force 방식은 50개 이상의 entries에서 약 15분이 걸렸고, 실서비스 응답 시간 요구사항을 만족하기 어려웠습니다.

복화 운송은 `A 출발 → B 도착 → B 출발 → A 도착`처럼 공차 구간을 줄이기 위해 왕복 구간의 물량을 묶는 운송입니다.

![복화 서비스 개요](figures/slide32_fig01_group_개요.png)

### 기존 기능 재사용 구조

복화 서비스는 기존 배차 서비스의 일부 기능을 재사용해야 했습니다. 처음에는 기존 배차 모델 소스 코드를 git submodule로 가져오는 방식도 검토했지만, 코드 경로와 브랜치 관리가 복잡해지고 배차 서비스와 복화 서비스가 강하게 결합되는 문제가 있었습니다.

이를 API router 구조로 분리해 기존 배차 기능을 서비스 단위로 재사용하는 방향으로 정리했습니다.

![복화 서비스 API 재사용 구조](figures/slide33_fig01_diagram_복화-서비스-API-재사용-구조-As-Is-To-Be.png)

### self-merge와 boolean indexing

처음에는 multiprocessing, batch 분할, C++ 전환, 강화학습 기반 최적화 등을 검토했습니다. 하지만 서비스 오픈 일정, 유지보수성, Python과 C++ 간 데이터 변환 비용, 매칭 품질 문제를 고려했을 때 적절하지 않았습니다.

최종적으로 문제를 조합 탐색이 아니라 dataframe join/filtering 문제로 재정의했습니다. 원본 물량 테이블을 self-merge하여 가능한 왕복 후보군을 만들고, 출발지/도착지, 시간 조건, 불가능한 매칭 조건, 차량 유형 조건 등 business logic을 boolean indexing으로 필터링했습니다.

![self-merge 기반 복화 후보 생성 구조](figures/slide34_fig03_diagram_self-merge.png)

이 접근으로 약 900초 걸리던 복화 매칭 계산을 약 1초 수준으로 줄였습니다. 메모리를 더 사용하는 trade-off는 있었지만, B2C API 응답 시간 요구사항과 유지보수성을 동시에 만족하는 선택이었습니다.

## 5. Supporting Case Study: AI 서비스 Kubernetes 운영 인프라

### 한 줄 요약

서버 발급과 클라우드 행정 절차가 느린 폐쇄망 환경에서, 여러 AI 서비스를 독립적으로 배포하고 운영할 수 있는 Kubernetes 기반 내부 운영 인프라를 구성했습니다.

### 문제 상황

서버 발급은 전년도 예산안 반영이 필요했고, 클라우드 서버 발급부터 세팅까지 최소 2주 이상 걸렸습니다. 관리형 Kubernetes는 비용과 사내 행정 절차 부담이 컸고, 폐쇄망 환경에서는 외부 repository 접근도 제한되었습니다.

이런 제약 때문에 개발하고 운영하는 AI 서비스의 레이어를 분리하고, 여러 서비스를 독립적으로 배포·모니터링·운영할 수 있는 내부 플랫폼이 필요했습니다.

![AI 서비스 Kubernetes 클러스터 구성](figures/slide05_fig01_picture_AI-서비스-kubernetes-클러스터-자체-구성.png)

### 선택한 구성

Rancher Kubernetes Engine, Rancher, GitLab CI/CD, Harbor, Helm, Longhorn, Grafana/Prometheus/Loki/Alloy stack 등을 기반으로 내부 클러스터를 구성했습니다.

Rancher 계열을 선택한 이유는 폐쇄망 환경에서 내부 프록시와 문서/QnA 기준을 맞추기 쉽고, Rancher dashboard와 Longhorn 기반 분산 스토리지 운영이 상대적으로 단순했기 때문입니다.

![Kubernetes 선택 이유](figures/slide06_fig01_group_K8s-클러스터를-굳이-공부하고-선택한-여러-이유들.png)

![Rancher Kubernetes 선택 이유](figures/slide06_fig02_group_K8s-클러스터를-굳이-공부하고-선택한-여러-이유들.png)

### 장애 대응과 안정화

Ingress NGINX 보안 취약점과 지원 종료 리스크에 대응하기 위해 Istio + Gateway API 전환을 진행했습니다. 기존 annotation 기반 routing 설정을 Gateway API 표준 리소스 기반으로 정리했습니다.

또한 파드를 여러 개 띄웠을 때 일부 요청만 정상 응답하는 현상을 분석해, node port로 들어온 ingress traffic이 특정 노드의 pod에만 도달하는 네트워크 문제를 확인했습니다. 방화벽 설정 누락으로 노드 간 통신이 막혀 있던 것을 조치했습니다.

특정 노드의 CPU/Memory 사용률이 비정상적으로 높은 문제에서는 SELinux audit logging 프로세스가 과도하게 리소스를 점유하는 것을 확인하고 불필요한 프로세스를 비활성화했습니다.

![Ingress 및 Gateway API 전환](figures/slide08_fig02_group_클러스터-장애-대응-및-안정화-조치.png)

![방화벽 설정 누락으로 인한 네트워크 장애 대응](figures/slide08_fig03_group_클러스터-장애-대응-및-안정화-조치.png)

![SELinux audit logging 최적화](figures/slide08_fig01_group_클러스터-장애-대응-및-안정화-조치.png)

## 6. Selected Work: 철강 물류 TMS 자동배차 서비스

### 핵심 메시지

영업소별로 다른 복잡한 배차 로직을 scorer 구조로 추상화해 유지보수성과 변경 대응력을 높였습니다.

### 배차 가능 차량 유형 예측

영업소별 배차 기준은 현업자의 인터뷰만으로 정리하기 어려웠고, 인터뷰 내용과 실제 데이터가 다른 경우도 있었습니다. 이를 제품별 배차 가능 차량 유형을 예측하는 multi-class prediction 문제로 구성했습니다.

배차 기록에서 feature를 선별하고, 차량 유형을 target으로 학습해 물량별 차량 유형 확률값을 산출했습니다.

![제품별 배차 가능 차량 매핑 흐름](figures/slide28_fig07_diagram_figure.png)

### scorer 기반 business logic 추상화

각 영업소는 공통 요구사항과 고유 요구사항을 동시에 가지고 있었습니다. 이를 개별 `Scorer` 객체로 추상화하고, 여러 scorer의 산출값을 score matrix로 합성하는 구조로 설계했습니다.

이 구조를 통해 “먼저 들어온 차량에 높은 점수 부여”, “차량 선호 지역과 일치하는 물량에 높은 점수 부여” 같은 요구사항을 부품처럼 조합할 수 있게 했습니다. 사용자 요구사항도 일주일 내 구현, 테스트, 배포 가능한 형태로 대응할 수 있었습니다.

![score matrix와 scorer 구조](figures/slide29_fig02_group_제품-별-배차-가능-차량-매핑.png)

## 7. Selected Work: 사내 AI Agent Platform

사내 AI Agent Platform은 개인별 격리된 runtime 공간, 공용 skill 중앙 관리, 로그 수집과 오류 확인, 분산 구조 기반 운영 안정성을 목표로 기획/구성한 플랫폼입니다.

이 프로젝트는 물류 최적화 자체보다는 AI 서비스를 내부에서 안정적으로 운영하기 위한 runtime/platform 관점의 경험으로 정리하는 것이 적절합니다.

![사내 AI Agent Platform 구조](figures/slide23_fig01_picture_사내-AI-Agent-Platform-개발.png)

## 8. Research: AlphaRouter

AlphaRouter는 강화학습 기반 조합최적화 연구 경험을 보여주는 프로젝트입니다. 경로 최적화 문제에서 기존 exact formulation과 meta-heuristic이 요구하는 전문성 진입장벽을 낮추기 위해 강화학습과 Tree Search를 결합한 접근을 다뤘습니다.

논문에서는 AlphaZero 계열 아이디어를 일부 차용하고, tree search에서 발생하는 CPU-GPU bottleneck과 low-resource computer 실행 문제를 줄이기 위해 entropy-based selective MCTS를 제안했습니다.

![AlphaRouter 논문 요약](figures/slide37_fig01_picture_논문-요약.png)

구현 과정에서는 loop 기반 코드를 vectorized operation으로 바꾸며 학습 시간을 약 10~20배 단축했습니다. 이 경험은 실무에서 pandas/numpy/torch 기반 데이터 처리 성능을 개선하는 데에도 연결됩니다.

![vectorized environment 계산 구조](figures/slide38_fig02_diagram_vectorized-environment-계산-구조.png)

## 9. Selected Work: 사내 코드 생성 AI 서비스 PoC

사내 보안 정책상 GitHub Copilot, Cursor 같은 외부 LLM 기반 assistant tool 사용이 어려운 환경에서, 오픈소스 기반 코드 생성 AI PoC를 수행했습니다.

Continue.dev를 code assistant extension으로 검토하고, Ollama와 vLLM을 model serving 후보로 비교했습니다. 모델은 Codestral 22B를 사용했으며, 내부 GPU 자원 제약 때문에 8bit 양자화 모델을 테스트했습니다.

![사내 코드 생성 AI 서비스 구조](figures/slide43_fig04_diagram_사내-코드-생성-AI-서비스-구조.png)

PoC를 통해 open-source code assistant의 가능성, Ollama와 vLLM의 serving 특성, 동시 요청 throughput, CUDA 호환성, 구조화된 output 생성 한계 등을 확인했습니다.

## 10. Publications & Patents

원본 PPT 기준 주요 논문/특허 항목은 다음과 같습니다.

- AlphaRouter: Bridging the Gap Between Reinforcement Learning and Optimization for Vehicle Routing with Monte Carlo Tree Searches, Entropy (SCI Q2), 2025.02
- 인공지능 모델 기반 자동배차 방법 및 이를 위한 자동배차 시스템, 2025.04
- 물류 운송을 위한 자동 배차 방법 및 이를 위한 장치, 2025.05
- 운반 운송을 위한 적재/양하 계획 방법 및 이를 위한 장치, 2025.05

## 11. Tech Stack

### Backend

- FastAPI
- REST API 설계
- 비동기 callback 구조
- queue 기반 작업 처리
- Redis 기반 전역 상태 관리
- MongoDB

### ML / Data

- Python
- pandas, numpy
- PyTorch, torchrl
- scikit-learn
- AutoGluon
- graph 기반 자료구조
- vectorized operation

### Infra / MLOps

- Kubernetes
- Rancher Kubernetes Engine
- Rancher
- Docker
- GitLab CI/CD
- Harbor
- Helm
- Istio
- Gateway API
- Longhorn
- Grafana, Prometheus, Loki, Alloy

### LLM / Agent

- Continue.dev
- Ollama
- vLLM
- Codestral 22B
- internal AI Agent Platform

## 12. Closing Summary

이 포트폴리오에서 가장 강하게 전달해야 하는 메시지는 다음입니다.

김원준은 물류 도메인의 복잡한 최적화 문제를 이해하고, 이를 API, Engine, 모델, queue, Redis, Kubernetes, routing, monitoring까지 포함한 운영 가능한 BE/ML 서비스로 연결할 수 있는 엔지니어입니다.

특히 자동차선 적부 계획 최적화 서비스는 도메인 문제 정의, 표준 데이터 모델 설계, 장기 추론 모델 연동, scale-out 상태 관리, 성능 개선까지 연결된 대표 사례입니다. 복화 매칭 성능 개선은 문제를 다시 정의해 계산량을 줄인 사례이며, Kubernetes 운영 인프라는 모델을 실제 서비스로 운영할 수 있는 기반 역량을 보여주는 보조 사례입니다.
