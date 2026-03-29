# CaféLog — Visual Direction

## 디자인 시스템 기반

Montage iOS (원티드 오픈소스 디자인 시스템)를 그대로 사용한다.
컬러·타이포그래피·컴포넌트·스페이싱 토큰은 Montage 기본값을 따른다.
별도 커스텀 없이 Montage의 기본 구조 위에서 구현한다.

## 레퍼런스 파일

- 로컬 파일: montage-ios-main
- 공식 문서: https://montage.wanted.co.kr

## 원칙

- 새 컴포넌트 생성 전, Montage 인벤토리에서 재사용 가능한 컴포넌트를 먼저 확인한다
- Montage에 없는 컴포넌트만 신규 생성한다
- 신규 생성 시에도 Montage 토큰 체계(컬러, 타입, 스페이싱) 안에서 정의한다
