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

   .eslintrc.js

   ```js
   import globals from 'globals';
   import pluginJs from '@eslint/js';

   export default [
     { languageOptions: { globals: globals.browser } },
     pluginJs.configs.recommended,
     { rules: { 'no-unused-vars': 'warn' } },
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
📦brunch-story
┣ 📂.github
┃ ┗ 📂ISSUE_TEMPLATE
┃ ┃ ┣ 📜bug_report.md
┃ ┃ ┗ 📜enhancement_request.md
┣ 📂node_modules ...
┣ 📂public
┃ ┣ 📂assets
┃ ┃ ┣ 📂icons
┃ ┃ ┃ ┣ 📂actions
┃ ┃ ┃ ┣ 📂navigation
┃ ┃ ┃ ┃ ┣ 📜homeOff.svg
┃ ┃ ┃ ┃ ┣ 📜homeOn.svg
┃ ┃ ┃ ┃ ┣ 📜myBoxOff.svg
┃ ┃ ┃ ┃ ┣ 📜myBoxOn.svg
┃ ┃ ┃ ┃ ┣ 📜searchOff.svg
┃ ┃ ┃ ┃ ┣ 📜searchOn.svg
┃ ┃ ┃ ┃ ┣ 📜writeOff.svg
┃ ┃ ┃ ┃ ┗ 📜writeOn.svg
┃ ┃ ┃ ┣ 📂social
┃ ┃ ┃ ┃ ┣ 📜facebook.svg
┃ ┃ ┃ ┃ ┣ 📜kakao.svg
┃ ┃ ┃ ┃ ┗ 📜x.svg
┃ ┃ ┃ ┣ 📂status
┃ ┃ ┃ ┃ ┗ 📜new.svg
┃ ┃ ┃ ┗ 📂ui
┃ ┃ ┃ ┃ ┣ 📜doneOff.svg
┃ ┃ ┃ ┃ ┣ 📜doneOn.svg
┃ ┃ ┃ ┃ ┣ 📜exit.svg
┃ ┃ ┃ ┃ ┣ 📜eyeOff.svg
┃ ┃ ┃ ┃ ┣ 📜eyeOn.svg
┃ ┃ ┃ ┃ ┣ 📜formatAlignCenter.svg
┃ ┃ ┃ ┃ ┣ 📜formatAlignLeft.svg
┃ ┃ ┃ ┃ ┣ 📜formatAlignRight.svg
┃ ┃ ┃ ┃ ┣ 📜keyboard.svg
┃ ┃ ┃ ┃ ┣ 📜keyboard_hide.svg
┃ ┃ ┃ ┃ ┣ 📜likeOff.svg
┃ ┃ ┃ ┃ ┣ 📜likeOn.svg
┃ ┃ ┃ ┃ ┣ 📜next.svg
┃ ┃ ┃ ┃ ┣ 📜notice.svg
┃ ┃ ┃ ┃ ┣ 📜noticeOn.svg
┃ ┃ ┃ ┃ ┣ 📜picture.svg
┃ ┃ ┃ ┃ ┣ 📜registerDefault.svg
┃ ┃ ┃ ┃ ┣ 📜registerVariant.svg
┃ ┃ ┃ ┃ ┣ 📜search.svg
┃ ┃ ┃ ┃ ┣ 📜start.svg
┃ ┃ ┃ ┃ ┣ 📜subscribeOff.svg
┃ ┃ ┃ ┃ ┣ 📜subscribeOn.svg
┃ ┃ ┃ ┃ ┗ 📜up.svg
┃ ┃ ┣ 📂images
┃ ┃ ┗ 📂logos
┃ ┃ ┃ ┣ 📜default.svg
┃ ┃ ┃ ┣ 📜short.svg
┃ ┃ ┃ ┣ 📜symbol.svg
┃ ┃ ┃ ┗ 📜white.svg
┃ ┣ 📂html
┃ ┃ ┣ 📜author.html
┃ ┃ ┣ 📜detail.html
┃ ┃ ┣ 📜discover.html
┃ ┃ ┣ 📜home.html
┃ ┃ ┣ 📜myBox.html
┃ ┃ ┣ 📜start.html
┃ ┃ ┗ 📜write.html
┃ ┗ 📜index.html
┣ 📂src
┃ ┣ 📂components
┃ ┃ ┣ 📜Footer.js
┃ ┃ ┗ 📜Header.js
┃ ┣ 📂pages
┃ ┃ ┣ 📜AuthorPage.js
┃ ┃ ┣ 📜DetailPage.js
┃ ┃ ┣ 📜DiscoveryPage.js
┃ ┃ ┣ 📜HomePage.js
┃ ┃ ┣ 📜ProfilePage.js
┃ ┃ ┣ 📜StartPage.js
┃ ┃ ┗ 📜WritePage.js
┃ ┗ 📂styles
┃ ┃ ┣ 📜footer.css
┃ ┃ ┣ 📜header.css
┃ ┃ ┗ 📜main.css
┣ 📜.gitignore
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜README.md
┗ 📜vite.config.js
┗ 📜eslint.config.js
┗ 📜.prettierrc.js
```

## 📂 node_modules

용도: 프로젝트에 필요한 모든 외부 라이브러리와 프레임워크를 포함합니다. `npm install` 명령을 실행하면 자동으로 생성됩니다.

## 📂 public

- **assets**: 웹사이트에서 사용되는 모든 정적 자원을 저장합니다.
  - **icons**: 웹사이트 UI의 아이콘을 분류하여 저장합니다.
    - **actions**: 사용자 동작을 나타내는 아이콘 (예: 등록, 삭제 등).
    - **navigation**: 네비게이션에 사용되는 아이콘 (예: 홈, 검색, 글쓰기 등).
    - **social**: 소셜 미디어 관련 아이콘 (예: 페이스북, 카카오).
    - **status**: 상태 변경을 나타내는 아이콘 (예: 새로운 알림).
    - **ui**: 일반적인 사용자 인터페이스 요소 (예: 검색, 좋아요).
  - **images**: 웹사이트에서 사용하는 이미지 파일.
  - **logos**: 웹사이트 로고 파일.
- **html**: 각 페이지의 HTML 파일을 포함합니다. 이는 웹사이트의 각 섹션에 대한 구조를 제공합니다.
  - **author.html**: 작가 소개 페이지.
  - **detail.html**: 상세 정보 페이지.
  - **discover.html**: 발견(탐색) 페이지.
  - **home.html**: 홈 페이지.
  - **myBox.html**: 마이 박스 페이지.
  - **start.html**: 시작 페이지.
  - **write.html**: 글 작성 페이지.
  - **index.html**: 웹사이트의 진입점. 웹사이트를 방문했을 때 처음으로 로드되는 파일입니다.

## 📂 src

- **components**: 재사용 가능한 UI 컴포넌트.
  - **Footer.js**: 페이지 하단에 표시되는 푸터 섹션.
  - **Header.js**: 페이지 상단에 표시되는 헤더 섹션.
- **pages**: 각 웹 페이지의 스크립트 파일.
  - **AuthorPage.js**: 작가 소개 페이지.
  - **DetailPage.js**: 상세 정보 페이지.
  - **DiscoveryPage.js**: 발견(탐색) 페이지.
  - **HomePage.js**: 홈 페이지.
  - **ProfilePage.js**: 사용자 프로필 페이지.
  - **StartPage.js**: 시작 페이지.
  - **WritePage.js**: 글 작성 페이지.
- **styles**: CSS 스타일 시트.
  - **footer.css**: 푸터에 적용되는 스타일.
  - **header.css**: 헤더에 적용되는 스타일.
  - **main.css**: 전체 사이트에 공통적으로 적용되는 스타일.

## 기타 파일

- **.gitignore**: Git에서 추적하지 않을 파일을 정의합니다.
- **eslint.config.js**: 코드 품질을 보장하기 위한 ESLint 설정 파일.
- **package-lock.json**: 프로젝트 의존성 버전을 고정하는 파일.
- **package.json**: 프로젝트의 메타데이터와 의존성 목록을 관리하는 파일.
- **README.md**: 프로젝트 설명 파일.
- **vite.config.js**: Vite 번들러 설정 파일.
- **.prettierrc.js**: Prettier 컨벤션 설정 파일.
