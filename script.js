const rawBooks = Array.isArray(window.bookClubBooks) ? window.bookClubBooks : [];

const questionBlueprints = [
  {
    title: "지금 가장 끌리는 책의 결은 뭐야?",
    description: "첫 느낌에 가장 가까운 분위기를 골라줘.",
    options: [
      { key: "A", title: "부드럽고 다정한 책", copy: "감정선이 섬세하고 마음이 정리되는 쪽", weights: { warm: 3, comforting: 2, intimate: 1 } },
      { key: "B", title: "묵직하고 선명한 책", copy: "강한 인상과 오래 남는 여운이 있는 쪽", weights: { sharp: 3, haunting: 2, dense: 1 } },
      { key: "C", title: "낯설고 흥미로운 책", copy: "설정이나 세계관의 새로움이 살아 있는 쪽", weights: { strange: 3, adventurous: 2, idea: 1 } }
    ]
  },
  {
    title: "읽고 나서 어떤 이야기를 나누고 싶어?",
    description: "모임에서 더 길게 붙잡고 싶은 대화의 방향을 골라줘.",
    options: [
      { key: "A", title: "사람과 감정", copy: "관계, 상처, 회복 같은 이야기", weights: { intimate: 3, warm: 1, comforting: 1 } },
      { key: "B", title: "아이디어와 시선", copy: "새로운 관점이나 설정의 재미", weights: { idea: 3, strange: 1, dense: 1 } },
      { key: "C", title: "사회와 현실", copy: "현실과 맞닿은 문제의식", weights: { civic: 3, debate: 2, sharp: 1 } }
    ]
  },
  {
    title: "이번에는 어느 정도의 호흡이 좋아?",
    description: "책과 보내고 싶은 리듬을 골라줘.",
    options: [
      { key: "A", title: "술술 읽히는 편", copy: "빠르게 몰입되고 부담은 덜한 쪽", weights: { breezy: 3, warm: 1, adventurous: 1 } },
      { key: "B", title: "균형 잡힌 편", copy: "읽기 어렵진 않지만 생각할 거리는 있는 쪽", weights: { idea: 2, intimate: 1, debate: 1 } },
      { key: "C", title: "천천히 곱씹는 편", copy: "문장과 의미를 오래 붙잡는 쪽", weights: { dense: 3, haunting: 1, classic: 1 } }
    ]
  },
  {
    title: "책을 덮었을 때 어떤 느낌이 남았으면 해?",
    description: "마지막 장 이후의 감각을 떠올려줘.",
    options: [
      { key: "A", title: "위로와 정돈", copy: "마음이 조금 부드러워지는 느낌", weights: { comforting: 3, warm: 2, intimate: 1 } },
      { key: "B", title: "계속 대화하고 싶은 질문", copy: "의견이 갈려도 재밌는 느낌", weights: { debate: 3, idea: 1, civic: 1 } },
      { key: "C", title: "쉽게 안 지워지는 여운", copy: "이미지나 감각이 오래 남는 느낌", weights: { haunting: 3, sharp: 2, dense: 1 } }
    ]
  },
  {
    title: "오늘의 선택은 어느 쪽에 더 가까워?",
    description: "마지막 취향의 결을 골라줘.",
    options: [
      { key: "A", title: "안정적으로 만족스러운 책", copy: "반응이 좋았고 실패 확률이 낮은 쪽", weights: { classic: 2, warm: 1, crowd: 3 } },
      { key: "B", title: "새롭고 신선한 책", copy: "낯선 느낌이라도 궁금해지는 쪽", weights: { adventurous: 3, strange: 1, idea: 1 } },
      { key: "C", title: "취향이 강하게 남는 책", copy: "호불호가 있어도 선명한 쪽", weights: { offbeat: 3, sharp: 1, niche: 3 } }
    ]
  }
];

const traitGroups = {
  warm: ["행복", "위로", "다정", "회복", "마음", "사랑", "용기", "편안", "성장"],
  sharp: ["고통", "상실", "폭력", "범죄", "불쾌", "죽음", "악마", "가해자", "난해"],
  strange: ["우주", "외계", "sf", "과학", "식물", "디지몬", "상상", "프랑켄슈타인", "모험"],
  intimate: ["관계", "가족", "친구", "동생", "우리", "사람", "사랑", "마음"],
  idea: ["생각", "철학", "세계", "의미", "교양", "관점", "역사", "심리", "정치"],
  civic: ["정치", "사회", "국가", "민주주의", "현실", "미래", "광주", "역사"],
  breezy: ["가볍", "재밌", "쉽", "술술", "영업", "입문", "교양서"],
  dense: ["문학", "해석", "고전", "난해", "문장", "작별", "여운"],
  comforting: ["위로", "회복", "다정", "행복", "용기", "편안"],
  haunting: ["상실", "고통", "불쾌", "멸망", "죽음", "아프"],
  debate: ["사회", "정치", "철학", "윤리", "질문", "현실", "실험"],
  classic: ["고전", "편지", "에세이", "심리", "문학", "소설"],
  adventurous: ["우주", "외계", "세계", "상상", "과학", "모험", "디지몬"],
  offbeat: ["악마", "불쾌", "괴이", "블랙미러", "실험", "기묘"]
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

const introScreen = document.querySelector("#intro-screen");
const questionScreen = document.querySelector("#question-screen");
const resultScreen = document.querySelector("#result-screen");
const introStats = document.querySelector("#intro-stats");
const startButton = document.querySelector("#start-button");
const progressPill = document.querySelector("#progress-pill");
const progressFill = document.querySelector("#progress-fill");
const questionStage = document.querySelector("#question-stage");
const resultStage = document.querySelector("#result-stage");

let currentNode = null;
let currentPath = [];
let answerTrail = [];
let bookshelfPage = 0;

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-").replace(/^-+|-+$/g, "");
}

function countMatches(text, terms) {
  return terms.reduce((sum, term) => sum + (text.includes(term) ? 1 : 0), 0);
}

function buildProfile(book) {
  const text = `${book.title} ${book.author || ""} ${book.reviews.map((review) => review.review || "").join(" ")}`.toLowerCase();
  const average = Number(book.averageRating) || 0;

  return {
    warm: countMatches(text, traitGroups.warm),
    sharp: countMatches(text, traitGroups.sharp),
    strange: countMatches(text, traitGroups.strange),
    intimate: countMatches(text, traitGroups.intimate),
    idea: countMatches(text, traitGroups.idea),
    civic: countMatches(text, traitGroups.civic),
    breezy: countMatches(text, traitGroups.breezy),
    dense: countMatches(text, traitGroups.dense),
    comforting: countMatches(text, traitGroups.comforting),
    haunting: countMatches(text, traitGroups.haunting),
    debate: countMatches(text, traitGroups.debate),
    classic: countMatches(text, traitGroups.classic) + (average >= 4 ? 2 : 0),
    adventurous: countMatches(text, traitGroups.adventurous),
    offbeat: countMatches(text, traitGroups.offbeat),
    crowd: average >= 4.1 ? 3 : average >= 3.6 ? 2 : 1,
    niche: average <= 3 ? 3 : average <= 3.4 ? 2 : 0
  };
}

function inferGenre(book) {
  if (genreOverrides[book.title]) {
    return genreOverrides[book.title];
  }

  const text = `${book.title} ${book.author || ""} ${book.reviews.map((review) => review.review || "").join(" ")}`.toLowerCase();
  if (countMatches(text, ["우주", "sf", "과학", "외계", "별"]) >= 1) return "SF";
  if (countMatches(text, ["정치", "사회", "민주주의", "역사"]) >= 1) return "사회 교양";
  if (countMatches(text, ["범죄", "악마", "불쾌"]) >= 1) return "스릴러";
  if (countMatches(text, ["문학", "고전", "해석"]) >= 1) return "문학";
  return "소설";
}

function getTopReview(book) {
  return [...book.reviews].sort((a, b) => (b.rating || 0) - (a.rating || 0))[0] || null;
}

function buildSummary(book) {
  const parts = [...book.reviews]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 2)
    .map((review) => review.review)
    .filter(Boolean);

  return parts.length ? `${parts.join(" / ")} 라는 인상이 남은 책입니다.` : "북클럽 기록을 기반으로 추천했습니다.";
}

function dominantTraits(group) {
  const totals = {
    warm: 0,
    sharp: 0,
    strange: 0,
    intimate: 0,
    idea: 0,
    civic: 0,
    breezy: 0,
    dense: 0,
    comforting: 0,
    haunting: 0,
    debate: 0,
    classic: 0,
    adventurous: 0,
    offbeat: 0
  };

  group.forEach((book) => {
    Object.keys(totals).forEach((key) => {
      totals[key] += book.profile[key] || 0;
    });
  });

  return Object.entries(totals)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 3)
    .map(([key]) => key);
}

function traitLabel(trait) {
  const labels = {
    warm: "다정한 감정선",
    sharp: "강한 인상",
    strange: "낯선 상상력",
    intimate: "관계 중심 서사",
    idea: "아이디어 중심 읽기",
    civic: "사회와 현실",
    breezy: "가볍게 몰입",
    dense: "천천히 곱씹는 결",
    comforting: "위로의 잔향",
    haunting: "오래 남는 여운",
    debate: "토론이 되는 주제",
    classic: "안정적인 만족감",
    adventurous: "새롭고 신선한 방향",
    offbeat: "취향 강한 선택"
  };

  return labels[trait] || trait;
}

function summarizeGroup(group) {
  const traits = dominantTraits(group).map(traitLabel);
  const genreCounts = {};

  group.forEach((book) => {
    genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
  });

  const topGenre = Object.entries(genreCounts).sort((left, right) => right[1] - left[1])[0]?.[0] || "다양한 장르";
  const previewTitles = group
    .slice()
    .sort((left, right) => Number(right.averageRating) - Number(left.averageRating))
    .slice(0, 2)
    .map((book) => book.title)
    .join(", ");

  return {
    title: `${traits[0]} · ${topGenre}`,
    copy: `${traits.slice(1).join(", ")} 쪽에 더 가깝다. 예: ${previewTitles}`
  };
}

const books = rawBooks.map((book) => {
  const topReview = getTopReview(book);
  return {
    ...book,
    id: slugify(`${book.year}-${book.title}`),
    genre: inferGenre(book),
    profile: buildProfile(book),
    summary: buildSummary(book),
    topReview: topReview?.review || "",
    topReviewer: topReview?.member || "",
    topRating: topReview?.rating || Number(book.averageRating) || 0
  };
});

function branchPreference(book, blueprint) {
  return blueprint.options
    .map((option, index) => ({
      index,
      score: Object.entries(option.weights).reduce((sum, [key, weight]) => sum + ((book.profile[key] || 0) * weight), 0)
    }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.index);
}

function optionScore(book, option) {
  return Object.entries(option.weights).reduce((sum, [key, weight]) => sum + ((book.profile[key] || 0) * weight), 0);
}

function splitBooks(items, depth) {
  const blueprint = questionBlueprints[depth];
  const groups = [[], [], []];
  const target = Math.ceil(items.length / 3);

  const ranked = [...items].sort((left, right) => {
    const leftPrefs = branchPreference(left, blueprint);
    const rightPrefs = branchPreference(right, blueprint);
    const leftDelta = Math.abs(optionScore(left, blueprint.options[leftPrefs[0]]) - optionScore(left, blueprint.options[leftPrefs[1]]));
    const rightDelta = Math.abs(optionScore(right, blueprint.options[rightPrefs[0]]) - optionScore(right, blueprint.options[rightPrefs[1]]));
    return rightDelta - leftDelta;
  });

  ranked.forEach((book) => {
    const prefs = branchPreference(book, blueprint);
    let placed = false;

    prefs.forEach((preferred) => {
      if (!placed && groups[preferred].length < target) {
        groups[preferred].push(book);
        placed = true;
      }
    });

    if (!placed) {
      const fallback = groups.map((group, index) => ({ index, size: group.length })).sort((a, b) => a.size - b.size)[0];
      groups[fallback.index].push(book);
    }
  });

  return groups.filter((group) => group.length > 0);
}

function buildTree(items, depth = 0) {
  if (items.length === 1 || depth >= questionBlueprints.length) {
    return { type: "leaf", book: items[0] };
  }

  const groups = splitBooks(items, depth);
  if (groups.length === 1) {
    return { type: "leaf", book: groups[0][0] };
  }

  const blueprint = questionBlueprints[depth];
  return {
    type: "question",
    depth,
    blueprint,
    options: groups.map((group, index) => ({
      ...blueprint.options[index],
      count: group.length,
      summary: summarizeGroup(group),
      child: buildTree(group, depth + 1)
    }))
  };
}

const decisionTree = buildTree(books);

function updateProgress(step) {
  progressPill.textContent = `${step} / ${questionBlueprints.length}`;
  progressFill.style.width = `${(step / questionBlueprints.length) * 100}%`;
}

function showScreen(name) {
  introScreen.classList.toggle("hidden", name !== "intro");
  questionScreen.classList.toggle("hidden", name !== "question");
  resultScreen.classList.toggle("hidden", name !== "result");
}

function renderQuestion(node) {
  currentNode = node;
  showScreen("question");
  updateProgress(node.depth + 1);

  questionStage.innerHTML = `
    <div class="question-card">
      <span class="step-badge">질문 ${node.depth + 1}</span>
      <h2 class="question-title">${node.blueprint.title}</h2>
      <p class="question-description">${node.blueprint.description}</p>
      <div class="option-list">
        ${node.options.map((option, index) => `
          <button class="option-button" type="button" data-branch-index="${index}">
            <span class="option-label-top">
              <span class="option-key">${option.key}</span>
            </span>
            <span class="option-title">${option.summary.title}</span>
            <span class="option-copy">${option.summary.copy}</span>
          </button>
        `).join("")}
      </div>
      <div class="question-actions">
        ${answerTrail.length ? '<button id="back-button" class="secondary-button" type="button">이전으로</button>' : '<button id="cancel-button" class="secondary-button" type="button">처음으로</button>'}
      </div>
    </div>
  `;

  questionStage.querySelectorAll(".option-button").forEach((button) => {
    button.addEventListener("click", () => {
      const branchIndex = Number(button.dataset.branchIndex);
      const choice = node.options[branchIndex];
      currentPath.push(branchIndex);
      answerTrail.push({
        question: node.blueprint.title,
        answer: choice.summary.title,
        copy: choice.summary.copy
      });

      if (choice.child.type === "leaf") {
        renderResult(choice.child.book);
      } else {
        renderQuestion(choice.child);
      }
    });
  });

  const backButton = document.querySelector("#back-button");
  if (backButton) {
    backButton.addEventListener("click", goBack);
  }

  const cancelButton = document.querySelector("#cancel-button");
  if (cancelButton) {
    cancelButton.addEventListener("click", resetExperience);
  }
}

function findNodeByPath(path) {
  let node = decisionTree;
  for (const branchIndex of path) {
    if (node.type !== "question") break;
    node = node.options[branchIndex].child;
  }
  return node;
}

function renderPathMap() {
  return `
    <div class="path-map">
      ${answerTrail.map((step, index) => `
        <div class="path-node">
          <span class="path-node-number">${index + 1}</span>
          <div class="path-node-card">
            <strong>${step.question}</strong>
            <p class="path-copy">${step.answer} · ${step.copy}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderBookshelf() {
  const sorted = [...books].sort((left, right) => {
    if (right.year !== left.year) return right.year - left.year;
    return Number(right.averageRating) - Number(left.averageRating);
  });

  const pageSize = 6;
  const totalPages = Math.ceil(sorted.length / pageSize);
  const start = bookshelfPage * pageSize;
  const visible = sorted.slice(start, start + pageSize);

  return `
    <div class="bookshelf">
      ${visible.map((book) => `
        <article class="book-card">
          <span class="book-year">${book.year}</span>
          <h3>${book.title}</h3>
          <p>${book.author || "저자 정보 미정"} · ${book.genre}</p>
          <p>${book.topReview || book.summary}</p>
          <div class="book-footer">
            <span class="book-score">${Number(book.averageRating).toFixed(2)} / 5</span>
            <span class="result-meta">${book.reviews.length} reviews</span>
          </div>
        </article>
      `).join("")}
    </div>
    <div class="bookshelf-pagination">
      <button id="prev-bookshelf" class="secondary-button" type="button">이전</button>
      <span class="pagination-copy">${bookshelfPage + 1} / ${totalPages}</span>
      <button id="next-bookshelf" class="secondary-button" type="button">다음</button>
    </div>
  `;
}

function renderResult(book, preserveBookshelfPage = false) {
  showScreen("result");
  if (!preserveBookshelfPage) {
    bookshelfPage = 0;
  }

  resultStage.innerHTML = `
    <div class="result-card">
      <div class="result-top">
        <div>
          <p class="eyebrow">Your Book Match</p>
          <h2 class="result-title">${book.title}</h2>
          <p class="result-meta">${book.author || "저자 정보 미정"} · ${book.year} · ${book.genre}</p>
        </div>
        <div class="score-card">
          <strong>${Number(book.averageRating).toFixed(2)}</strong>
          <span>club score</span>
        </div>
      </div>

      <div class="result-grid">
        <div class="result-column">
          <section class="result-module">
            <h3>이 책을 고른 이유</h3>
            <ul>
              <li>지금 고른 답변 흐름이 이 책이 속한 최종 분기와 맞닿았습니다.</li>
              <li>${book.summary}</li>
              <li>북클럽에서 남긴 평점과 한줄 평을 함께 반영했습니다.</li>
            </ul>
          </section>

          <section class="result-module">
            <h3>추천 코멘트</h3>
            <p class="result-copy">지금 고른 흐름은 분위기와 대화 포인트가 비교적 분명합니다. 그래서 이 책처럼 결이 선명하고 북클럽 안에서 인상이 남았던 선택이 잘 맞습니다.</p>
          </section>

          <section class="result-module">
            <h3>대표 한줄 평</h3>
            <p class="result-quote">${book.topReview || "대표 한줄 평 준비 중입니다."}</p>
            <p class="result-meta">${book.topReviewer ? `${book.topReviewer} · ${Number(book.topRating).toFixed(1)}점` : ""}</p>
          </section>
        </div>

        <div class="result-column">
          <section class="result-module">
            <h3>어떤 경로로 이 책이 나왔는지</h3>
            ${renderPathMap()}
          </section>

          <section class="result-module">
            <h3>우리가 읽은 책들</h3>
            ${renderBookshelf()}
          </section>
        </div>
      </div>

      <div class="chip-row">
        <span class="result-chip">50권 아카이브 기반</span>
        <span class="result-chip">리뷰 ${book.reviews.length}개 반영</span>
        <span class="result-chip">단일 분기 결과</span>
      </div>

      <div class="result-actions">
        <button id="restart-button" class="primary-button" type="button">다시 해보기</button>
        <button id="result-back-button" class="secondary-button" type="button">이전 질문으로</button>
      </div>
    </div>
  `;

  document.querySelector("#restart-button").addEventListener("click", resetExperience);
  document.querySelector("#result-back-button").addEventListener("click", goBack);
  bindBookshelfPagination(book);
}

function bindBookshelfPagination(book) {
  const pageSize = 6;
  const totalPages = Math.ceil(books.length / pageSize);
  const prev = document.querySelector("#prev-bookshelf");
  const next = document.querySelector("#next-bookshelf");

  if (prev) {
    prev.disabled = bookshelfPage === 0;
    prev.addEventListener("click", () => {
      if (bookshelfPage > 0) {
        bookshelfPage -= 1;
        renderResult(book, true);
      }
    });
  }

  if (next) {
    next.disabled = bookshelfPage >= totalPages - 1;
    next.addEventListener("click", () => {
      if (bookshelfPage < totalPages - 1) {
        bookshelfPage += 1;
        renderResult(book, true);
      }
    });
  }
}

function goBack() {
  if (!answerTrail.length) {
    resetExperience();
    return;
  }

  currentPath = currentPath.slice(0, -1);
  answerTrail = answerTrail.slice(0, -1);
  const node = findNodeByPath(currentPath);
  if (node.type === "leaf") {
    renderResult(node.book);
  } else {
    renderQuestion(node);
  }
}

function startExperience() {
  currentPath = [];
  answerTrail = [];
  renderQuestion(decisionTree);
}

function resetExperience() {
  currentPath = [];
  answerTrail = [];
  showScreen("intro");
}

function renderIntroStats() {
  const years = [...new Set(books.map((book) => book.year))].sort((a, b) => a - b);
  introStats.textContent = `${years[0]}년부터 ${years[years.length - 1]}년까지 읽은 ${books.length}권의 기록으로 추천을 만듭니다.`;
}

renderIntroStats();
resetExperience();
startButton.addEventListener("click", startExperience);
