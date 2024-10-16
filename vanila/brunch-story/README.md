# 바닐라 자바스크립트 프로젝트

## 프로젝트 진행 단계

1. Vite로 프로젝트 초기화

   ```sh
   npm create vite@latest
   ```

   - Project name: **프로젝트 이름**
   - ? Target directory "프로젝트 이름" is not empty. Remove existing files and continue? » **y**
   - Select a framework: **Vanilla**
   - Select a variant: **JavaScript**

2. 생성한 프로젝트 폴더로 이동

   ```sh
   cd 프로젝트 이름
   ```

3. 필요 패키지 설치

   ```sh
   npm install
   ```

4. MPA 설정

   - 프로젝트 루트에 vite.config.js 파일 생성

   ```js
   import { defineConfig } from 'vite';
   import { resolve } from 'path';

   export default defineConfig({
     root: './public', // Vite 서버가 참조할 루트 디렉토리를 지정
     build: {
       rollupOptions: {
         input: {
           index: resolve(__dirname, './public/index.html'), // 기본 index.html
         },
       },
     },
   });
   ```

5. .gitignore 파일 생성

   - 프로젝트에서 불필요한 파일은 git에서 관리하지 않도록 추가

   ```sh
   npx add-gitignore node,windows,osx,visualstudiocode
   ```

6. 개발 서버 실행

   ```sh
   npm run dev
   ```

   1. 서버 접속 테스트

      http://localhost:5173

   2. 빌드

      - 배포용 파일 생성

      ```sh
      npm run build
      ```

   3. 로컬 테스트(서버구동)

      ```sh
      npm run preview
      ```

      서버 실행 후 터미널의 안내 메세지에 따라 웹 브라우저로 접속(http://localhost:4173)

7. ESLint

   ```shell
   npm init @eslint/config
   또는
   npx eslint --init

   * How would you like to use ESLint?
     - To check syntax and find problems
   * What type of modules does your project use?
     - JavaScript modules (import/export)
   * Which framework does your project use?
     - None of these
   * Does your project use TypeScript?
     - No
   * Where does your code run?
     - Browser
   * What format do you want your config file to be in?
     - JavaScript
   ```

   .eslint.config.js

   ```js
   import globals from 'globals';
   import pluginJs from '@eslint/js';
   import eslintConfigPrettier from 'eslint-config-prettier';

   export default [
     { languageOptions: { globals: globals.browser } },
     pluginJs.configs.recommended,
     { rules: { 'no-unused-vars': 'warn' } },
     eslintConfigPrettier,
   ];
   ```

   1. 실행

   - 현재 폴더내의 모든 파일 검사

   ```shell
   npx eslint .
   ```

   - 지정한 폴더내의 모든 파일 검사

     ```shell
     npx eslint ./src
     ```

   - 지정한 파일 검사
     ```shell
     npx eslint ./src/App.js
     ```

8. Prettier

   ```shell
   npm i prettier
   ```

   .prettierrc.js 예시

   ```js
   export default {
     // 문자열에 single quote 사용(기본값 true)
     singleQuote: true,
     // 코드 마지막에 세미콜론 추가(기본값 true)
     semi: true,
     // 들여쓰기를 탭으로 지정할지 여부(기본값 false)
     useTabs: false,
     // 들여쓰기 너비 2칸(기본값 2)
     tabWidth: 2,
     // 여러 줄의 쉼표로 구분된 구문 구조에서 후행 쉼표를 추가(none: 설정 안함, es5: 객체,배열에 설정, all(기본값): 함수 정의나 호출 등 가능한 모든 곳에 설정)
     trailingComma: 'all',
     // 한줄에 80 글자가 넘어가면 줄바꿈(기본값 80)
     printWidth: 80,
     // 화살표 함수의 매개변수가 하나만 지정될 때 괄호 생략(always: 항상 괄호 명시, avoid: 가능하면 생략)
     arrowParens: 'avoid',
     // windows에 뜨는 'Delete cr' 에러 해결
     endOfLine: 'auto',
   };
   ```

   1. 실행

   - 현재 폴더내의 모든 파일을 포맷에 맞춰서 변환

     ```shell
     npx prettier --write .
     ```

   - 지정한 폴더내의 모든 파일을 포맷에 맞춰서 변환

     ```shell
     npx prettier --write ./src
     ```

   - 지정한 파일을 포맷에 맞춰서 변환

     ```shell
     npx prettier --write ./src/App.js
     ```

9. ESLint와 충돌

   ```shell
   npm i -D eslint-config-prettier
   ```

   - 다른 구성을 재정의하기 위해 .eslintrc 파일 extends의 마지막에 추가
     ```json
     {extends: "prettier"},
     ```

## 프로젝트 폴더 구조
```
📦 brunch-story
┣ 📂node_modules
┣ 📂src
┃ ┣ 📂assets
┃ ┃ ┣ 📂icons
┃ ┃ ┃ ┣ 📂actions
┃ ┃ ┃ ┣ 📂navigation
┃ ┃ ┃ ┣ 📂social
┃ ┃ ┃ ┣ 📂status
┃ ┃ ┃ ┗ 📂ui
┃ ┃ ┣ 📂images
┃ ┃ ┗ 📂logos
┃ ┣ 📂features
┃ ┃ ┣ 📂Author
┃ ┃ ┃ ┣ 📜author.html
┃ ┃ ┃ ┗ 📜authorPage.js
┃ ┃ ┣ 📂Detail
┃ ┃ ┃ ┣ 📜detail.html
┃ ┃ ┃ ┗ 📜detailPage.js
┃ ┃ ┣ 📂Discover
┃ ┃ ┃ ┣ 📜discover.html
┃ ┃ ┃ ┗ 📜discoveryPage.js
┃ ┃ ┣ 📂Home
┃ ┃ ┃ ┣ 📜home.html
┃ ┃ ┃ ┗ 📜homePage.js
┃ ┃ ┣ 📂MyBox
┃ ┃ ┃ ┣ 📜myBox.html
┃ ┃ ┃ ┗ 📜myBoxPage.js
┃ ┃ ┣ 📂Start
┃ ┃ ┃ ┣ 📜start.html
┃ ┃ ┃ ┗ 📜startPage.js
┃ ┃ ┗ 📂Write
┃ ┃ ┃ ┣ 📜write.html
┃ ┃ ┃ ┗ 📜writePage.js
┃ ┣ 📂shared
┃ ┃ ┣ 📂components
┃ ┃ ┃ ┣ 📜footer.html
┃ ┃ ┃ ┣ 📜footer.js
┃ ┃ ┃ ┗ 📜header.html
┃ ┃ ┃ ┣ 📜header.js
┃ ┃ ┗ 📂styles
┃ ┃ ┃ ┣ 📜footer.css
┃ ┃ ┃ ┗ 📜header.css
┣ 📜.gitignore
┣ 📜.prettierrc.js
┣ 📜eslint.config.js
┣ 📜index.html
┣ 📜main.js
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜README.md
┗ 📜vite.config.js
```
---

### 1. 📂 node_modules

- **용도**: 프로젝트에서 사용하는 외부 라이브러리와 의존성들이 포함된 폴더입니다. npm install 명령을 통해 자동으로 생성되며, 코드에 사용되는 모든 패키지가 이곳에 설치됩니다.

### 2. 📂 src

- **프로젝트의 주요 소스 파일**이 포함된 폴더로, 웹사이트 기능 및 스타일 파일들이 여기에서 관리됩니다.

#### 📂 assets

- **정적 자산(assets) 폴더**로, 웹사이트에서 사용하는 이미지, 아이콘, 로고 파일 등을 저장합니다.
  - **📂 icons**: 웹사이트의 UI 아이콘을 용도에 따라 분류하여 저장합니다.
    - **📂 actions**: 사용자의 동작(예: 등록, 삭제 등)과 관련된 아이콘.
    - **📂 navigation**: 네비게이션 관련 아이콘(예: 홈, 검색 등).
    - **📂 social**: 소셜 미디어 관련 아이콘(예: 페이스북, 카카오 등).
    - **📂 status**: 상태 변경을 나타내는 아이콘(예: 알림).
    - **📂 ui**: 일반적인 사용자 인터페이스 요소 아이콘(예: 좋아요, 검색).
  - **📂 images**: 웹사이트에서 사용하는 일반 이미지 파일.
  - **📂 logos**: 웹사이트의 로고 이미지 파일.

#### 📂 features

- **웹사이트의 주요 기능 및 페이지별 소스 파일**이 포함된 폴더입니다. 각 폴더에는 해당 기능에 관련된 HTML, JS 파일이 포함됩니다.
  - **📂 Author**: 작가 소개 페이지.
    - **author.html**: 작가 소개 페이지의 구조 파일.
    - **authorPage.js**: 작가 소개 페이지에 대한 JavaScript 파일.
  - **📂 Detail**: 상세 정보 페이지.
    - **detail.html**: 상세 정보 페이지의 구조 파일.
    - **detailPage.js**: 상세 정보 페이지의 JavaScript 파일.
  - **📂 Discover**: 탐색(발견) 페이지.
    - **discover.html**: 탐색 페이지의 구조 파일.
    - **discoveryPage.js**: 탐색 페이지의 JavaScript 파일.
  - **📂 Home**: 홈 페이지.
    - **home.html**: 홈 페이지의 구조 파일.
    - **homePage.js**: 홈 페이지의 JavaScript 파일.
  - **📂 MyBox**: 사용자 저장함 페이지.
    - **myBox.html**: 마이 박스 페이지의 구조 파일.
    - **myBoxPage.js**: 마이 박스 페이지의 JavaScript 파일.
  - **📂 Start**: 시작 페이지.
    - **start.html**: 시작 페이지의 구조 파일.
    - **startPage.js**: 시작 페이지의 JavaScript 파일.
  - **📂 Write**: 글 작성 페이지.
    - **write.html**: 글 작성 페이지의 구조 파일.
    - **writePage.js**: 글 작성 페이지의 JavaScript 파일.

#### 📂 shared

- **재사용 가능한 컴포넌트 및 스타일 파일**을 관리하는 폴더입니다.
  - **📂 components**: 여러 페이지에서 공통으로 사용되는 UI 컴포넌트들이 포함된 폴더입니다.
    - **footer.js**: 푸터(footer) 컴포넌트.
    - **header.js**: 헤더(header) 컴포넌트.
    - **footer.html**: 푸터(footer) 마크업.
    - **header.html**: 헤더(header) 마크업.
  - **📂 styles**: 공통 스타일 시트를 포함한 폴더입니다.
    - **footer.css**: 푸터에 대한 CSS 스타일.
    - **header.css**: 헤더에 대한 CSS 스타일.
