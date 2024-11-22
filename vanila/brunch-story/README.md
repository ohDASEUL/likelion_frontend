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
   import { defineConfig } from "vite";
   import { resolve } from "path";

   export default defineConfig({
     root: "./public", // Vite 서버가 참조할 루트 디렉토리를 지정
     build: {
       rollupOptions: {
         input: {
           index: resolve(__dirname, "./public/index.html"), // 기본 index.html
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

## 📜 .gitignore

용도: Git 버전 관리에서 제외할 파일 및 폴더 목록을 지정합니다.

## 📂 .github/ISSUE_TEMPLATE

용도: 프로젝트에서 발생할 수 있는 다양한 이슈 유형(버그 보고, 기능 요청, 문서 개선 등)에 대한 템플릿을 제공합니다. 이 폴더에 저장된 템플릿들은 GitHub에서 새로운 이슈를 생성할 때 사용되어, 이슈 제출 과정을 표준화하고 정보의 일관성을 유지하는 데 도움을 줍니다.

## 📜 package-lock.json & 📜 package.json

용도: 프로젝트의 의존성 및 메타데이터를 관리합니다. `package.json`은 의존성 및 스크립트를 정의하고, `package-lock.json`은 설치된 패키지의 정확한 버전을 보장합니다.

## 📜 README.md

용도: 프로젝트 설명, 설정 및 사용 방법에 대한 안내서.

## 📜 vite.config.js

용도: Vite 프로젝트 구성을 위한 파일. 빌드 및 개발 서버 옵션 설정.
