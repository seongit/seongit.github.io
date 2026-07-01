export const siteConfig = {
  name: "SeongEun Kim",
  title: "Full Stack Engineer",
  description: "Portfolio website of SeongEun Kim",
  accentColor: "#C8644F",
  resumeHero: {
    koreanName: "",
    englishName: "SEONGEUN KIM",
    role: "Full Stack Engineer",
    greeting: "안녕하세요",
    rotatorWords: ["지식", "경험", "노하우"],
    particle: "을",
    assetSuffix: "자산으로 만드는",
    closing: "풀스택 개발자 김성은입니다.",
    contacts: [
      {
        label: "Email",
        text: "dev.seongeun@gmail.com",
        href: "mailto:dev.seongeun@gmail.com",
        icon: "mail",
      },
      {
        label: "Blog",
        text: "Technical Blog",
        href: "https://seongeun-it.tistory.com/",
        icon: "book",
      },
      {
        label: "LinkedIn",
        text: "LinkedIn",
        href: "https://www.linkedin.com/in/seongit",
        icon: "linkedin",
      },
    ],
  },
  // 첫 화면(100vh) 온보딩 히어로 카피/CTA. 모든 값은 이 한 곳에서 관리한다.
  onboarding: {
    // 상단 작은 레이블
    eyebrow: "SeongEun Kim — Full Stack Engineer",
    // 대형 헤드라인: accent: true 인 조각만 테라코타 강조 컬러로 렌더된다.
    headline: [
      [{ text: "문제를 풀어 " }, { text: "팀의 자산", accent: true }],
      [{ text: "으로 남기는" }],
      [{ text: "풀스택 엔지니어" }],
    ],
    // 서브 카피
    subtitle:
      "정적 분석 14분을 1분으로, 개인의 경험을 팀의 운영 체계로. 측정 가능한 개선을 만들고, 그 과정을 팀이 다시 쓸 수 있는 문서로 남깁니다.",
    // primary CTA: #problem-solving 으로 스무스 스크롤.
    primaryCta: { label: "See the work", href: "#problem-solving" },
  },
  social: {
    email: "dev.seongeun@gmail.com",
    blog: "https://seongeun-it.tistory.com/",
    linkedin: "https://www.linkedin.com/in/seongit",
    twitter: "",
    github: "",
  },
  blog: {
    rss: "https://seongeun-it.tistory.com/rss",
    title: "Articles",
    description:
      "자세한 문제해결 과정은 블로그에서 확인할 수 있습니다.",
  },
  aboutTitle: "풀스택 개발자, 김성은",
  aboutMe: [
    [
      { text: "지식을 자산", bold: true },
      { text: "으로 만드는 풀스택 개발자 김성은입니다." },
    ],
    [
      { text: "인프런 상위 1.12% 학습량", bold: true },
      {
        text: "을 바탕으로 신규 도구를 빠르게 실무에 적용해 팀의 생산성 개선으로 연결하고, ",
      },
      { text: "팀과 함께 성장하는 문화", bold: true },
      { text: "를 만들어가고 있습니다." },
    ],
    [
      { text: "누적 조회수 8만 회의 개발 블로그 운영 경험", bold: true },
      { text: "을 운영 가이드와 기술 문서로 확장해 왔습니다." },
    ],
    [
      { text: "문서도 하나의 제품", bold: true },
      { text: "이라고 생각하며, " },
      { text: "팀이 실제로 사용할 수 있는 자산으로 관리되는 것", bold: true },
      { text: "을 중요하게 생각합니다." },
    ],
  ],
  skills: [
    "Java",
    "JavaScript",
    "TypeScript",
    "Spring Boot",
    "Spring",
    "SQL",
    "JPA",
    "Jenkins",
    "SonarQube",
    "Docker",
    "Kubernetes",
    "JUnit",
  ],
  projects: [
    {
      name: "정적 분석 성능 저하 이슈 원인 규명",
      company: "오케스트로",
      year: "2026.06",
      problem:
        "CI/CD 파이프라인에서 SonarQube 정적 분석이 14분 이상 걸리며 릴리즈 흐름의 병목으로 작동했습니다.",
      approach:
        "분석 실행 환경과 스토리지 I/O를 추적해 NFS 기반 스토리지 구성이 병목 원인임을 확인하고, 로컬 디스크 전환을 제안·검증했습니다.",
      result:
        "정적 분석 시간을 14분에서 1분으로 약 93% 단축하고, 품질 검증 피드백 속도를 개선했습니다.",
      link: "",
      skills: ["SonarQube", "Jenkins", "NFS", "Static Analysis"],
    },
    {
      name: "Webhook HMAC 검증 적용기",
      company: "오케스트로",
      year: "2026.06",
      problem:
        "SonarQube Webhook 연동 과정에서 외부 요청의 출처와 변조 여부를 애플리케이션 레벨에서 검증해야 했습니다.",
      approach:
        "Webhook payload와 secret 기반 HMAC 서명을 비교하는 검증 흐름을 적용하고, 실패 요청은 처리 전에 차단하도록 연동 정책을 정리했습니다.",
      result:
        "품질 진단 결과 수집 연동의 신뢰성을 높이고, 외부 이벤트 기반 처리 과정의 보안 리스크를 줄였습니다.",
      link: "",
      skills: ["SonarQube", "Webhook", "HMAC", "Security"],
    },
    {
      name: "AI Agent 운영 리스크 사전 검증 체계",
      company: "오케스트로",
      year: "2026.06",
      problem:
        "AI Agent 도입 과정에서 위험 명령 실행, 환경 오염, 문서 품질 편차 같은 운영 리스크가 발생할 수 있었습니다.",
      approach:
        "Rule·Skill 기반 개발 가이드를 만들고, Hook 기반 사전 검증 정책과 개발 환경 격리 기준을 수립했습니다.",
      result:
        "AI Agent 활용을 개인 실험에서 팀 단위 운영 체계로 확장하고, 문서화·분석·코드 검증 업무에 적용했습니다.",
      link: "",
      skills: ["Claude Code", "Codex", "Cursor", "Hooks"],
    },
    {
      name: "Template Method + Reader 추상화",
      company: "오케스트로",
      year: "2026.03",
      problem:
        "검증 로직마다 파일 읽기와 검증 흐름이 반복되어 새 Validator를 추가할수록 중복과 변경 비용이 커졌습니다.",
      approach:
        "공통 실행 흐름은 Template Method로 고정하고, 입력 소스별 Reader를 분리해 확장 지점만 남겼습니다.",
      result:
        "검증 로직 추가 시 반복 구현을 줄이고, 입력 방식 변화가 전체 Validator 구조로 번지는 문제를 줄였습니다.",
      link: "",
      skills: ["Java", "Design Pattern", "Refactoring"],
    },
    {
      name: "useState에서 useReducer로 상태 관리 전환",
      company: "오케스트로",
      year: "2026.01",
      problem:
        "복잡한 화면 상태를 여러 useState로 나눠 관리하면서 상태 전이 조건이 흩어지고 유지보수가 어려워졌습니다.",
      approach:
        "관련 상태를 하나의 reducer로 묶고, 이벤트 중심으로 상태 전이를 명시해 화면 로직을 정리했습니다.",
      result:
        "상태 변경 흐름을 추적하기 쉬워졌고, 테스트 수행·검증 화면의 조건부 렌더링 안정성을 높였습니다.",
      link: "",
      skills: ["React", "useReducer", "State Management"],
    },
    {
      name: "Spring @ModelAttribute 컬렉션 바인딩 제한",
      company: "오케스트로",
      year: "2024.12",
      problem:
        "통합·인수 테스트 관리 기능에서 대량 컬렉션 요청을 처리할 때 Spring 바인딩 한계로 요청 처리가 실패했습니다.",
      approach:
        "실패 조건을 재현하고 @ModelAttribute 바인딩 방식의 제약을 확인한 뒤, 대량 요청에 맞는 입력 구조로 분리했습니다.",
      result:
        "테스트 케이스 관리 기능의 대량 입력 안정성을 높이고, 같은 유형의 요청 실패를 재발 방지했습니다.",
      link: "",
      skills: ["Spring", "ModelAttribute", "Java", "Testing"],
    },
  ],
  experience: [
    {
      company: "오케스트로",
      title: "DevOps플랫폼 개발팀 | Full Stack Engineer | 정규직",
      dateRange: "2022. 12. ~ 재직중",
      bullets: [
        "CI/CD 파이프라인 기술을 활용한 DevOps 환경을 제공하는 클라우드 솔루션 트럼본 개발",
        "팀 컨벤션을 기반으로 AI Agent rule·skill 정의, Hook 기반 사전 검증 정책 수립하여 팀 단위 AI 개발 운영체계를 0→10 확장",
        "Swagger API 기반 API 명세서 자동화 워크플로우를 팀 내 도입하여 개발 문서 작성 시간을 평균 43분/건에서 29분/건으로 57% 단축",
        "SonarQube 및 JUnit 기반 자동화 테스트 파이프라인을 구축하고 분석 결과를 포털 실행 이력에 통합해 품질 이슈 확인 절차를 6단계에서 3단계로 50% 단축",
        "QA·테스트 검증 도메인을 담당하며 통합/인수 테스트 워크플로우 설계 및 QA 협업 프로세스 개선",
      ],
    },
    {
      company: "엠피씨플러스",
      title: "IT 기획 운영팀 | Full Stack Engineer | 정규직",
      dateRange: "2021. 11. ~ 2022. 12. (1년 2개월)",
      bullets: [
        "고객지원 업무를 표준화·자동화하는 CS 중심 CRM 솔루션 개발",
        "고객사별 상담 업무 프로세스 분석 및 상담 애플리케이션 기능 개발 담당",
        "SONY, 신세계면세점, 사랑의열매 등 약 10개 상담 애플리케이션 운영 및 유지보수 수행",
        "Windows 운영 서버의 Linux 이전 및 모니터링 자동화 도입을 통해 운영 비용 절감과 장애 대응 체계 개선 기여",
      ],
    },
  ],
  education: [],
};
