const rawBooks = Array.isArray(window.bookClubBooks) ? window.bookClubBooks : [];

const members = ["강세영", "김민정", "박수인", "유예림", "유하림"];

const keywordGroups = {
  healing: ["행복", "위로", "다정", "사랑", "따뜻", "성장", "꽃", "위안", "회복", "마음", "치료", "용기"],
  intense: ["불쾌", "악마", "범죄", "가해자", "고통", "멸망", "흑역사", "잔인", "상실", "아프", "무섭", "죽음"],
  imaginative: ["우주", "외계", "sf", "과학", "식물", "미생물", "별", "디지몬", "프랑켄슈타인", "상상"],
  social: ["정치", "사회", "민주주의", "현실", "역사", "국가", "미래", "교양"],
  relationship: ["가족", "사랑", "친구", "동생", "관계", "사람", "우리", "각자"],
  thoughtful: ["철학", "생각", "문학", "해석", "이유", "삶", "세계", "존재", "의미", "난해"],
  accessible: ["재밌", "술술", "가볍", "입문", "교양서", "영업", "쉽", "준비서"],
  literary: ["소설", "문학", "문장", "고전", "에세이", "시", "작별", "여름"]
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
    id: "mood",
    title: "지금 가장 끌리는 독서 분위기는?",
    description: "오늘의 컨디션에 가까운 톤을 골라보세요.",
    options: [
      {
        id: "mood-healing",
        title: "따뜻하고 위로되는 책",
        description: "다정하고 회복감 있는 분위기가 좋다",
        weights: { healing: 3, relationship: 2 }
      },
      {
        id: "mood-intense",
        title: "묵직하고 강렬한 책",
        description: "읽고 나서 오래 남는 밀도를 원한다",
        weights: { intense: 3, thoughtful: 2, social: 1 }
      },
      {
        id: "mood-imaginative",
        title: "낯선 상상력이 있는 책",
        description: "우주, SF, 판타지 같은 장치가 있으면 좋다",
        weights: { imaginative: 3, accessible: 1 }
      }
    ]
  },
  {
    id: "talk",
    title: "독서모임에서 어떤 이야기를 나누고 싶나요?",
    description: "대화 포인트가 될 만한 요소를 골라보세요.",
    options: [
      {
        id: "talk-people",
        title: "관계와 감정",
        description: "인물의 마음과 관계 변화를 나누고 싶다",
        weights: { relationship: 3, healing: 1, literary: 1 }
      },
      {
        id: "talk-ideas",
        title: "아이디어와 세계관",
        description: "과학, 상상력, 낯선 설정이 흥미롭다",
        weights: { imaginative: 3, thoughtful: 1 }
      },
      {
        id: "talk-society",
        title: "사회와 현실",
        description: "현실과 연결되는 주제가 좋다",
        weights: { social: 3, thoughtful: 2 }
      }
    ]
  },
  {
    id: "pace",
    title: "읽는 호흡은 어느 쪽이 편한가요?",
    description: "이번 달 독서 리듬에 맞는 난이도를 골라보세요.",
    options: [
      {
        id: "pace-easy",
        title: "비교적 술술 읽히는 책",
        description: "몰입감 있고 입문하기 쉬운 쪽이 좋다",
        weights: { accessible: 3, healing: 1 }
      },
      {
        id: "pace-deep",
        title: "곱씹게 되는 책",
        description: "문장과 주제를 오래 생각하고 싶다",
        weights: { thoughtful: 3, literary: 2, intense: 1 }
      }
    ]
  },
  {
    id: "rating",
    title: "평점 취향은 어떤 쪽인가요?",
    description: "모임에서 이미 검증된 책인지, 개성 강한 책인지 정해보세요.",
    options: [
      {
        id: "rating-loved",
        title: "평균 평점이 높은 책",
        description: "모임에서 확실히 반응이 좋았던 책이 좋다",
        weights: { crowd: 3 }
      },
      {
        id: "rating-niche",
        title: "조금 호불호가 있어도 괜찮다",
        description: "취향이 뚜렷한 책도 시도해보고 싶다",
        weights: { niche: 3, intense: 1 }
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

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function countMatches(text, terms) {
  return terms.reduce((score, term) => score + (text.includes(term) ? 1 : 0), 0);
}

function inferGenre(book) {
  if (genreOverrides[book.title]) {
    return genreOverrides[book.title];
  }

  const text = `${book.title} ${book.author} ${book.reviews.map((review) => review.review || "").join(" ")}`.toLowerCase();

  if (countMatches(text, ["우주", "sf", "과학", "외계", "별"]) >= 1) return "SF";
  if (countMatches(text, ["정치", "사회", "민주주의", "역사"]) >= 1) return "사회 교양";
  if (countMatches(text, ["에세이", "행복", "어른", "심리"]) >= 1) return "에세이";
  if (countMatches(text, ["문학", "작별", "여름", "고전"]) >= 1) return "문학";
  if (countMatches(text, ["악마", "범죄", "불쾌", "미스터리"]) >= 1) return "스릴러";
  return "소설";
}

function getProfile(book) {
  const text = `${book.title} ${book.author} ${book.reviews.map((review) => review.review || "").join(" ")}`.toLowerCase();
  const averageRating = Number(book.averageRating) || 0;

  const profile = {
    healing: countMatches(text, keywordGroups.healing),
    intense: countMatches(text, keywordGroups.intense),
    imaginative: countMatches(text, keywordGroups.imaginative),
    social: countMatches(text, keywordGroups.social),
    relationship: countMatches(text, keywordGroups.relationship),
    thoughtful: countMatches(text, keywordGroups.thoughtful),
    accessible: countMatches(text, keywordGroups.accessible),
    literary: countMatches(text, keywordGroups.literary),
    crowd: averageRating >= 4 ? 3 : averageRating >= 3.6 ? 2 : 1,
    niche: averageRating <= 3 ? 3 : averageRating <= 3.4 ? 2 : 0
  };

  if (averageRating >= 4.1) {
    profile.healing += 1;
    profile.accessible += 1;
  }

  if (averageRating >= 4.3) {
    profile.thoughtful += 1;
  }

  return profile;
}

function buildSummary(book) {
  const topReviews = [...book.reviews]
    .sort((left, right) => (right.rating || 0) - (left.rating || 0))
    .slice(0, 2)
    .map((review) => review.review)
    .filter(Boolean);

  if (topReviews.length === 0) {
    return "독서모임 리뷰가 아직 충분하지 않아 요약을 준비 중입니다.";
  }

  return `${topReviews.join(" / ")} 라는 인상이 많이 남은 책입니다.`;
}

function buildMoodLabel(profile) {
  const entries = [
    ["healing", "따뜻하고 위로되는 분위기"],
    ["intense", "묵직하고 강렬한 분위기"],
    ["imaginative", "상상력이 선명한 분위기"],
    ["thoughtful", "생각거리가 긴 여운"]
  ];

  return entries.sort((left, right) => profile[right[0]] - profile[left[0]])[0][1];
}

const books = rawBooks.map((book) => {
  const profile = getProfile(book);
  return {
    ...book,
    id: slugify(`${book.year}-${book.title}`),
    genre: inferGenre(book),
    profile,
    mood: buildMoodLabel(profile),
    summary: buildSummary(book),
    reviewCount: book.reviews.filter((review) => review.review).length,
    featuredReview: [...book.reviews].sort((left, right) => (right.rating || 0) - (left.rating || 0))[0]?.review || "",
    strongestMember: [...book.reviews].sort((left, right) => (right.rating || 0) - (left.rating || 0))[0]?.member || ""
  };
});

function renderQuestions() {
  quizForm.innerHTML = questions
    .map((question, index) => {
      const optionsMarkup = question.options
        .map((option) => `
          <label class="option-card" for="${option.id}">
            <input id="${option.id}" type="radio" name="${question.id}" value="${option.id}">
            <span class="option-label">
              <strong>${option.title}</strong>
              <span>${option.description}</span>
            </span>
          </label>
        `)
        .join("");

      return `
        <fieldset class="question-card">
          <legend class="question-title">${index + 1}. ${question.title}</legend>
          <p class="question-copy">${question.description}</p>
          <div class="option-list">${optionsMarkup}</div>
        </fieldset>
      `;
    })
    .join("");
}

function getSelections() {
  return questions.map((question) => {
    const selected = quizForm.querySelector(`input[name="${question.id}"]:checked`);
    if (!selected) {
      return null;
    }

    return question.options.find((option) => option.id === selected.value) ?? null;
  });
}

function getBestMatch(selectedOptions) {
  return books
    .map((book) => {
      let score = (Number(book.averageRating) || 0) * 14;

      selectedOptions.forEach((option) => {
        Object.entries(option.weights).forEach(([key, weight]) => {
          score += (book.profile[key] || 0) * weight;
        });
      });

      return { book, score };
    })
    .sort((left, right) => right.score - left.score);
}

function buildReasons(book, selectedOptions) {
  const dimensions = selectedOptions.flatMap((option) => Object.keys(option.weights));
  const uniqueDimensions = [...new Set(dimensions)];

  return uniqueDimensions
    .map((dimension) => ({
      dimension,
      score: book.profile[dimension] || 0
    }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map((item) => {
      if (item.dimension === "healing") return "위로, 회복, 다정함을 떠올리게 하는 리뷰가 많이 남아 있습니다.";
      if (item.dimension === "intense") return "강한 인상과 긴장감, 상실감 같은 무게감이 분명합니다.";
      if (item.dimension === "imaginative") return "과학적 상상력이나 낯선 세계관을 기대할 수 있습니다.";
      if (item.dimension === "social") return "정치, 역사, 현실과 연결되는 대화 소재가 뚜렷합니다.";
      if (item.dimension === "relationship") return "사람 사이의 감정과 관계를 이야기하기 좋습니다.";
      if (item.dimension === "thoughtful") return "읽고 난 뒤 오래 곱씹게 되는 성격이 강합니다.";
      if (item.dimension === "accessible") return "입문하기 쉽고 비교적 술술 읽히는 편에 가깝습니다.";
      if (item.dimension === "literary") return "문장과 분위기를 중심으로 감상하기 좋은 책입니다.";
      if (item.dimension === "crowd") return "모임 평균 평점이 높아 이미 반응이 검증된 편입니다.";
      if (item.dimension === "niche") return "호불호가 있을 수 있지만 취향이 강하게 드러나는 책입니다.";
      return "선택한 취향과 잘 맞는 요소가 있습니다.";
    });
}

function renderResult(match, selectedOptions) {
  const [topMatch, ...others] = match;
  const { book, score } = topMatch;
  const selectedTitles = selectedOptions.map((option) => option.title).join(", ");
  const reasons = buildReasons(book, selectedOptions);
  const alternatives = others.slice(0, 3);

  resultCard.classList.remove("empty");
  resultCard.innerHTML = `
    <p class="tag">Best Match</p>
    <div class="result-header">
      <div>
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author || "저자 정보 미정"} · ${book.year}</p>
      </div>
      <div class="score-badge">
        <strong>${Number(book.averageRating).toFixed(2)}</strong>
        <span>평점</span>
      </div>
    </div>

    <div class="meta-grid">
      <div class="meta-item">
        <span>장르</span>
        <span>${book.genre}</span>
      </div>
      <div class="meta-item">
        <span>분위기</span>
        <span>${book.mood}</span>
      </div>
      <div class="meta-item">
        <span>호흡</span>
        <span>${book.profile.accessible >= book.profile.thoughtful ? "술술 읽힘" : "곱씹는 편"}</span>
      </div>
    </div>

    <div class="book-reason-box">
      <h3>왜 이 책을 추천하나요?</h3>
      <p class="book-reason">
        선택한 답변인 ${selectedTitles}와 가장 잘 맞았습니다. 추천 적합도는 ${Math.round(score)}점으로 계산되었습니다.
      </p>
      <ul class="reason-list">
        ${reasons.map((reason) => `<li>${reason}</li>`).join("")}
      </ul>
    </div>

    <div class="book-summary-box">
      <h3>모임 인상 요약</h3>
      <p class="book-summary">${book.summary}</p>
    </div>

    <div class="book-quote-box">
      <h3>대표 한줄 평</h3>
      <p class="book-quote">${book.featuredReview || "리뷰 준비 중입니다."}</p>
      <p class="book-author">${book.strongestMember ? `${book.strongestMember}의 높은 평점 리뷰` : ""}</p>
    </div>

    <div class="book-summary-box">
      <h3>다른 후보</h3>
      <ol class="mini-book-list">
        ${alternatives.map((item) => `<li>${item.book.title} (${Number(item.book.averageRating).toFixed(2)}점)</li>`).join("")}
      </ol>
    </div>

    <div class="match-chip-row">
      <span class="match-chip">리뷰 ${book.reviewCount}개 반영</span>
      <span class="match-chip">모임 평균 ${Number(book.averageRating).toFixed(2)}점</span>
      <span class="match-chip">${book.genre}</span>
    </div>
  `;
}

function showIncompleteMessage() {
  resultCard.classList.remove("empty");
  resultCard.innerHTML = `
    <p class="tag">Need Answers</p>
    <div class="book-reason-box">
      <h3>질문이 아직 남아 있습니다</h3>
      <p class="book-reason">모든 질문에 답해야 더 정확한 추천을 계산할 수 있습니다.</p>
    </div>
  `;
}

function resetQuiz() {
  quizForm.reset();
  resultCard.className = "result-card empty";
  resultCard.innerHTML = "<p class=\"empty-state\">왼쪽 질문에 답하면 여기에서 추천 결과를 확인할 수 있습니다.</p>";
}

function renderBookshelf() {
  const topBooks = [...books]
    .sort((left, right) => Number(right.averageRating) - Number(left.averageRating))
    .slice(0, 8);

  bookshelf.innerHTML = topBooks
    .map((book) => `
      <article class="shelf-card">
        <p class="tag">${book.year}</p>
        <h3>${book.title}</h3>
        <p>${book.author || "저자 정보 미정"} · ${book.genre}</p>
        <p>${book.featuredReview || book.summary}</p>
        <span class="shelf-rating">${Number(book.averageRating).toFixed(2)} / 5</span>
      </article>
    `)
    .join("");
}

function renderStats() {
  const years = [...new Set(books.map((book) => book.year))].sort();
  statsCopy.textContent = `${books.length}권의 독서모임 기록과 ${members.length}명의 리뷰를 바탕으로 추천합니다. (${years[0]}-${years[years.length - 1]})`;
}

recommendButton.addEventListener("click", () => {
  const selectedOptions = getSelections();

  if (selectedOptions.some((option) => option === null)) {
    showIncompleteMessage();
    return;
  }

  const matches = getBestMatch(selectedOptions);
  renderResult(matches, selectedOptions);
});

resetButton.addEventListener("click", resetQuiz);

renderQuestions();
renderBookshelf();
renderStats();
