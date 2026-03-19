const rawBooks = Array.isArray(window.bookClubBooks) ? window.bookClubBooks : [];

const members = ["강세영", "김민정", "박수인", "유예림", "유하림"];

const keywordGroups = {
  warm: ["행복", "위로", "다정", "사랑", "회복", "마음", "용기", "성장", "꽃", "편안"],
  sharp: ["고통", "상실", "범죄", "불쾌", "악마", "죽음", "가해자", "폭력", "흑역사", "잔인"],
  strange: ["우주", "외계", "sf", "과학", "디지몬", "프랑켄슈타인", "식물", "미생물", "상상", "환상"],
  intimate: ["가족", "친구", "동생", "관계", "사람", "우리", "마음", "사랑"],
  idea: ["철학", "생각", "세계", "이유", "존재", "교양", "과학", "역사", "정치"],
  civic: ["정치", "사회", "국가", "민주주의", "현실", "역사", "미래", "광주"],
  breezy: ["재밌", "가볍", "쉽", "입문", "술술", "영업", "준비서"],
  dense: ["난해", "문학", "문장", "고전", "해석", "작별", "의미"],
  comforting: ["다정", "행복", "위로", "회복", "용기", "따뜻"],
  haunting: ["상실", "고통", "멸망", "죽음", "불쾌", "아프"],
  debate: ["사회", "정치", "철학", "실험", "윤리", "범죄", "현실"],
  classic: ["고전", "문학", "에세이", "소설", "편지", "심리"],
  adventurous: ["우주", "모험", "외계", "세계", "식물", "디지몬", "과학"],
  offbeat: ["불쾌", "악마", "미숫가루", "프랑켄슈타인", "블랙미러", "괴이"]
};

const genreOverrides = {
  "의외로 사람들이 잘 모르는 정치": "정치 교양",
  "사랑을 지키는 법": "심리 에세이",
  "나인": "SF 청소년소설",
  "악마의 계약서는 만기되지 않는다": "판타지 로맨스",
  "종이 동물뭔": "SF 단편집",
  "작별하지 않는다": "문학",
  "아무튼 디지몬": "덕질 에세이",
  "두고 온 여름": "단편 문학",
  "홍학의 자리": "스릴러",
  "아주 희미한 빛으로도": "문학",
  "오만과 편견": "고전 문학",
  "나는 내가 왜 살아야 하는지 몰랐습니다": "에세이",
  "가여운 것들": "고딕 SF",
  "뇌의 흑역사": "과학 교양",
  "에이스": "사회문화",
  "긴긴밤": "성장소설",
  "꿰맨 눈의 마을": "호러 소설",
  "과학을 보다 2": "과학 교양",
  "이처럼 사소한 것들": "문학",
  "수확자": "디스토피아 SF",
  "소년이 온다": "문학",
  "오베라는 남자": "힐링 소설",
  "쇼코의 미소": "단편 문학",
  "어떤 어른": "에세이",
  "어떤 생각들은 나의 세계가 된다": "인문 에세이",
  "지구 끝의 온실": "SF 소설",
  "프로젝트 헤일메리": "하드 SF",
  "처음 하는 심리학 공부": "심리 교양",
  "단 한사람": "문학",
  "천문학자는 별을 보지 않는다": "과학 에세이",
  "멍청해지기 전에 읽는 뇌과학": "뇌과학 교양",
  "제철 행복": "에세이",
  "반 고흐, 영혼의 편지": "예술 에세이"
};

const questions = [
  {
    id: "vibe",
    title: "지금 가장 원하는 독서 무드는?",
    description: "책에서 어떤 온도를 느끼고 싶은지 고르세요.",
    options: [
      {
        id: "vibe-warm",
        title: "부드럽고 다정한 결",
        description: "마음이 정리되고 조금 편안해졌으면 좋겠다",
        semantic: { warm: 3, comforting: 2, intimate: 1 }
      },
      {
        id: "vibe-sharp",
        title: "날카롭고 묵직한 결",
        description: "강한 인상과 밀도 있는 정서를 원한다",
        semantic: { sharp: 3, haunting: 2, dense: 1 }
      },
      {
        id: "vibe-strange",
        title: "낯설고 선명한 결",
        description: "상상력이나 설정의 신선함이 끌린다",
        semantic: { strange: 3, adventurous: 2, idea: 1 }
      }
    ]
  },
  {
    id: "conversation",
    title: "독서모임에서 어떤 이야기를 더 하고 싶어?",
    description: "대화의 중심이 될 포인트를 골라보세요.",
    options: [
      {
        id: "conversation-intimate",
        title: "감정과 관계",
        description: "인물의 마음, 관계 변화, 개인의 상처",
        semantic: { intimate: 3, warm: 1, comforting: 1 }
      },
      {
        id: "conversation-idea",
        title: "아이디어와 시선",
        description: "설정, 개념, 관점의 새로움이 중요하다",
        semantic: { idea: 3, strange: 1, dense: 1 }
      },
      {
        id: "conversation-civic",
        title: "사회와 현실",
        description: "현실과 연결되는 주제, 시대감, 문제의식",
        semantic: { civic: 3, debate: 2, sharp: 1 }
      }
    ]
  },
  {
    id: "rhythm",
    title: "이번에는 어떤 호흡으로 읽고 싶어?",
    description: "독서 템포와 집중도를 선택하세요.",
    options: [
      {
        id: "rhythm-breezy",
        title: "가볍게 몰입하는 편",
        description: "비교적 술술 읽히는 쪽이 좋다",
        semantic: { breezy: 3, warm: 1, adventurous: 1 }
      },
      {
        id: "rhythm-balanced",
        title: "적당히 균형 잡힌 편",
        description: "부담은 적지만 생각거리는 있었으면 좋겠다",
        semantic: { idea: 2, intimate: 1, debate: 1 }
      },
      {
        id: "rhythm-dense",
        title: "천천히 곱씹는 편",
        description: "문장과 주제를 오래 붙잡고 싶다",
        semantic: { dense: 3, haunting: 1, debate: 1 }
      }
    ]
  },
  {
    id: "aftertaste",
    title: "다 읽고 남았으면 하는 잔향은?",
    description: "책을 덮은 뒤의 느낌을 상상해보세요.",
    options: [
      {
        id: "aftertaste-comforting",
        title: "위로와 회복",
        description: "마음이 조금 정돈되는 느낌",
        semantic: { comforting: 3, warm: 2, intimate: 1 }
      },
      {
        id: "aftertaste-debate",
        title: "계속 얘기하고 싶은 질문",
        description: "모임에서 의견이 갈려도 좋다",
        semantic: { debate: 3, civic: 1, idea: 1 }
      },
      {
        id: "aftertaste-haunting",
        title: "쉽게 안 지워지는 여운",
        description: "오래 남는 감각이나 이미지가 좋다",
        semantic: { haunting: 3, sharp: 2, dense: 1 }
      }
    ]
  },
  {
    id: "selection",
    title: "오늘의 픽 성향은 어느 쪽이야?",
    description: "안정적인 선택인지, 낯선 선택인지 골라주세요.",
    options: [
      {
        id: "selection-classic",
        title: "검증된 쪽이 좋다",
        description: "평점도 괜찮고 실패 확률이 낮은 책",
        semantic: { classic: 2, crowd: 3 }
      },
      {
        id: "selection-adventurous",
        title: "조금 새로워도 좋다",
        description: "낯선 설정이나 분위기도 환영",
        semantic: { adventurous: 3, strange: 1, offbeat: 1 }
      },
      {
        id: "selection-offbeat",
        title: "취향 강한 책도 좋다",
        description: "호불호가 있어도 기억에 남는 책",
        semantic: { offbeat: 3, sharp: 1, niche: 3 }
      }
    ]
  }
];

const quizForm = document.querySelector("#quiz-form");
const recommendButton = document.querySelector("#recommend-button");
const resetButton = document.querySelector("#reset-button");
const resultCard = document.querySelector("#result-card");
const bookshelf = document.querySelector("#bookshelf");
const statsCopy = document.querySelector("#stats-copy");
const progressText = document.querySelector("#progress-text");
const archiveCount = document.querySelector("#archive-count");
const memberCount = document.querySelector("#member-count");

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function countMatches(text, terms) {
  return terms.reduce((score, term) => score + (text.includes(term) ? 1 : 0), 0);
}

function toBase3(value, length) {
  const digits = new Array(length).fill(0);
  let current = value;

  for (let index = length - 1; index >= 0; index -= 1) {
    digits[index] = current % 3;
    current = Math.floor(current / 3);
  }

  return digits;
}

function inferGenre(book) {
  if (genreOverrides[book.title]) {
    return genreOverrides[book.title];
  }

  const text = `${book.title} ${book.author} ${book.reviews.map((review) => review.review || "").join(" ")}`.toLowerCase();

  if (countMatches(text, ["우주", "sf", "과학", "외계", "별"]) >= 1) return "SF";
  if (countMatches(text, ["정치", "사회", "민주주의", "역사"]) >= 1) return "사회 교양";
  if (countMatches(text, ["에세이", "행복", "심리"]) >= 1) return "에세이";
  if (countMatches(text, ["범죄", "불쾌", "악마", "스릴"]) >= 1) return "스릴러";
  return "소설";
}

function buildProfile(book) {
  const text = `${book.title} ${book.author} ${book.reviews.map((review) => review.review || "").join(" ")}`.toLowerCase();
  const averageRating = Number(book.averageRating) || 0;

  return {
    warm: countMatches(text, keywordGroups.warm),
    sharp: countMatches(text, keywordGroups.sharp),
    strange: countMatches(text, keywordGroups.strange),
    intimate: countMatches(text, keywordGroups.intimate),
    idea: countMatches(text, keywordGroups.idea),
    civic: countMatches(text, keywordGroups.civic),
    breezy: countMatches(text, keywordGroups.breezy),
    dense: countMatches(text, keywordGroups.dense),
    comforting: countMatches(text, keywordGroups.comforting),
    haunting: countMatches(text, keywordGroups.haunting),
    debate: countMatches(text, keywordGroups.debate),
    classic: countMatches(text, keywordGroups.classic) + (averageRating >= 4 ? 2 : 0),
    adventurous: countMatches(text, keywordGroups.adventurous),
    offbeat: countMatches(text, keywordGroups.offbeat),
    crowd: averageRating >= 4.1 ? 3 : averageRating >= 3.6 ? 2 : 1,
    niche: averageRating <= 3 ? 3 : averageRating <= 3.4 ? 2 : 0
  };
}

function topReview(book) {
  return [...book.reviews].sort((left, right) => (right.rating || 0) - (left.rating || 0))[0] || null;
}

function buildSummary(book) {
  const reviews = [...book.reviews]
    .sort((left, right) => (right.rating || 0) - (left.rating || 0))
    .slice(0, 2)
    .map((review) => review.review)
    .filter(Boolean);

  if (reviews.length === 0) {
    return "리뷰 데이터가 아직 충분하지 않습니다.";
  }

  return `${reviews.join(" / ")} 라는 인상이 남은 책입니다.`;
}

function buildMood(profile) {
  const moodPairs = [
    ["warm", "부드럽고 다정한 무드"],
    ["sharp", "묵직하고 선명한 무드"],
    ["strange", "낯설고 신선한 무드"],
    ["dense", "오래 곱씹는 무드"]
  ];

  return [...moodPairs].sort((left, right) => profile[right[0]] - profile[left[0]])[0][1];
}

function buildBookRoute(index) {
  return toBase3(index, questions.length);
}

const books = rawBooks.map((book, index) => {
  const profile = buildProfile(book);
  const highlightedReview = topReview(book);

  return {
    ...book,
    id: slugify(`${book.year}-${book.title}`),
    genre: inferGenre(book),
    profile,
    mood: buildMood(profile),
    summary: buildSummary(book),
    route: buildBookRoute(index),
    reviewCount: book.reviews.length,
    topReview: highlightedReview?.review || "",
    topReviewer: highlightedReview?.member || "",
    topRating: highlightedReview?.rating || Number(book.averageRating) || 0
  };
});

function renderQuestions() {
  quizForm.innerHTML = questions
    .map((question, questionIndex) => {
      const optionsMarkup = question.options
        .map((option, optionIndex) => `
          <label class="option-card" for="${option.id}">
            <input id="${option.id}" data-question-index="${questionIndex}" data-option-index="${optionIndex}" type="radio" name="${question.id}" value="${option.id}">
            <span class="option-label">
              <strong>${option.title}</strong>
              <span>${option.description}</span>
            </span>
          </label>
        `)
        .join("");

      return `
        <fieldset class="question-card">
          <legend class="question-title">${questionIndex + 1}. ${question.title}</legend>
          <p class="question-copy">${question.description}</p>
          <div class="option-list">${optionsMarkup}</div>
        </fieldset>
      `;
    })
    .join("");
}

function getSelections() {
  return questions.map((question, questionIndex) => {
    const selected = quizForm.querySelector(`input[name="${question.id}"]:checked`);

    if (!selected) {
      return null;
    }

    const optionIndex = Number(selected.dataset.optionIndex);
    return {
      questionIndex,
      optionIndex,
      question,
      option: question.options[optionIndex]
    };
  });
}

function semanticScore(book, selections) {
  let score = (Number(book.averageRating) || 0) * 8;

  selections.forEach(({ option }) => {
    Object.entries(option.semantic).forEach(([key, weight]) => {
      score += (book.profile[key] || 0) * weight;
    });
  });

  return score;
}

function routeScore(book, selections) {
  return selections.reduce((score, selection, index) => {
    return score + (book.route[index] === selection.optionIndex ? 120 : 0);
  }, 0);
}

function getMatches(selections) {
  return books
    .map((book) => {
      const semantic = semanticScore(book, selections);
      const route = routeScore(book, selections);
      return {
        book,
        score: semantic + route,
        semantic,
        route
      };
    })
    .sort((left, right) => right.score - left.score);
}

function explainChoice(selection) {
  return selection.option.title;
}

function buildReasons(match, selections) {
  const { book, route, semantic } = match;
  const reasons = [];

  reasons.push(`선택한 답변과의 매칭 점수가 높았습니다. 질문 조합과의 경로 일치 점수는 ${route}점입니다.`);

  const rankedTraits = [
    ["warm", "다정함과 회복감이 남는 리뷰가 많습니다."],
    ["sharp", "강한 인상과 묵직한 정서를 기대할 수 있습니다."],
    ["strange", "설정이나 상상력의 신선함이 살아 있습니다."],
    ["intimate", "감정과 관계를 중심으로 이야기하기 좋습니다."],
    ["idea", "아이디어와 관점을 두고 대화가 길게 이어질 만합니다."],
    ["civic", "현실과 사회에 대한 대화 포인트가 분명합니다."],
    ["dense", "천천히 곱씹을수록 재미가 커지는 타입입니다."],
    ["comforting", "읽고 나서 정서적으로 정돈되는 느낌이 있습니다."],
    ["haunting", "쉽게 사라지지 않는 여운이 강합니다."],
    ["debate", "독서모임에서 의견이 갈릴 만한 소재가 살아 있습니다."]
  ]
    .map(([key, copy]) => ({ key, copy, value: book.profile[key] || 0 }))
    .filter((item) => item.value > 0)
    .sort((left, right) => right.value - left.value)
    .slice(0, 2);

  rankedTraits.forEach((item) => reasons.push(item.copy));

  reasons.push(`의미 기반 점수는 ${Math.round(semantic)}점으로 계산되었습니다.`);

  return reasons;
}

function buildAlternativeList(matches) {
  return matches.slice(1, 4).map((item) => {
    return `<li>${item.book.title} · ${Number(item.book.averageRating).toFixed(2)}점</li>`;
  }).join("");
}

function renderResult(matches, selections) {
  const [bestMatch] = matches;
  const { book } = bestMatch;
  const reasons = buildReasons(bestMatch, selections);
  const selectedLabels = selections.map((selection) => explainChoice(selection)).join(" · ");
  const confidence = Math.min(99, Math.round((bestMatch.score / 680) * 100));

  resultCard.classList.remove("empty");
  resultCard.innerHTML = `
    <div class="pill-row">
      <span class="tag">Best Match</span>
      <span class="route-pill">${selectedLabels}</span>
    </div>

    <div class="result-header">
      <div>
        <h3 class="result-title">${book.title}</h3>
        <p class="result-subtitle">${book.author || "저자 정보 미정"} · ${book.year}</p>
      </div>
      <div class="score-panel">
        <strong>${Number(book.averageRating).toFixed(2)}</strong>
        <span>club rating</span>
      </div>
    </div>

    <div class="meta-grid">
      <div class="meta-card">
        <strong>장르</strong>
        <span>${book.genre}</span>
      </div>
      <div class="meta-card">
        <strong>무드</strong>
        <span>${book.mood}</span>
      </div>
      <div class="meta-card">
        <strong>추천 강도</strong>
        <span>${confidence}%</span>
      </div>
    </div>

    <div class="result-stack">
      <section class="result-module">
        <h3>왜 이 책이 나왔나</h3>
        <ul class="reason-list">
          ${reasons.map((reason) => `<li>${reason}</li>`).join("")}
        </ul>
      </section>

      <section class="result-module">
        <h3>모임에 남은 인상</h3>
        <p class="result-copy">${book.summary}</p>
      </section>

      <section class="result-module">
        <h3>대표 한줄 평</h3>
        <p class="result-quote">${book.topReview || "아직 대표 리뷰가 없습니다."}</p>
        <p class="review-credit">${book.topReviewer ? `${book.topReviewer} · ${Number(book.topRating).toFixed(1)}점` : ""}</p>
      </section>

      <section class="result-module">
        <h3>다른 후보</h3>
        <ol class="alt-list">
          ${buildAlternativeList(matches)}
        </ol>
      </section>

      <div class="match-pill-row">
        <span class="match-pill">리뷰 ${book.reviewCount}개 반영</span>
        <span class="match-pill">총점 ${Math.round(bestMatch.score)}점</span>
        <span class="match-pill">50권 전체 중 추천</span>
      </div>
    </div>
  `;
}

function showIncompleteMessage() {
  resultCard.classList.remove("empty");
  resultCard.innerHTML = `
    <div class="result-module">
      <h3>질문이 아직 남아 있어</h3>
      <p class="result-copy">다섯 문항에 모두 답해야 추천 경로가 완성됩니다.</p>
    </div>
  `;
}

function resetQuiz() {
  quizForm.reset();
  updateProgress();
  resultCard.className = "result-card empty";
  resultCard.innerHTML = "<p class=\"empty-state\">다섯 질문에 답하면 여기에서 추천 결과를 보여줍니다.</p>";
}

function renderBookshelf() {
  const sortedBooks = [...books].sort((left, right) => {
    if (right.year !== left.year) {
      return right.year - left.year;
    }

    return Number(right.averageRating) - Number(left.averageRating);
  });

  bookshelf.innerHTML = sortedBooks
    .map((book) => `
      <article class="shelf-card">
        <span class="year-chip">${book.year}</span>
        <h3>${book.title}</h3>
        <p>${book.author || "저자 정보 미정"} · ${book.genre}</p>
        <p>${book.topReview || book.summary}</p>
        <div class="shelf-meta">
          <span class="shelf-rating">${Number(book.averageRating).toFixed(2)} / 5</span>
          <span class="meta-copy">${book.reviewCount} reviews</span>
        </div>
      </article>
    `)
    .join("");
}

function updateProgress() {
  const answeredCount = getSelections().filter(Boolean).length;
  progressText.textContent = `${answeredCount} / ${questions.length}`;
}

function renderStats() {
  const years = [...new Set(books.map((book) => book.year))].sort((left, right) => left - right);

  archiveCount.textContent = `${books.length}권`;
  memberCount.textContent = `${members.length}명`;
  statsCopy.textContent = `${years[0]}년부터 ${years[years.length - 1]}년까지 쌓인 ${books.length}권의 기록을 바탕으로, 질문 조합 안에서 50권 전부가 추천될 수 있게 매칭 엔진을 구성했습니다.`;
}

recommendButton.addEventListener("click", () => {
  const selections = getSelections();

  if (selections.some((selection) => selection === null)) {
    showIncompleteMessage();
    return;
  }

  renderResult(getMatches(selections), selections);
});

resetButton.addEventListener("click", resetQuiz);
quizForm.addEventListener("change", updateProgress);

renderQuestions();
renderBookshelf();
renderStats();
updateProgress();
