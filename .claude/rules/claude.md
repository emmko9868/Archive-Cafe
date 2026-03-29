# CaféLog — claude.md

이 파일은 모든 컨텍스트 문서의 진입점이다.
작업 시작 전 반드시 이 파일을 먼저 읽고, 아래 문서들을 참조한다.

---

## 문서 구조

| 문서 | 파일 | 역할 |
|---|---|---|
| A. Project Summary | `project-summary.md` | 서비스가 무엇인지 (WHAT) |
| B. UX Flow | `ux-flow.md` | 사용자가 어떻게 경험하는지 (HOW) |
| C. Visual Direction | `visual-direction.md` | 디자인 시스템 기반 및 원칙 |
| D. Content Data | `content-data.md` | 앱 내 모든 텍스트 |
| F. Product Data | `product-data.md` | 데이터 모델 정의 |

---

## 우선순위 및 적용 기준

1. **모든 작업 시** — A, B를 먼저 읽고 서비스 맥락을 파악한다
2. **컴포넌트 생성 시** — C를 참조해 Montage 인벤토리를 먼저 확인한다. Montage에 있는 컴포넌트는 재사용한다
3. **텍스트 작성 시** — D를 참조한다. 임의로 텍스트를 만들지 않는다
4. **데이터 구조 작업 시** — F를 참조한다. 정의되지 않은 필드를 임의로 추가하지 않는다

---

## 금지 사항

- 문서에 정의되지 않은 기능을 임의로 추가하지 않는다
- Montage에 있는 컴포넌트를 중복으로 새로 만들지 않는다
- 데이터 모델을 문서 외 기준으로 변경하지 않는다
