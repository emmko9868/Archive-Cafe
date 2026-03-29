# CaféLog — Product Data

## 카페 (Cafe)

| 필드 | 타입 | 설명 |
|---|---|---|
| id | string | 고유 식별자 |
| name | string | 카페 이름 |
| address | string | 주소 |
| coordinates | { lat, lng } | 지도 핀 위치 |
| hours | string | 영업시간 |
| tags | Tag[] | 카페 유형 태그 목록 |
| photos | string[] | 카페 대표 사진 목록 |
| menus | MenuItem[] | 메뉴 목록 |

---

## 메뉴 아이템 (MenuItem)

| 필드 | 타입 | 설명 |
|---|---|---|
| id | string | 고유 식별자 |
| name | string | 메뉴 이름 |
| price | number | 가격 |
| category | string | 메뉴 카테고리 (음료·디저트 등) |
| photo | string | 메뉴 사진 (선택) |
| source | "external" \| "visitor" | 데이터 출처 구분 |
| recordId | string \| null | 방문자 입력인 경우 연결된 Record ID |

> **메뉴 데이터 출처 — 확정**
> 방문자가 기록할 때 함께 입력 + 외부 데이터 연동, 두 가지 방식을 병행한다.
> 외부 연동 데이터는 읽기 전용, 방문자 입력 데이터는 기록(Record)과 연결된다.

> **카페 사진 출처 — 확정**
> 방문자 기록 사진에서 자동 수집 + 카페 대표 사진 별도 등록, 두 가지를 병행한다.
> photos 필드는 대표 사진(별도 등록)을 담고, 방문자 기록 사진은 Record.photos에서 수집된다.

---

## 기록 (Record)

| 필드 | 타입 | 설명 |
|---|---|---|
| id | string | 고유 식별자 |
| cafeId | string | 연결된 카페 |
| userId | string | 작성자 |
| visitDate | date | 방문 날짜 |
| drinkType | string | 음료 종류 |
| tags | Tag[] | 카페 유형 태그 |
| photos | string[] | 사진 목록 |
| memo | string | 한 줄 메모 (선택) |
| isPublic | boolean | 공개 여부 |

---

## 태그 (Tag)

| 필드 | 타입 | 설명 |
|---|---|---|
| id | string | 고유 식별자 |
| category | "purpose" \| "theme" \| "drink" | 필터 카테고리 구분 |
| label | string | 표시 텍스트 |

**category 값 정의**
- `purpose` — 목적별 태그 (작업, 데이트, 혼자, 이색체험)
- `theme` — 테마별 태그 (한옥, 루프탑, 북카페 등)
- `drink` — 음료별 태그 (스페셜티, 시그니처 등)

---

## 유저 (User)

| 필드 | 타입 | 설명 |
|---|---|---|
| id | string | 고유 식별자 |
| nickname | string | 닉네임 |
| profileImage | string | 프로필 사진 |
| followingIds | string[] | 팔로잉 목록 |
| savedCafeIds | string[] | 저장한 카페 목록 |
