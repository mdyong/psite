(function () {
  var rawBooks = Array.isArray(window.bookClubBooks) ? window.bookClubBooks : [];
  var BASE_PATH = "./";

  var questionBlueprints = [
    {
      title: "오늘은 어떤 결의 책이 더 끌려?",
      description: "가장 먼저 당기는 읽기 방향을 골라줘.",
      options: [
        { key: "A", emoji: "📖", title: "이야기 중심", copy: "인물과 관계를 따라가는 서사가 좋다", weights: { warm: 3, comforting: 2, intimate: 2, classic: 1 } },
        { key: "B", emoji: "🧠", title: "생각 중심", copy: "읽고 나서 관점이나 정보가 남는 책이 좋다", weights: { idea: 3, debate: 2, civic: 1, dense: 1 } },
        { key: "C", emoji: "🚀", title: "설정 중심", copy: "낯선 세계나 강한 콘셉트가 있는 책이 좋다", weights: { strange: 3, adventurous: 2, offbeat: 1, idea: 1 } }
      ]
    },
    {
      title: "가장 끌리는 대화 포인트는 뭐야?",
      description: "독서모임에서 더 오래 이야기하고 싶은 쪽을 골라줘.",
      options: [
        { key: "A", emoji: "💞", title: "사람과 감정", copy: "관계, 상처, 회복 같은 감정선이 좋다", weights: { intimate: 3, warm: 2, comforting: 1 } },
        { key: "B", emoji: "💬", title: "아이디어와 관점", copy: "새로운 시선과 생각거리가 많은 책이 좋다", weights: { idea: 3, debate: 2, dense: 1 } },
        { key: "C", emoji: "🌍", title: "사회와 현실", copy: "현실과 맞닿은 문제의식이 있는 책이 좋다", weights: { civic: 3, sharp: 2, debate: 1 } }
      ]
    },
    {
      title: "읽는 리듬은 어느 쪽이 좋아?",
      description: "지금의 집중력에 맞는 호흡을 골라줘.",
      options: [
        { key: "A", emoji: "🍃", title: "술술 읽히는 편", copy: "몰입이 빠르고 부담이 적은 책이 좋다", weights: { breezy: 3, warm: 1, adventurous: 1 } },
        { key: "B", emoji: "⚖️", title: "균형 잡힌 편", copy: "읽기 편하면서 생각할 거리도 있으면 좋다", weights: { idea: 2, intimate: 1, debate: 1, classic: 1 } },
        { key: "C", emoji: "🪨", title: "천천히 곱씹는 편", copy: "문장과 의미를 오래 붙잡는 책이 좋다", weights: { dense: 3, haunting: 1, sharp: 1 } }
      ]
    },
    {
      title: "다 읽고 어떤 느낌이 남았으면 해?",
      description: "책을 덮은 뒤 가장 바라게 되는 잔향을 골라줘.",
      options: [
        { key: "A", emoji: "🤍", title: "위로가 남는 책", copy: "마음이 조금 정리되고 다정함이 남으면 좋다", weights: { comforting: 3, warm: 2, intimate: 1 } },
        { key: "B", emoji: "🗣️", title: "대화거리가 남는 책", copy: "같이 이야기할 포인트와 통찰이 많으면 좋다", weights: { debate: 3, idea: 2, civic: 1 } },
        { key: "C", emoji: "🌫️", title: "여운이 남는 책", copy: "쉽게 잊히지 않는 묵직한 인상이 남으면 좋다", weights: { haunting: 3, sharp: 2, dense: 1 } }
      ]
    },
    {
      title: "오늘의 선택 방식은 어느 쪽이야?",
      description: "마지막으로 지금의 취향 온도를 골라줘.",
      options: [
        { key: "A", emoji: "🍽️", title: "안정적으로 만족", copy: "반응이 좋고 실패 확률이 낮은 선택이 좋다", weights: { classic: 2, warm: 1, crowd: 3 } },
        { key: "B", emoji: "🧪", title: "새롭고 신선하게", copy: "조금 낯설어도 궁금해지는 선택이 좋다", weights: { adventurous: 3, strange: 1, idea: 1 } },
        { key: "C", emoji: "🎯", title: "취향 강하게", copy: "호불호가 있어도 기억에 남는 선택이 좋다", weights: { offbeat: 3, sharp: 1, niche: 3 } }
      ]
    }
  ];

  var traitGroups = {
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

  var genreOverrides = {
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

  function countMatches(text, terms) {
    return terms.reduce(function (sum, term) {
      return sum + (text.indexOf(term) >= 0 ? 1 : 0);
    }, 0);
  }

  function objectEntries(obj) {
    return Object.keys(obj).map(function (key) {
      return [key, obj[key]];
    });
  }

  function parseQuery(search) {
    var query = {};
    var raw = (search || "").replace(/^\?/, "");
    if (!raw) return query;
    raw.split("&").forEach(function (part) {
      if (!part) return;
      var pieces = part.split("=");
      var key = decodeURIComponent(pieces[0] || "");
      var value = decodeURIComponent((pieces[1] || "").replace(/\+/g, " "));
      query[key] = value;
    });
    return query;
  }

  function buildQuery(params) {
    var keys = Object.keys(params).filter(function (key) {
      return params[key] !== undefined && params[key] !== null && params[key] !== "";
    });
    if (!keys.length) return "";
    return "?" + keys.map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }).join("&");
  }

  function slugify(value) {
    return value.toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function inferGenre(book) {
    if (genreOverrides[book.title]) return genreOverrides[book.title];
    var text = (book.title + " " + (book.author || "") + " " + book.reviews.map(function (review) { return review.review || ""; }).join(" ")).toLowerCase();
    if (countMatches(text, ["우주", "sf", "과학", "외계", "별"]) >= 1) return "SF";
    if (countMatches(text, ["정치", "사회", "민주주의", "역사"]) >= 1) return "사회 교양";
    if (countMatches(text, ["범죄", "악마", "불쾌"]) >= 1) return "스릴러";
    if (countMatches(text, ["문학", "고전", "해석"]) >= 1) return "문학";
    return "소설";
  }

  function topReview(book) {
    return book.reviews.slice().sort(function (a, b) {
      return (b.rating || 0) - (a.rating || 0);
    })[0] || null;
  }

  function buildSummary(book) {
    var parts = book.reviews.slice().sort(function (a, b) {
      return (b.rating || 0) - (a.rating || 0);
    }).slice(0, 2).map(function (review) {
      return review.review;
    }).filter(Boolean);

    return parts.length ? parts.join(" / ") + " 라는 인상이 남은 책입니다." : "북클럽 기록을 기반으로 추천했습니다.";
  }

  function buildProfile(book) {
    var text = (book.title + " " + (book.author || "") + " " + book.reviews.map(function (review) { return review.review || ""; }).join(" ")).toLowerCase();
    var average = Number(book.averageRating) || 0;

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

  function summarizeGroup(group) {
    var preview = group.slice().sort(function (a, b) {
      return Number(b.averageRating) - Number(a.averageRating);
    }).slice(0, 2).map(function (book) { return book.title; }).join(", ");

    return {
      preview: preview
    };
  }

  var books = rawBooks.map(function (book) {
    var review = topReview(book);
    return Object.assign({}, book, {
      id: slugify(book.year + "-" + book.title),
      genre: inferGenre(book),
      profile: buildProfile(book),
      summary: buildSummary(book),
      topReview: review ? review.review : "",
      topReviewer: review ? review.member : "",
      topRating: review ? review.rating : (Number(book.averageRating) || 0)
    });
  });

  function branchPreference(book, blueprint) {
    return blueprint.options.map(function (option, index) {
      return {
        index: index,
        score: objectEntries(option.weights).reduce(function (sum, entry) {
          return sum + ((book.profile[entry[0]] || 0) * entry[1]);
        }, 0)
      };
    }).sort(function (a, b) {
      return b.score - a.score;
    }).map(function (item) {
      return item.index;
    });
  }

  function optionScore(book, option) {
    return objectEntries(option.weights).reduce(function (sum, entry) {
      return sum + ((book.profile[entry[0]] || 0) * entry[1]);
    }, 0);
  }

  function splitBooks(items, depth) {
    var blueprint = questionBlueprints[depth];
    var groups = [[], [], []];
    var target = Math.ceil(items.length / 3);

    var ranked = items.slice().sort(function (left, right) {
      var leftPrefs = branchPreference(left, blueprint);
      var rightPrefs = branchPreference(right, blueprint);
      var leftDelta = Math.abs(optionScore(left, blueprint.options[leftPrefs[0]]) - optionScore(left, blueprint.options[leftPrefs[1]]));
      var rightDelta = Math.abs(optionScore(right, blueprint.options[rightPrefs[0]]) - optionScore(right, blueprint.options[rightPrefs[1]]));
      return rightDelta - leftDelta;
    });

    ranked.forEach(function (book) {
      var prefs = branchPreference(book, blueprint);
      var placed = false;
      prefs.forEach(function (preferred) {
        if (!placed && groups[preferred].length < target) {
          groups[preferred].push(book);
          placed = true;
        }
      });
      if (!placed) {
        groups.sort(function (a, b) { return a.length - b.length; })[0].push(book);
      }
    });

    return groups.filter(function (group) { return group.length; });
  }

  function buildTree(items, depth) {
    if (depth === undefined) depth = 0;
    if (items.length === 1 || depth >= questionBlueprints.length) {
      return { type: "leaf", book: items[0] };
    }

    var groups = splitBooks(items, depth);
    if (groups.length === 1) {
      return { type: "leaf", book: groups[0][0] };
    }

    var blueprint = questionBlueprints[depth];
    return {
      type: "question",
      depth: depth,
      blueprint: blueprint,
      options: groups.map(function (group, index) {
        return Object.assign({}, blueprint.options[index], {
          count: group.length,
          summary: summarizeGroup(group),
          child: buildTree(group, depth + 1)
        });
      })
    };
  }

  var tree = buildTree(books);

  function parseAnswers(value) {
    if (!value) return [];
    return value.split(",").map(function (item) {
      return Number(item);
    }).filter(function (item) {
      return !isNaN(item);
    });
  }

  function findNodeByAnswers(answers) {
    var node = tree;
    var trail = [];
    for (var i = 0; i < answers.length; i += 1) {
      if (!node || node.type !== "question") break;
      var option = node.options[answers[i]];
      if (!option) break;
      trail.push({
        question: node.blueprint.title,
        answer: option.title,
        copy: option.copy
      });
      node = option.child;
    }
    return { node: node, trail: trail };
  }

  function buildQuestionHref(step, answers) {
    return BASE_PATH + "question.html" + buildQuery({
      step: String(step),
      answers: answers.length ? answers.join(",") : ""
    });
  }

  function buildResultHref(answers) {
    return BASE_PATH + "result.html" + buildQuery({
      answers: answers.join(",")
    });
  }

  function getQuestionState(step, answers) {
    var found = findNodeByAnswers(answers);
    var node = found.node;
    if (!node) {
      return { redirect: BASE_PATH + "index.html" };
    }
    if (node.type === "leaf") {
      return { redirect: buildResultHref(answers) };
    }
    if (step !== answers.length) {
      return { redirect: buildQuestionHref(answers.length, answers) };
    }
    return {
      step: step,
      title: node.blueprint.title,
      description: node.blueprint.description,
      options: node.options
    };
  }

  function getResultState(answers) {
    if (!answers.length) return { redirect: BASE_PATH + "index.html" };
    var found = findNodeByAnswers(answers);
    if (!found.node || found.node.type !== "leaf") {
      return { redirect: buildQuestionHref(found.trail.length, answers.slice(0, found.trail.length)) };
    }
    return {
      book: found.node.book,
      trail: found.trail
    };
  }

  function getBookshelfPage(page) {
    var sorted = books.slice().sort(function (left, right) {
      if (right.year !== left.year) return right.year - left.year;
      return Number(right.averageRating) - Number(left.averageRating);
    });
    var pageSize = 6;
    var start = page * pageSize;
    return {
      items: sorted.slice(start, start + pageSize),
      totalPages: Math.ceil(sorted.length / pageSize)
    };
  }

  function buildNextHref(step, answers, index) {
    var nextAnswers = answers.concat([index]);
    if (step + 1 >= questionBlueprints.length) {
      return buildResultHref(nextAnswers);
    }
    return buildQuestionHref(step + 1, nextAnswers);
  }

  window.BookMatchApp = {
    books: books,
    questionCount: questionBlueprints.length,
    getYears: function () {
      return books.map(function (book) { return book.year; }).filter(function (value, index, array) {
        return array.indexOf(value) === index;
      }).sort(function (a, b) { return a - b; });
    },
    parseAnswers: parseAnswers,
    parseQuery: parseQuery,
    getQuestionState: getQuestionState,
    getResultState: getResultState,
    getBookshelfPage: getBookshelfPage,
    buildQuestionHref: buildQuestionHref,
    buildNextHref: buildNextHref
  };
}());
