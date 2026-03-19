const rawBooks = Array.isArray(window.bookClubBooks) ? window.bookClubBooks : [];

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

const questionBlueprints = [
  {
    title: "오늘의 독서 무드는 어느 쪽에 가까워?",
    description: "지금 마음에 가장 가까운 결을 골라주세요.",
    options: [
      {
        eyebrow: "A",
        title: "조용히 마음을 덮는 책",
        copy: "다정하고 부드럽고 오래 곁에 남는 타입",
        weights: { warm: 3, comforting: 2, intimate: 1 }
      },
      {
        eyebrow: "B",
        title: "선명하게 꽂히는 책",
        copy: "묵직하고 강렬하고 밀도가 높은 타입",
        weights: { sharp: 3, haunting: 2, dense: 1 }
      },
      {
        eyebrow: "C",
        title: "세계가 열리는 책",
        copy: "상상력, 설정, 낯선 장치가 끌리는 타입",
        weights: { strange: 3, adventurous: 2, idea: 1 }
      }
    ]
  },
  {
    title: "독서모임에서 어떤 대화를 더 하고 싶어?",
    description: "책을 읽고 친구들과 나누고 싶은 이야기의 중심을 골라주세요.",
    options: [
      {
        eyebrow: "A",
        title: "사람과 감정",
        copy: "관계, 상처, 회복, 감정선에 더 끌린다",
        weights: { intimate: 3, warm: 1, comforting: 1 }
      },
      {
        eyebrow: "B",
        title: "아이디어와 시선",
        copy: "설정, 개념, 새 관점이 있는 책이 좋다",
        weights: { idea: 3, strange: 1, dense: 1 }
      },
      {
        eyebrow: "C",
        title: "사회와 현실",
        copy: "현실과 맞닿은 문제의식, 시대감이 중요하다",
        weights: { civic: 3, debate: 2, sharp: 1 }
      }
    ]
  },
  {
    title: "읽는 호흡은 어느 정도가 좋아?",
    description: "이번 달 독서 리듬에 가장 맞는 속도를 골라주세요.",
    options: [
      {
        eyebrow: "A",
        title: "술술 읽히는 편",
        copy: "몰입감 있고 비교적 가볍게 들어가고 싶다",
        weights: { breezy: 3, warm: 1, adventurous: 1 }
      },
      {
        eyebrow: "B",
        title: "균형 잡힌 편",
        copy: "부담은 덜하지만 생각할 포인트는 있었으면 좋다",
        weights: { idea: 2, intimate: 1, debate: 1 }
      },
      {
        eyebrow: "C",
        title: "천천히 곱씹는 편",
        copy: "문장과 주제를 오래 붙잡고 읽고 싶다",
        weights: { dense: 3, haunting: 1, classic: 1 }
      }
    ]
  },
  {
    title: "다 읽고 난 뒤 어떤 잔향이 남으면 좋겠어?",
    description: "책을 덮은 다음의 감각을 상상해보세요.",
    options: [
      {
        eyebrow: "A",
        title: "위로와 정돈",
        copy: "마음이 조금 부드러워지고 정리되는 느낌",
        weights: { comforting: 3, warm: 2, intimate: 1 }
      },
      {
        eyebrow: "B",
        title: "계속 대화하고 싶은 질문",
        copy: "독서모임에서 의견이 갈려도 재밌는 느낌",
        weights: { debate: 3, idea: 1, civic: 1 }
      },
      {
        eyebrow: "C",
        title: "쉽게 안 지워지는 여운",
        copy: "오래 남는 이미지와 감각이 중요하다",
        weights: { haunting: 3, sharp: 2, dense: 1 }
      }
    ]
  },
  {
    title: "오늘의 선택은 어느 쪽이 더 끌려?",
    description: "안정적인 선택인지, 취향 강한 선택인지 골라주세요.",
    options: [
      {
        eyebrow: "A",
        title: "검증된 쪽",
        copy: "실패 확률이 낮고 반응이 좋았던 책이 좋다",
        weights: { classic: 2, warm: 1, crowd: 3 }
      },
      {
        eyebrow: "B",
        title: "새로운 쪽",
        copy: "낯선 세계나 아이디어도 적극적으로 환영",
        weights: { adventurous: 3, strange: 1, idea: 1 }
      },
      {
        eyebrow: "C",
        title: "취향 강한 쪽",
        copy: "호불호가 있어도 인상적인 책이면 된다",
        weights: { offbeat: 3, sharp: 1, niche: 3 }
      }
    ]
  }
];

const archiveCount = document.querySelector("#archive-count");
const memberCount = document.querySelector("#member-count");
const statsCopy = document.querySelector("#stats-copy");
const progressPill = document.querySelector("#progress-pill");
const questionStage = document.querySelector("#question-stage");
const resultStage = document.querySelector("#result-stage");
const bookshelf = document.querySelector("#bookshelf");

let currentNode = null;
let currentPath = [];
let currentDepth = 0;

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function countMatches(text, terms) {
  return terms.reduce((score, term) => score + (text.includes(term) ? 1 : 0), 0);
}

function buildProfile(book) {
  const text = `${book.title} ${book.author} ${book.reviews.map((review) => review.review || "").join(" ")}`.toLowerCase();
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

  const text = `${book.title} ${book.author} ${book.reviews.map((review) => review.review || "").join(" ")}`.toLowerCase();

  if (countMatches(text, ["우주", "sf", "과학", "외계", "별"]) >= 1) return "SF";
  if (countMatches(text, ["정치", "사회", "민주주의", "역사"]) >= 1) return "사회 교양";
  if (countMatches(text, ["문학", "고전", "해석"]) >= 1) return "문학";
  if (countMatches(text, ["에세이", "행복", "심리"]) >= 1) return "에세이";
  if (countMatches(text, ["범죄", "악마", "불쾌"]) >= 1) return "스릴러";
  return "소설";
}

function getTopReview(book) {
  return [...book.reviews].sort((left, right) => (right.rating || 0) - (left.rating || 0))[0] || null;
}

function buildSummary(book) {
  const reviews = [...book.reviews]
    .sort((left, right) => (right.rating || 0) - (left.rating || 0))
    .slice(0, 2)
    .map((review) => review.review)
    .filter(Boolean);

  return reviews.length ? `${reviews.join(" / ")} 라는 인상이 남은 책입니다.` : "리뷰 데이터가 아직 충분하지 않습니다.";
}

const books = rawBooks.map((book) => {
  const topReview = getTopReview(book);
  return {
    ...book,
    id: slugify(`${book.year}-${book.title}`),
    profile: buildProfile(book),
    genre: inferGenre(book),
    summary: buildSummary(book),
    topReview: topReview?.review || "",
    topReviewer: topReview?.member || "",
    topRating: topReview?.rating || Number(book.averageRating) || 0
  };
});

function branchPreference(book, blueprint) {
  return blueprint.options
    .map((option, index) => {
      const score = Object.entries(option.weights).reduce((sum, [key, weight]) => {
        return sum + ((book.profile[key] || 0) * weight);
      }, 0);

      return { index, score };
    })
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.index);
}

function splitBooks(items, depth) {
  const blueprint = questionBlueprints[depth];
  const groups = [[], [], []];
  const targetSize = Math.ceil(items.length / 3);

  const ranked = [...items].sort((left, right) => {
    const leftPrefs = branchPreference(left, blueprint);
    const rightPrefs = branchPreference(right, blueprint);
    const leftDelta = Math.abs(
      Object.entries(blueprint.options[leftPrefs[0]].weights).reduce((sum, [key, weight]) => sum + ((left.profile[key] || 0) * weight), 0) -
      Object.entries(blueprint.options[leftPrefs[1]].weights).reduce((sum, [key, weight]) => sum + ((left.profile[key] || 0) * weight), 0)
    );
    const rightDelta = Math.abs(
      Object.entries(blueprint.options[rightPrefs[0]].weights).reduce((sum, [key, weight]) => sum + ((right.profile[key] || 0) * weight), 0) -
      Object.entries(blueprint.options[rightPrefs[1]].weights).reduce((sum, [key, weight]) => sum + ((right.profile[key] || 0) * weight), 0)
    );
    return rightDelta - leftDelta;
  });

  ranked.forEach((book) => {
    const preferences = branchPreference(book, blueprint);
    let assigned = false;

    preferences.forEach((preferredIndex) => {
      if (!assigned && groups[preferredIndex].length < targetSize) {
        groups[preferredIndex].push(book);
        assigned = true;
      }
    });

    if (!assigned) {
      const smallest = groups
        .map((group, index) => ({ index, size: group.length }))
        .sort((left, right) => left.size - right.size)[0];
      groups[smallest.index].push(book);
    }
  });

  return groups.filter((group) => group.length > 0);
}

function buildTree(items, depth = 0, path = []) {
  if (items.length === 1 || depth >= questionBlueprints.length) {
    return {
      type: "leaf",
      book: items[0],
      path
    };
  }

  const groups = splitBooks(items, depth);

  if (groups.length === 1) {
    return {
      type: "leaf",
      book: groups[0][0],
      path
    };
  }

  const blueprint = questionBlueprints[depth];

  return {
    type: "question",
    depth,
    path,
    blueprint,
    options: groups.map((group, index) => ({
      ...blueprint.options[index],
      child: buildTree(group, depth + 1, [...path, index]),
      count: group.length
    }))
  };
}

const decisionTree = buildTree(books);

function updateProgress() {
  const currentStep = currentNode?.type === "leaf" ? questionBlueprints.length : (currentNode?.depth || 0) + 1;
  progressPill.textContent = `${currentStep} / ${questionBlueprints.length}`;
}

function renderQuestion(node) {
  currentNode = node;
  currentDepth = node.depth;
  questionStage.classList.remove("hidden");
  resultStage.classList.add("hidden");

  const title = node.blueprint.title;
  const description = node.blueprint.description;

  questionStage.innerHTML = `
    <div class="question-card">
      <span class="step-index">Step ${node.depth + 1}</span>
      <h3 class="question-title">${title}</h3>
      <p class="question-description">${description}</p>
      <div class="option-list">
        ${node.options.map((option, index) => `
          <button class="option-button" type="button" data-branch-index="${index}">
            <span class="option-eyebrow">${option.eyebrow} · ${option.count}권</span>
            <span class="option-title">${option.title}</span>
            <span class="option-copy">${option.copy}</span>
          </button>
        `).join("")}
      </div>
      <div class="stage-actions">
        ${currentPath.length > 0 ? '<button id="back-button" class="ghost-button" type="button">이전 질문</button>' : '<button id="restart-button" class="ghost-button" type="button">처음으로</button>'}
      </div>
    </div>
  `;

  questionStage.querySelectorAll(".option-button").forEach((button) => {
    button.addEventListener("click", () => {
      const branchIndex = Number(button.dataset.branchIndex);
      currentPath.push(branchIndex);
      const next = node.options[branchIndex].child;
      if (next.type === "leaf") {
        renderResult(next.book);
      } else {
        renderQuestion(next);
      }
    });
  });

  const backButton = document.querySelector("#back-button");
  if (backButton) {
    backButton.addEventListener("click", goBack);
  }

  const restartButton = document.querySelector("#restart-button");
  if (restartButton) {
    restartButton.addEventListener("click", resetExperience);
  }

  updateProgress();
}

function findNodeByPath(path) {
  let node = decisionTree;

  for (const index of path) {
    if (node.type !== "question") {
      break;
    }
    node = node.options[index].child;
  }

  return node;
}

function getSiblingBooks(targetBookId) {
  return books
    .filter((book) => book.id !== targetBookId)
    .sort((left, right) => Number(right.averageRating) - Number(left.averageRating))
    .slice(0, 3);
}

function renderResult(book) {
  currentNode = { type: "leaf", book };
  questionStage.classList.add("hidden");
  resultStage.classList.remove("hidden");
  progressPill.textContent = "Done";

  const alternatives = getSiblingBooks(book.id);

  resultStage.innerHTML = `
    <div class="result-card">
      <span class="step-index">Result</span>
      <div class="result-header">
        <div>
          <h3 class="result-book-title">${book.title}</h3>
          <p class="meta-line">${book.author || "저자 정보 미정"} · ${book.year} · ${book.genre}</p>
        </div>
        <div class="score-box">
          <strong>${Number(book.averageRating).toFixed(2)}</strong>
          <span>club score</span>
        </div>
      </div>

      <div class="result-grid">
        <section class="result-module">
          <h3>추천 이유</h3>
          <ul>
            <li>지금까지 고른 답변 흐름이 이 책이 속한 최종 분기와 일치했습니다.</li>
            <li>이 테스트는 50권 각각이 따로 도착하는 리프 구조로 만들어져 있습니다.</li>
            <li>${book.summary}</li>
          </ul>
        </section>

        <section class="result-module">
          <h3>대표 한줄 평</h3>
          <p class="result-quote">${book.topReview || "대표 한줄 평 준비 중입니다."}</p>
          <p class="meta-line">${book.topReviewer ? `${book.topReviewer} · ${Number(book.topRating).toFixed(1)}점` : ""}</p>
        </section>

        <section class="result-module">
          <h3>다른 후보</h3>
          <ol>
            ${alternatives.map((item) => `<li>${item.title} · ${Number(item.averageRating).toFixed(2)}점</li>`).join("")}
          </ol>
        </section>
      </div>

      <div class="chip-row">
        <span class="result-chip">50권 중 정확한 단일 결과</span>
        <span class="result-chip">리뷰 ${book.reviews.length}개 반영</span>
        <span class="result-chip">마지막 경로 길이 ${currentPath.length}단계</span>
      </div>

      <div class="stage-actions">
        <button id="retry-button" class="solid-button" type="button">다시 테스트하기</button>
        <button id="back-from-result" class="ghost-button" type="button">이전 질문으로</button>
      </div>
    </div>
  `;

  document.querySelector("#retry-button").addEventListener("click", resetExperience);
  document.querySelector("#back-from-result").addEventListener("click", goBack);
}

function goBack() {
  if (currentPath.length === 0) {
    renderQuestion(decisionTree);
    return;
  }

  currentPath = currentPath.slice(0, -1);
  const node = findNodeByPath(currentPath);
  if (node.type === "leaf") {
    renderResult(node.book);
  } else {
    renderQuestion(node);
  }
}

function resetExperience() {
  currentPath = [];
  renderQuestion(decisionTree);
}

function renderBookshelf() {
  const sorted = [...books].sort((left, right) => {
    if (right.year !== left.year) {
      return right.year - left.year;
    }
    return Number(right.averageRating) - Number(left.averageRating);
  });

  bookshelf.innerHTML = sorted.map((book) => `
    <article class="book-card">
      <span class="book-year">${book.year}</span>
      <h3>${book.title}</h3>
      <p>${book.author || "저자 정보 미정"} · ${book.genre}</p>
      <p>${book.topReview || book.summary}</p>
      <div class="book-meta-row">
        <span class="book-score">${Number(book.averageRating).toFixed(2)} / 5</span>
        <span class="meta-line">${book.reviews.length} reviews</span>
      </div>
    </article>
  `).join("");
}

function renderStats() {
  const years = [...new Set(books.map((book) => book.year))].sort((left, right) => left - right);
  archiveCount.textContent = `${books.length}권`;
  memberCount.textContent = "5명";
  statsCopy.textContent = `${years[0]}년부터 ${years[years.length - 1]}년까지의 기록을 기반으로, 50권 각각이 최종 결과가 되는 분기 트리로 테스트를 구성했습니다.`;
}

renderStats();
renderBookshelf();
resetExperience();
