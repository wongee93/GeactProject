## 프로젝트 개요
typescript를 통해 React를 직접 만들어보며 동작 원리를 이해하고 핵심 기능을 구현해보고자 프로젝트를 진행함

## 핵심 기능

### DOM 렌더링

**- createElement() : DOM 요소를 생성하는 함수**
  - type : element의 태그 요소
  - props : element의 속성(id, class 등)
  - children : element의 자식 요소

**- render() : virtual DOM에서 정의된 트리 구조를 렌더링하기 위해 브라우저 DOM에 렌더링하는 함수**
  - element : element 객체
  - container : 렌더링 된 element DOM의 부모요소가 될 요소
