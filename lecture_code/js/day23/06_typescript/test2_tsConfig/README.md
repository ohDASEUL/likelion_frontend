
## NPM - Node.js의 패키지 관리 도구
NPM은 Node.js의 패키지 관리 도구로, 패키지 설치, 삭제, 업데이트 등을 관리합니다.

### NPM 환경 파일: `package.json`
- NPM을 사용하여 관리되는 프로젝트를 초기화하면, 프로젝트 설정 파일로 `package.json` 파일이 자동으로 생성됩니다.

```bash
npm init
```

### 라이브러리 또는 도구 설치
- 필요한 라이브러리(package) 또는 도구(tool)를 설치할 때는 `npm install` 명령을 사용합니다. 
- `-D` 옵션을 사용하면 해당 패키지가 개발 도구로 등록되어 `package.json`에 자동으로 기록됩니다.

```bash
npm install -D typescript
```

### TypeScript 설정 파일 준비: `tsconfig.json`
- TypeScript 환경 설정 파일 `tsconfig.json`을 준비합니다.

```bash
npx tsc -init
```

### TypeScript 트랜스파일
- TypeScript 코드를 JavaScript로 트랜스파일(변환)하는 작업은 `npx tsc` 명령으로 수행합니다.

```bash
npx tsc
```
