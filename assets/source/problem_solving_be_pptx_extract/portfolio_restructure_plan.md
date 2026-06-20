# 김원준 포트폴리오 재구성 계획

## 1. 포트폴리오의 핵심 메시지

이 포트폴리오는 프로젝트 목록을 나열하는 자료가 아니라, 아래 메시지를 일관되게 증명하는 구조로 구성한다.

> 김원준은 복잡한 물류 최적화 문제와 AI 실행 환경을 실제 운영 가능한 BE/ML 서비스로 만드는 엔지니어다.

따라서 첫 화면부터 상세 case study까지 다음 역량이 반복적으로 드러나야 한다.

- 도메인 문제를 기술 요구사항과 데이터 모델로 풀어내는 능력
- 장기 실행 ML/최적화 모델을 운영 API로 감싸는 백엔드 설계 능력
- Kubernetes, Queue, Redis, Callback, Monitoring 등 운영 관점의 시스템 설계 능력
- 사용자별 AI Agent runtime처럼 상태와 격리가 중요한 내부 플랫폼을 설계하는 능력
- 철강 물류의 복잡한 의사결정 로직을 데이터 처리와 scorer 구조로 서비스화하는 능력

---

## 2. 최종 정보 구조

```text
1. Hero
2. Representative Impact
3. Capability Map
4. Main Case Study 1: Auto-stowage Backend Service
5. Main Case Study 2: Personal AI Agent Runtime Platform
6. Supporting Case Study: Steel Logistics Optimization
7. Supporting Case Study: AI Service Kubernetes Foundation
8. Research / Publications
9. Tech Stack
10. Contact
```

핵심 순서는 반드시 다음을 따른다.

```text
Auto-stowage → Personal AI Agent → Steel Logistics → Kubernetes Foundation
```

`Auto-stowage`와 `Personal AI Agent`는 대표 case study로 둔다.  
`복화 매칭`과 `철강 TMS 자동배차`는 분리하지 않고 `Steel Logistics Optimization` 하나로 묶는다.  
`scale-out`, `Queue`, `Redis`, `callback routing`, `pod-local state`는 독립 성과가 아니라 `Auto-stowage` 내부의 핵심 해결 과정으로 다룬다.  
`사내 코드 생성 AI PoC`는 제외한다.

---

## 3. Hero

### 제목

```text
김원준 | Logistics BE/ML Engineer
```

### 메인 카피

```text
복잡한 물류 최적화 문제를
운영 가능한 AI 서비스로 만듭니다.
```

### 서브 카피

```text
Python, FastAPI, Pandas, PyTorch, Kubernetes를 기반으로
물류 도메인의 복잡한 제약조건과 AI/최적화 모델을
사내 시스템에서 호출 가능한 백엔드 서비스와 운영 플랫폼으로 구축해왔습니다.
```

첫 화면에서는 설명을 길게 쓰지 않는다.  
포지셔닝과 대표 성취만 빠르게 보이게 한다.

---

## 4. Representative Impact

첫 화면의 impact는 기술 카테고리별로 쪼개지 말고, 서비스 단위로 묶는다.  
각 카드에는 “어떤 서비스를 만들었는가”보다 “그 서비스에서 기술적으로 무엇을 성취했는가”가 보여야 한다.

| Service | Technical Impact |
|---|---|
| Auto-stowage Backend Service | 장기 추론 최적화 모델을 Async Callback + Queue + Redis 기반 운영 API로 서비스화 |
| Personal AI Agent Runtime Platform | 사용자별 runtime 격리와 skill/log/lifecycle 중앙 관리 구조 설계 |
| Steel Logistics Optimization | 복화 매칭 self-merge 최적화와 자동배차 Scorer 구조로 철강 물류 로직 서비스화 |
| AI Service Kubernetes Foundation | 폐쇄망 Kubernetes 기반 AI 서비스 배포, 트래픽, 모니터링 운영 환경 구성 |

### 첫 화면 카드 문구

```text
Auto-stowage Backend Service
장기 추론 최적화 모델을 Async Callback + Queue + Redis 기반 운영 API로 서비스화

Personal AI Agent Runtime Platform
사용자별 runtime 격리와 skill/log/lifecycle 중앙 관리 구조 설계

Steel Logistics Optimization
복화 매칭 self-merge 최적화와 자동배차 Scorer 구조로 철강 물류 로직 서비스화

AI Service Kubernetes Foundation
폐쇄망 Kubernetes 기반 AI 서비스 배포, 트래픽, 모니터링 운영 환경 구성
```

이 섹션에서는 시간 수치를 강조하지 않는다.  
필요한 수치는 상세 case study 내부에서 결과 또는 맥락으로만 사용한다.

---

## 5. Capability Map

Representative Impact 아래에는 기술 스택 나열이 아니라 설계 역량을 배치한다.

```text
Long-running Job Processing
Scale-out Safe State Management
Domain Data Modeling
Multi-tenant Runtime Isolation
Dataframe / Vectorized Optimization
Kubernetes-based Production Operation
```

각 capability는 아래 case study와 연결되어야 한다.

| Capability | 연결되는 case |
|---|---|
| Long-running Job Processing | Auto-stowage |
| Scale-out Safe State Management | Auto-stowage |
| Domain Data Modeling | Auto-stowage, Steel Logistics |
| Multi-tenant Runtime Isolation | Personal AI Agent |
| Dataframe / Vectorized Optimization | Steel Logistics |
| Kubernetes-based Production Operation | Personal AI Agent, Kubernetes Foundation |

---

## 6. Main Case Study 1: Auto-stowage Backend Service

### 핵심 메시지

```text
연구형 자동차선 적부 최적화 모델을 사내 시스템에서 호출 가능한 운영 API 서비스로 전환했다.
```

### 구성 흐름

```text
1. 문제 상황
2. 맡은 역할
3. 선박 공간 graph 추상화
4. 표준 데이터 모델 설계
5. 장기 추론 모델의 비동기 callback 구조
6. Queue + Redis 기반 scale-out 상태 관리
7. 모델 호출 분산과 routing 개선
8. 결과
```

### 포함해야 할 내용

- 자동차선 적부는 단순 배치 문제가 아니라 선적지, 양하지, 차량 높이, 선박 내부 구조, 통행 가능성, 작업 순서가 얽힌 최적화 문제임을 먼저 설명한다.
- 현업 도면의 다각형 적재 구역을 node/edge 기반 graph 구조로 추상화한 점을 보여준다.
- 사내 시스템, API 서버, Engine 서버, 외부 모델, 내부 모델 사이의 데이터 형식 차이를 표준 데이터 모델로 흡수한 점을 설명한다.
- 동기 API 방식의 timeout, polling, 연결 유지 비용 문제를 Async Callback + Queue 구조로 해결한 점을 설명한다.
- scale-out 이후 callback이 원 요청 pod가 아닌 다른 pod로 라우팅될 수 있는 문제를 Redis 전역 상태와 공용 queue로 해결한 점을 반드시 Auto-stowage 내부에서 설명한다.
- Istio routing과 모델 호출 분산은 성능 개선 섹션에서 다룬다.

### Figure 배치

```text
Figure 1. 선박 공간 graph 추상화
Figure 2. 표준 데이터 모델 인터페이스
Figure 3. 비동기 callback + queue 구조
Figure 4. scale-out 상태 관리 AS-IS / TO-BE
Figure 5. 모델 호출 분산 및 routing 개선
```

---

## 7. Main Case Study 2: Personal AI Agent Runtime Platform

### 핵심 메시지

```text
사용자별 AI Agent 실행 환경을 격리하고, skill/log/runtime lifecycle을 중앙 관리하는 내부 플랫폼 구조를 설계했다.
```

### 구성 흐름

```text
1. 왜 사용자별 runtime 격리가 필요한가
2. 일반 API 서비스와 다른 backend 문제
3. 사용자별 runtime 설계
4. skill catalog 중앙 관리
5. log collection / execution trace 구조
6. runtime lifecycle 관리
7. 운영 안정성 및 검증 구조
```

### 포함해야 할 내용

- 공유 실행 환경에서 사용자별 설정, 파일, 상태, 의존성이 섞이는 문제가 있었다는 점을 설명한다.
- 단순 LLM 서비스가 아니라 사용자별 실행 환경을 관리하는 runtime platform 문제였음을 강조한다.
- Kubernetes StatefulSet 또는 사용자별 runtime 단위로 격리한 설계 의도를 설명한다.
- skill catalog를 중앙 관리하고 runtime에 배포하는 구조를 설명한다.
- 실행 로그를 user / execution / agent context 기준으로 추적할 수 있게 만든 점을 설명한다.
- 이 case는 Auto-stowage 다음에 배치한다.

### Figure 배치

```text
Figure 1. 사용자별 runtime 격리 구조
Figure 2. skill catalog / log collection 구조
Figure 3. runtime lifecycle 관리 흐름
```

---

## 8. Supporting Case Study: Steel Logistics Optimization

복화 매칭과 철강 TMS 자동배차를 별도 case로 분리하지 않는다.  
둘 다 철강 물류 의사결정 로직을 서비스화한 사례이므로 하나의 supporting case로 묶는다.

### 핵심 메시지

```text
철강 물류의 복화 매칭과 자동배차 문제를 각각 dataframe 기반 후보 탐색, Scorer/Score Matrix 기반 정책 계산 구조로 재정의했다.
```

### 구성 흐름

```text
1. 철강 물류 의사결정 문제의 공통 맥락
2. 복화 매칭: 조합 탐색을 dataframe self-merge/filtering 문제로 재정의
3. 자동배차: 영업소별 business logic을 Scorer + score matrix로 추상화
4. API 경계와 운영 추적성
5. 결과
```

### 복화 매칭에서 보여줄 내용

- 왕복 운송 후보를 찾는 문제는 단순 loop 탐색으로는 운영 API 응답 요구를 만족하기 어렵다.
- 문제를 조합 탐색이 아니라 dataframe join/filtering 문제로 재정의했다.
- 원본 물량 테이블을 self-merge하여 후보군을 만들고, 출발지/도착지, 시간 조건, 불가능 조건, 차량 유형 조건을 boolean indexing으로 필터링했다.

### 자동배차에서 보여줄 내용

- 영업소별 배차 기준이 다르고, 규칙 변경이 자주 발생했다.
- 제품별 배차 가능 차량 유형을 multi-class prediction 문제로 구성했다.
- 영업소별 요구사항을 Scorer 객체로 추상화하고, score matrix 기반으로 조합했다.
- 예측값과 정책 점수를 분리해 변경 대응성과 추적성을 높였다.

### Figure 배치

```text
Figure 1. 복화 매칭 self-merge 구조
Figure 2. 제품별 차량 유형 예측 흐름
Figure 3. Scorer / Score Matrix 구조
```

---

## 9. Supporting Case Study: AI Service Kubernetes Foundation

### 핵심 메시지

```text
폐쇄망 환경에서 여러 AI 서비스를 독립적으로 배포, 모니터링, 운영할 수 있는 Kubernetes 기반 내부 운영 환경을 구성했다.
```

### 구성 흐름

```text
1. 폐쇄망 / 서버 발급 / 클라우드 승인 제약
2. Kubernetes 기반 내부 운영 환경 필요성
3. Harbor, Helm, GitLab CI/CD 기반 배포 구조
4. Istio / Gateway API 기반 트래픽 제어
5. Longhorn, Grafana, Prometheus, Loki 기반 운영 관측성
6. 장애 대응 사례
```

### 포함해야 할 내용

- 이 섹션은 인프라 포트폴리오처럼 길어지면 안 된다.
- Auto-stowage와 Personal AI Agent를 운영 가능하게 만든 기반 역량으로 다룬다.
- 폐쇄망, 외부 repository 제한, 서버 발급 지연 같은 제약을 먼저 설명한다.
- Kubernetes 구성보다 “왜 이 구조가 AI 서비스를 운영 가능하게 했는가”를 중심으로 쓴다.

---

## 10. Research / Publications

### AlphaRouter

```text
강화학습 기반 조합최적화 연구를 수행했고,
vectorized environment 구현을 통해 연산 최적화 경험을 쌓았다.
```

포트폴리오 중심이 연구로 넘어가지 않도록 짧게 배치한다.

포함 내용:

- Entropy 기반 selective MCTS
- vehicle routing problem
- vectorized environment
- numpy / torch 연산 최적화
- 논문 및 특허 목록

---

## 11. 제외할 내용

아래 내용은 포트폴리오 본문에서 제외하거나 매우 짧게만 다룬다.

```text
사내 코드 생성 AI 서비스 PoC
기술 선호도 표현
"좋아하지 않음", "개념만 알고 있음" 같은 표현
프로젝트별 구현 실수 고백처럼 보이는 문장
회사 내부 시스템 구조를 지나치게 상세하게 드러내는 그림
복화 매칭과 철강 자동배차를 서로 다른 대표 case로 분리하는 구성
scale-out / Redis / Queue를 Auto-stowage와 분리해 독립 성과처럼 보이게 하는 구성
```

---

## 12. 최종 목차

```markdown
# 김원준 | Logistics BE/ML Engineer

## Hero
복잡한 물류 최적화 문제를 운영 가능한 AI 서비스로 만듭니다.

## Representative Impact
- Auto-stowage Backend Service
- Personal AI Agent Runtime Platform
- Steel Logistics Optimization
- AI Service Kubernetes Foundation

## Capability Map
- Long-running Job Processing
- Scale-out Safe State Management
- Domain Data Modeling
- Multi-tenant Runtime Isolation
- Dataframe / Vectorized Optimization
- Kubernetes-based Production Operation

## Main Case Study 1
### Auto-stowage Backend Service

## Main Case Study 2
### Personal AI Agent Runtime Platform

## Supporting Case Study
### Steel Logistics Optimization

## Supporting Case Study
### AI Service Kubernetes Foundation

## Research / Publications
### AlphaRouter
### Publications & Patents

## Tech Stack

## Contact
```
