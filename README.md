# P Book Club Archive

독서모임에서 읽은 책의 평균 평점과 한줄 평을 바탕으로, 질문형으로 책을 추천해주는 정적 웹사이트입니다.

## 파일 구성

- `index.html`: 메인 화면
- `style.css`: 스타일
- `script.js`: 추천 질문과 추천 로직
- `books-data.js`: TSV에서 추출한 실제 독서모임 데이터
- `parse_books.rb`: TSV를 웹앱 데이터로 변환하는 추출 스크립트

## 실행

빌드 없이 `index.html`을 브라우저에서 열면 됩니다.

## 데이터 갱신

다운로드한 TSV 파일이 최신 상태라면 아래 명령으로 `books-data.js`를 다시 만들 수 있습니다.

```sh
ruby parse_books.rb | ruby -rjson -e 'books=JSON.parse(STDIN.read); File.write("books-data.js", "window.bookClubBooks = " + JSON.pretty_generate(books) + ";\n")'
```

## 배포

정적 파일만 있으므로 `GitHub Pages`, `Netlify`, `Vercel` 중 아무 곳에나 바로 배포할 수 있습니다.
