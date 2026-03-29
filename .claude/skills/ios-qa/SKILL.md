# iOS QA Skill

> CaféLog iOS 앱 전체를 자동으로 점검하는 QA 에이전트

## 활성화 조건

| 의도 | 트리거 예시 |
|------|-----------|
| 전체 점검 | "QA 해줘", "점검해줘", "qa 돌려줘", "체크해줘" |
| 특정 화면 점검 | "맵 QA", "피드 점검", "기록 화면 체크" |
| 배포 전 검증 | "배포 전 확인", "빌드 가능한지 봐줘" |

---

## QA 체크리스트

QA 실행 시 아래 7개 카테고리를 순서대로 점검한다.

---

### 1. 컴파일 안전성

- [ ] 모든 `@EnvironmentObject` 선언에 대응하는 주입 경로 확인
- [ ] `@ObservedObject` / `@StateObject` 생명주기 적합성
- [ ] `ForEach` 대상이 `Identifiable` 준수 여부
- [ ] 존재하지 않는 메서드/프로퍼티 참조 여부
- [ ] 옵셔널 강제 언래핑 (`!`) 사용 위치 확인

**점검 방법**: 각 View 파일을 Read → 선언된 EnvironmentObject가 부모 체인에서 주입되는지 역추적

---

### 2. 네비게이션 무결성

- [ ] 모든 Coordinator의 `navigate(to:)` 케이스가 `destinationView`에 구현됨
- [ ] `NavigationStack` + `.navigationDestination` 연결 확인
- [ ] 뒤로가기 후 상태 초기화 여부 (path 관리)
- [ ] 탭 간 상태 격리 (탭 전환 시 다른 탭 path가 유지되는지)

**점검 방법**: 각 Coordinator 파일의 enum cases와 destinationView switch 비교

---

### 3. 데이터 플로우

- [ ] MockDatabase에 저장된 기록이 Calendar/Feed/Profile에 반영되는지
- [ ] `@Published var`가 변경될 때 해당 화면이 ObservedObject로 구독 중인지
- [ ] RecordView 저장 후 dismiss → 다른 탭에서 즉시 반영 여부
- [ ] user1 하드코딩된 userId가 일관성 있게 사용되는지

**점검 방법**: MockDatabase 변경 경로 추적 → 구독 뷰 목록 검증

---

### 4. UI/UX 완결성

- [ ] 빈 상태(Empty State) 처리 — 기록 없을 때 안내 문구 표시
- [ ] 로딩 중 상태 처리 — isSaving, isLoading 플래그 활용
- [ ] 에러/알럿 처리 — 필수 입력 누락 시 사용자 피드백
- [ ] 사진 없을 때 대체 이미지 표시
- [ ] 메모 없을 때 섹션 숨김 처리

**점검 방법**: 각 View의 조건부 렌더링 확인

---

### 5. 리소스 무결성

- [ ] `CafeImage.url(n, m)` 호출에서 실제 파일 존재 확인
  - cafe1: p0–p3 (4장)
  - cafe2: p0–p4 (5장)
  - cafe3: p0–p2 (3장)
  - cafe4: p0–p2 (3장)
- [ ] 접근 권한 키 Info.plist 등록 여부 (위치, 사진)
- [ ] 다국어 키가 Localizable.xcstrings에 존재하는지

**점검 방법**: Resources/ 목록 확인 + CafeImage 호출 코드 grep

---

### 6. 권한 및 보안

- [ ] 위치 권한 요청 시점 적절성 (지도 진입 시)
- [ ] 사진 라이브러리 접근 권한 요청 시점 (기록하기 진입 시)
- [ ] UserDefaults에 민감 정보 저장 여부 확인
- [ ] Apple Sign-In 결과 처리 completeness

---

### 7. 배포 준비도

- [ ] `DEVELOPMENT_TEAM` 설정 여부
- [ ] Bundle ID 유효성 (`com.cafelog.app`)
- [ ] `CFBundleShortVersionString` / `CFBundleVersion` 적절성
- [ ] Firebase 패키지 추가됐으나 `GoogleService-Info.plist` 없음 → MockDB 사용 중이므로 OK
- [ ] 미완성 TODO 주석 수 카운트
- [ ] `print()` / `debugPrint()` 프로덕션 노출 여부

---

## 출력 형식

점검 완료 후 다음 형식으로 리포트한다:

```
## CaféLog QA Report — {날짜}

### 요약
- 🔴 Critical: N건
- 🟡 Warning: N건
- ✅ Pass: N개 카테고리

### Critical (즉시 수정 필요)
...

### Warning (권고)
...

### 통과 항목
...

### 배포 가능 여부
✅ 가능 / ⚠️ 수정 후 가능 / ❌ 불가
```

---

## 실행 순서

1. Sources/ 디렉토리 전체 Swift 파일 목록 수집
2. 카테고리 1→7 순서로 점검
3. 각 이슈 발견 시 파일명:라인번호 함께 기록
4. 리포트 출력
