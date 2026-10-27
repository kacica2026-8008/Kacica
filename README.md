# Kacica
케이시카


Remotion(React로 영상을 만드는 도구) 기반의 AI 실무 교육 영상 프로젝트입니다.

## 처음 한 번만

```bash
npm install
```

## 자주 쓰는 명령어

| 명령어 | 하는 일 |
|---|---|
| `npm run dev` | Remotion Studio 실행 (브라우저에서 미리보기·문구 수정) |
| `npm run render` | `out/hello.mp4`로 영상 출력 |
| `npm run render:cmc` | 가톨릭중앙의료원 강의 인트로를 `out/cmc-intro.mp4`로 출력 |
| `npm run still` | `out/thumbnail.png`로 썸네일 1장 출력 |
| `npm run lint` | 타입 검사 |

## 폴더 구조

```
src/
  index.ts          # 진입점 (수정할 일 거의 없음)
  Root.tsx          # 영상 목록 등록 (크기·길이·fps·기본 문구)
  HelloKacica.tsx   # 샘플 강의 인트로 영상 (10초, 1920x1080)
  CmcIntro.tsx      # 가톨릭중앙의료원 'AX시대 스마트한 AI활용 전략' 인트로 (10초, 1920x1080)
public/             # 이미지·음악 등 소스 파일 넣는 곳
out/                # 렌더링 결과 (git에 올라가지 않음)
```

## 새 영상 추가하는 법

1. `src/`에 새 컴포넌트 파일을 만든다 (예: `CardNews.tsx`).
2. `src/Root.tsx`에 `<Composition id="CardNews" ... />`를 추가한다.
3. `npx remotion render CardNews out/cardnews.mp4`로 출력한다.
