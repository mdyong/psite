(function () {
  var rawBooks = Array.isArray(window.bookClubBooks) ? window.bookClubBooks : [];
  var BASE_PATH = "./";

  var questionBlueprints = [
    {
      title: "지금 가장 끌리는 책의 타입은 뭐야?",
      description: "우리 책 목록을 크게 가르는 첫 갈래부터 골라줘.",
      options: [
        { key: "A", emoji: "📖", title: "문학과 이야기", copy: "인물과 관계를 따라가는 서사가 좋다", weights: { literary: 3, comfort: 1, youth: 1, classic: 1 } },
        { key: "B", emoji: "🧠", title: "에세이와 교양", copy: "생각과 정보, 관점이 남는 책이 좋다", weights: { essay: 3, reflective: 2, science: 1, art: 1 } },
        { key: "C", emoji: "🛸", title: "SF와 스릴러", copy: "낯선 설정이나 강한 플롯이 좋다", weights: { speculative: 3, suspense: 2, literary: 1 } }
      ]
    },
    {
      title: "더 끌리는 무대는 어디야?",
      description: "이야기가 펼쳐지는 세계의 결을 골라줘.",
      options: [
        { key: "A", emoji: "🏠", title: "개인과 관계", copy: "가족, 사랑, 우정, 성장 같은 이야기가 좋다", weights: { comfort: 3, literary: 1, youth: 2, essay: 1 } },
        { key: "B", emoji: "🏛️", title: "사회와 역사", copy: "제도, 시대, 공동체를 다루는 책이 좋다", weights: { social: 3, reflective: 1, literary: 1, suspense: 1 } },
        { key: "C", emoji: "🌌", title: "과학과 낯선 세계", copy: "우주, 미래, 기묘한 세계관이 좋다", weights: { speculative: 3, science: 2, suspense: 1 } }
      ]
    },
    {
      title: "다 읽고 어떤 게 남았으면 해?",
      description: "책을 덮은 뒤 가장 크게 남았으면 하는 감각을 골라줘.",
      options: [
        { key: "A", emoji: "🤍", title: "위로와 온기", copy: "다정하고 오래 가는 위로가 남으면 좋다", weights: { comfort: 3, essay: 1, literary: 1 } },
        { key: "B", emoji: "💭", title: "통찰과 사유", copy: "해석과 생각거리가 남으면 좋다", weights: { reflective: 3, social: 1, science: 1, literary: 1 } },
        { key: "C", emoji: "⚡", title: "긴장과 여진", copy: "강하고 선명한 인상이 남으면 좋다", weights: { suspense: 3, speculative: 1, social: 1 } }
      ]
    },
    {
      title: "더 오래 이야기하고 싶은 주제는 뭐야?",
      description: "독서모임에서 특히 말이 길어질 만한 주제를 골라줘.",
      options: [
        { key: "A", emoji: "🫂", title: "사람의 마음", copy: "관계, 사랑, 상처, 성장 이야기가 좋다", weights: { literary: 2, comfort: 2, youth: 1, reflective: 1 } },
        { key: "B", emoji: "🔬", title: "지식과 아이디어", copy: "과학, 철학, 예술, 개념 이야기가 좋다", weights: { science: 2, reflective: 2, art: 2, essay: 1 } },
        { key: "C", emoji: "⚖️", title: "구조와 윤리", copy: "제도, 권력, 사회 규칙 이야기가 좋다", weights: { social: 3, suspense: 1, speculative: 1, reflective: 1 } }
      ]
    },
    {
      title: "읽는 호흡은 어느 쪽이 좋아?",
      description: "지금 집중력과 취향에 맞는 리듬을 골라줘.",
      options: [
        { key: "A", emoji: "🍃", title: "술술 읽히는 편", copy: "빠르게 몰입되고 부담이 적은 책이 좋다", weights: { breezy: 3, comfort: 1, essay: 1 } },
        { key: "B", emoji: "⚖️", title: "읽기 쉽지만 얕지 않게", copy: "재미와 생각이 같이 가면 좋다", weights: { literary: 1, reflective: 1, science: 1, social: 1, classic: 1 } },
        { key: "C", emoji: "🪨", title: "진득하게 붙잡고 싶어", copy: "문장이나 구조를 천천히 곱씹고 싶다", weights: { dense: 3, literary: 1, reflective: 1, suspense: 1 } }
      ]
    },
    {
      title: "마지막으로, 오늘의 취향 온도는?",
      description: "검증된 만족과 강한 취향 사이에서 골라줘.",
      options: [
        { key: "A", emoji: "🍽️", title: "좋다고 검증된 쪽", copy: "클럽에서 반응이 좋았던 책 쪽이 좋다", weights: { crowd: 3, comfort: 1, literary: 1, essay: 1 } },
        { key: "B", emoji: "🧪", title: "새로운 결을 만나고 싶어", copy: "조금 새롭거나 뜻밖의 책이 좋다", weights: { speculative: 2, science: 1, art: 1, reflective: 1 } },
        { key: "C", emoji: "🎯", title: "호불호 있어도 강한 책", copy: "강한 개성과 인상이 있는 책이 좋다", weights: { niche: 3, suspense: 2, speculative: 1 } }
      ]
    }
  ];

  var traitGroups = {
    essay: ["에세이", "교양", "기록", "편지", "일상", "산문"],
    literary: ["문학", "소설", "단편", "장편", "서사", "이야기", "문장"],
    science: ["과학", "뇌", "심리", "천문", "생명", "우주", "과학자"],
    social: ["정치", "역사", "사회", "민주주의", "제도", "권력", "국가"],
    suspense: ["스릴러", "미스터리", "호러", "불쾌", "악마", "살인", "긴장"],
    speculative: ["sf", "미래", "외계", "디스토피아", "상상", "기묘", "세계관"],
    comfort: ["위로", "다정", "행복", "회복", "친절", "성장", "계절"],
    reflective: ["철학", "사유", "질문", "해석", "관점", "의미", "생각"],
    youth: ["청소년", "성장", "편지", "친구", "학교", "소년", "소녀"],
    art: ["예술", "음악", "클래식", "화가", "그림", "창작", "라디오"],
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
    "반 고흐, 영혼의 편지": "예술 에세이",
    "멍청해지기 전에 읽는 뇌과학": "뇌과학 교양",
    "제철 행복": "에세이",
    "의외로 사람들이 잘 모르는 정치": "정치 교양",
    "사랑을 지키는 법": "심리 에세이",
    "나인": "SF 청소년소설",
    "악마의 계약서는 만기되지 않는다": "판타지 로맨스",
    "종이 동물뭔": "SF 단편집",
    "작별하지 않는다": "문학",
    "아무튼 디지몬": "덕질 에세이",
    "두고 온 여름": "단편 문학",
    "파과": "느와르 소설",
    "혼모노": "단편 문학",
    "세계를 건너 너에게 갈게": "청소년 판타지",
    "하우스메이드": "심리 스릴러",
    "관객모독": "희곡",
    "클래식 좀 들어라": "음악 교양",
    "생명의 언어들": "과학 교양",
    "신삼국지": "역사 교양",
    "하객명단": "미스터리 스릴러",
    "퀸의 대각선1": "정치 소설",
    "여행가의 동물 수첩": "여행 에세이",
    "저속노화 마인드셋": "건강 교양",
    "언러키 스타트": "직장인 소설",
    "홍학의 자리": "스릴러",
    "아주 희미한 빛으로도": "문학",
    "당신은 당근을 싫어하는 군요 저는 김치를 싫어합니다": "음식 에세이",
    "우리가 작별인사를 할 때마다": "자연 에세이",
    "오만과 편견": "고전 문학",
    "나는 내가 왜 살아야 하는지 몰랐습니다": "에세이",
    "찌그러져도 동그라미입니다": "에세이",
    "가여운 것들": "고딕 SF",
    "뇌의 흑역사": "과학 교양",
    "에이스": "사회문화",
    "물 만난 물고기": "뮤직 에세이",
    "긴긴밤": "성장소설",
    "꿰맨 눈의 마을": "호러 소설",
    "과학을 보다 2": "과학 교양",
    "이처럼 사소한 것들": "문학",
    "수확자": "디스토피아 SF",
    "소년이 온다": "역사 문학",
    "오베라는 남자": "힐링 소설",
    "쇼코의 미소": "단편 문학",
    "어떤 어른": "에세이",
    "어떤 생각들은 나의 세계가 된다": "철학 에세이",
    "지구 끝의 온실": "SF 소설",
    "프로젝트 헤일메리": "하드 SF",
    "처음 하는 심리학 공부": "심리 교양",
    "단 한사람": "문학",
    "천문학자는 별을 보지 않는다": "과학 에세이"
  };

  var premiseOverrides = {
    "반 고흐, 영혼의 편지": "반 고흐가 동생 테오에게 보낸 편지를 통해 예술과 고통, 삶의 태도를 들여다보는 기록이다.",
    "멍청해지기 전에 읽는 뇌과학": "일상 습관과 집중력, 기억의 원리를 뇌과학으로 쉽게 풀어내는 입문서다.",
    "제철 행복": "절기와 계절의 감각을 따라가며 일상에서 행복을 발견하는 법을 전하는 에세이다.",
    "의외로 사람들이 잘 모르는 정치": "민주주의와 정당, 선거, 권력 구조를 쉽게 설명하는 정치 입문서다.",
    "사랑을 지키는 법": "사랑과 관계가 어떻게 만들어지고 유지되는지 심리학과 사례로 풀어낸 책이다.",
    "나인": "외계 존재와 연결된 소녀가 친절과 연대로 세계를 다시 바라보게 되는 청소년 SF다.",
    "악마의 계약서는 만기되지 않는다": "악마와 인간의 계약을 바탕으로 사랑과 욕망을 그리는 판타지 로맨스다.",
    "종이 동물뭔": "기술과 역사, 이민자의 삶을 엮어 인간성을 묻는 SF 단편 모음이다.",
    "작별하지 않는다": "제주 4·3의 기억과 상실을 눈 덮인 풍경 속에서 따라가는 장편소설이다.",
    "아무튼 디지몬": "디지몬을 사랑해 온 시간이 삶과 위로, 성장의 기억으로 이어지는 덕질 에세이다.",
    "두고 온 여름": "가족과 관계의 균열을 여름의 공기처럼 잔잔하게 그리는 문학 작품이다.",
    "파과": "나이 든 여성 킬러의 생존과 존엄을 따라가는 서늘한 액션 느와르다.",
    "혼모노": "현실에 있을 법한 인물들의 욕망과 미묘한 균열을 그리는 단편소설집이다.",
    "세계를 건너 너에게 갈게": "시간을 건너 도착한 편지가 두 사람의 삶을 이어 주는 청소년 소설이다.",
    "하우스메이드": "수상한 부잣집에 들어간 가정부가 숨겨진 진실과 위험을 마주하는 스릴러다.",
    "관객모독": "배우와 관객의 경계를 허물며 연극과 언어 자체를 흔드는 실험 희곡이다.",
    "클래식 좀 들어라": "클래식 음악을 가볍게 즐길 수 있도록 에피소드와 감상을 풀어내는 교양서다.",
    "생명의 언어들": "생명과학의 핵심 개념을 일상적인 질문과 함께 쉽게 소개하는 과학 교양서다.",
    "신삼국지": "복잡한 삼국지 이야기를 핵심 인물과 사건 위주로 다시 정리한 콘텐츠형 교양서다.",
    "하객명단": "외딴 섬 결혼식에 모인 인물들의 비밀이 파국으로 번지는 추리 스릴러다.",
    "퀸의 대각선1": "정치와 전략, 천재 소녀들의 대립을 체스판처럼 전개하는 소설이다.",
    "여행가의 동물 수첩": "여행지에서 만난 동물과 사람의 순간을 기록한 따뜻한 여행 에세이다.",
    "저속노화 마인드셋": "생활 습관과 사고방식을 바꿔 건강하게 나이 드는 법을 다루는 건강서다.",
    "언러키 스타트": "스타트업의 과로와 현실을 소설처럼 그려내는 직장인 이야기다.",
    "홍학의 자리": "평범한 일상 아래 숨은 불쾌함과 비밀이 드러나는 심리 스릴러다.",
    "아주 희미한 빛으로도": "여성들의 일상과 상처, 연대의 순간을 섬세하게 포착한 소설집이다.",
    "당신은 당근을 싫어하는 군요 저는 김치를 싫어합니다": "음식 취향과 가게 운영 경험을 바탕으로 한 개성 강한 음식 에세이다.",
    "우리가 작별인사를 할 때마다": "자연의 풍경과 생명을 통해 상실과 애도를 들여다보는 에세이다.",
    "오만과 편견": "편견과 계급, 사랑을 유머와 대화로 풀어낸 제인 오스틴의 고전이다.",
    "나는 내가 왜 살아야 하는지 몰랐습니다": "우울과 자기혐오를 지나 삶의 이유를 다시 붙드는 과정을 담은 에세이다.",
    "찌그러져도 동그라미입니다": "라디오처럼 다정한 문장으로 일상을 위로하는 김창완의 에세이다.",
    "가여운 것들": "죽음의 경계에서 다시 태어난 여성을 통해 욕망과 문명을 비트는 고딕 SF다.",
    "뇌의 흑역사": "인간의 판단이 왜 자주 왜곡되는지 뇌의 작동 방식으로 설명하는 교양서다.",
    "에이스": "무성애를 중심으로 사랑과 관계의 다양한 스펙트럼을 소개하는 논픽션이다.",
    "물 만난 물고기": "음악과 창작의 감각을 짧은 문장과 이미지처럼 풀어낸 아티스트의 책이다.",
    "긴긴밤": "긴 상실의 시간을 지나며 서로를 위로하는 존재들의 여정을 그린 성장소설이다.",
    "꿰맨 눈의 마을": "기이한 마을과 낯선 존재를 통해 불안과 공포를 증폭시키는 호러 소설이다.",
    "과학을 보다 2": "여러 과학자가 각자의 분야를 흥미로운 사례와 함께 풀어내는 잡학형 교양서다.",
    "이처럼 사소한 것들": "한 남자의 조용한 결심이 공동체의 침묵을 흔드는 짧고 단단한 소설이다.",
    "수확자": "죽음을 통제하는 미래 사회에서 윤리와 권력의 균형을 묻는 디스토피아 SF다.",
    "소년이 온다": "광주 5·18을 여러 인물의 시선으로 증언하는 비극적 역사소설이다.",
    "오베라는 남자": "까칠한 노인이 이웃과 관계를 맺으며 다시 삶을 회복해 가는 이야기다.",
    "쇼코의 미소": "일상 속 우정과 상실, 미묘한 감정을 담담하게 그린 단편소설집이다.",
    "어떤 어른": "어른이 된다는 것과 좋은 어른의 태도를 차분하게 돌아보는 에세이다.",
    "어떤 생각들은 나의 세계가 된다": "철학자들의 질문을 통해 삶을 바라보는 시야를 넓혀 주는 인문서다.",
    "지구 끝의 온실": "기후 재난 이후의 세계에서 식물과 인간, 사랑의 연결을 그린 SF소설이다.",
    "프로젝트 헤일메리": "멸망 위기의 지구를 구하기 위해 홀로 우주 임무를 수행하는 과학 모험담이다.",
    "처음 하는 심리학 공부": "심리학의 핵심 개념을 사례와 함께 가볍게 훑는 입문서다.",
    "단 한사람": "한 사람을 살리는 사랑과 관계의 힘을 묻는 문학소설이다.",
    "천문학자는 별을 보지 않는다": "연구자이자 생활인으로서 천문학자의 일상을 유쾌하게 풀어낸 과학 에세이다."
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
    var premise = premiseOverrides[book.title] || "";
    var parts = book.reviews.slice().sort(function (a, b) {
      return (b.rating || 0) - (a.rating || 0);
    }).slice(0, 2).map(function (review) {
      return review.review;
    }).filter(Boolean);
    var impression = parts.length ? parts.join(" / ") + " 라는 인상이 남은 책입니다." : "북클럽 기록을 기반으로 추천했습니다.";
    return premise ? premise + " " + impression : impression;
  }

  function buildProfile(book) {
    var text = (
      book.title + " " +
      (book.author || "") + " " +
      (inferGenre(book) || "") + " " +
      (premiseOverrides[book.title] || "") + " " +
      book.reviews.map(function (review) { return review.review || ""; }).join(" ")
    ).toLowerCase();
    var average = Number(book.averageRating) || 0;

    return {
      essay: countMatches(text, traitGroups.essay),
      literary: countMatches(text, traitGroups.literary),
      science: countMatches(text, traitGroups.science),
      social: countMatches(text, traitGroups.social),
      suspense: countMatches(text, traitGroups.suspense),
      speculative: countMatches(text, traitGroups.speculative),
      comfort: countMatches(text, traitGroups.comfort),
      reflective: countMatches(text, traitGroups.reflective),
      youth: countMatches(text, traitGroups.youth),
      art: countMatches(text, traitGroups.art),
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
    var genre = inferGenre(book);
    var premise = premiseOverrides[book.title] || "";
    return Object.assign({}, book, {
      id: slugify(book.year + "-" + book.title),
      genre: genre,
      premise: premise,
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
