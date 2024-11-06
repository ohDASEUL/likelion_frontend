
# TypeScript Setup Guide

## 설치 단계

### 1. TypeScript 컴파일러 설치

`06-typescript` 폴더를 전역 범위에서 `tsc` 명령을 사용하기 위해 TypeScript 컴파일러를 로컬 설치합니다.

```bash
npm install typescript
```

- `npm`으로 설치된 모든 파일은 `node_modules` 폴더에 다운로드됩니다.
- `node_modules`에 설치된 파일은 해당 폴더와 모든 하위 폴더에서 사용 가능합니다.

### 2. TypeScript 파일 컴파일

설치된 TypeScript 컴파일러를 사용하여 `.ts` 파일을 `.js` 파일로 컴파일합니다.

```bash
npx tsc main.ts
```

- `npx`는 Node.js의 패키지 실행자로, `tsc` 컴파일러를 실행시키는 명령입니다. `tsc`가 설치되어 있지 않다면 자동으로 다운로드 받습니다.
- 이 명령은 `main.ts` 파일이 있는 동일한 폴더에서 실행해야 합니다.

### 3. HTML 파일 설정

컴파일된 `.js` 파일을 HTML 파일에 연결합니다.

```html
<script src="main.js"></script>
```

- `main.js`는 `tsc`를 통해 생성된 JavaScript 파일로, 이 스크립트를 HTML 파일에 연결하여 TypeScript가 작성한 로직을 웹 페이지에서 사용할 수 있습니다.