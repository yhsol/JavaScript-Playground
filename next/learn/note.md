- 페이지의 DOM은 소스 코드, 즉 사용자가 만든 원본 HTML 파일과 다릅니다. HTML은 초기 페이지 내용 을 나타내는 반면 DOM은 작성한 JavaScript 코드에 의해 변경된 업데이트된 페이지 내용 을 나타내기 때문입니다.

- 명령형 대 선언적 프로그래밍

  - HTML 에 일일이 UI 업데이트 단계를 명시하는 것은 명령형 프로그래밍의 좋은 예. 장황함.
  - 개발 프로세스의 속도를 높일 수 있기 때문에 선언적 접근 방식이 선호되는 경우가 많음. DOM 메서드를 작성하는 대신 개발자가 표시하려는 내용을 선언할 수 있다는 도움이 될 것.
  - 즉, 명령형 프로그래밍 은 요리사에게 피자를 만드는 방법에 대한 단계별 지침을 제공하는 것과 같습니다. 선언적 프로그래밍 은 피자를 만드는 데 필요한 단계를 고려하지 않고 피자를 주문하는 것과 같습니다. 🍕
  - 개발자가 사용자 인터페이스를 빌드하는 데 도움이 되는 널리 사용되는 선언적 라이브러리는 React 입니다.
    - 개발자는 사용자 인터페이스에 어떤 일이 일어나기를 원하는지 React에게 말할 수 있으며 React는 사용자를 대신하여 DOM을 업데이트하는 단계 를 알아낼 것입니다.

- Next.js 컴파일러

  - Rust로 작성된 컴파일러와 컴파일, 축소, 번들링 등에 사용할 수 있는 플랫폼인 SWC가 있기 때문에 가능함.

- 컴파일이란?

  - 개발자는 JSX, TypeScript 및 최신 버전의 JavaScript와 같이 개발자에게 더 친숙한 언어로 코드를 작성함. 이러한 코드를 브라우저에서 읽기 전에 브라우저가 이해할 수 있는 JavaScript로 컴파일 해야함.
  - 컴파일은 한 언어로 된 코드를 가져와 다른 언어 또는 해당 언어의 다른 버전으로 출력하는 프로세스를 말함.
  - Next.js에서 컴파일은 코드를 편집할 때 개발 단계에서 발생하며 프로덕션을 위해 애플리케이션을 준비하기 위한 빌드 단계의 일부로 발생함.

- minifying

  - Next.js에서 JavaScript 및 CSS 파일은 프로덕션을 위해 자동으로 minifying 됨.

- 번들링

  - 개발자는애플리케이션을 더 큰 부분의 애플리케이션을 구축하는데 사용할 수 있는 모듈, 컴포넌트, 함수로 나눕니다. 이러한 내부 모듈과 써드파티 패키지를 내보내고 가져오면 파일 종속성의 복잡한 웹이 생성됨.
  - 번들링은 사용자가 웹 페이지를 방문할 때 파일에 대한 요청 수를 줄이는 것을 목표로 웹 종속성을 해결하고 파일(또는 모듈)을 브라우저에 최적화된 번들로 병합(또는 '패키징')하는 프로세스임.
  - 컴파일은 코드를 브라우저에서 구문 분석 가능한 것으로 변환하는 것. 번들링은 애플리케이션 종속성 그래프를 해결하고 파일 수를 줄이는 것.

- 코드 스플리팅

  - 개발자는 일반적으로 애플리케이션을 다른 URL에서 액세스할 수 있는 여러 페이지로 분할함. 이러한 각 페이지는 애플리케이션에 대한 고유한 진입점(entry point)이 됨.
  - 코드 스플리팅은 애플리케이션 번들을 각 진입점에 필요한 더 작은 청크로 분할하는 프로세스임. 목표는 해당 페이지를 실행하는데 필요한 코드만 로드하여 애플리케이션의 초기 로드 시간을 개선하는 것임.
  - Next.js는 코드 스플리팅을 기본적으로 지원함. 디렉토리내의 각 파일 `pages/`은 빌드 단계에서 자동으로 자체 JavaScript 번들로 코드 분할됨.
    - 페이지 간에 공유되는 모든 코드는 추가 탐색 시 동일한 코드를 다시 다운로드하지 않도록 다른 번들로 분할됩니다.
    - 초기 페이지 로드 후 Next.js는 사용자가 탐색할 가능성이 있는 다른 페이지 의 코드를 미리 로드 할 수 있습니다.
    - 동적 가져오기 는 처음에 로드되는 코드를 수동으로 분할하는 또 다른 방법입니다.

- 빌드 시간 및 런타임

  - 빌드 시간 (또는 빌드 단계)은 프로덕션용 애플리케이션 코드를 준비하는 일련의 단계에 지정된 이름임.
  - 애플리케이션을 빌드할 때 Next.js는 코드를 프로덕션에 최적화된 파일로 변환하여 서버에 배포하고 사용자가 사용할 수 있음. 이러한 파일에는 다음이 포함됨.
    - 정적으로 생성된 페이지용 HTML 파일
    - 서버에서 페이지를 렌더링하기 위한 JavaScript 코드
    - 클라이언트에서 페이지를 interactive 하게 만들기 위한 JavaScript 코드
    - CSS 파일
  - 런타임 (또는 요청 시간)은 애플리케이션이 빌드 및 배포된 후 사용자의 요청에 대한 응답으로 애플리케이션이 실행되는 기간을 나타냅니다 .

- 클라이언트 및 서버

  - 웹 응용 프로그램의 맥락에서 클라이언트는 응용 프로그램 코드에 대한 요청을 서버에 보내는 사용자 장치의 브라우저를 나타냄. 그런 다음 서버에서 받은 응답을 사용자가 상호작용할 수 있는 인터페이스로 바꿈.
  - 서버 는 애플리케이션 코드를 저장하고, 클라이언트로부터 요청을 수신하고, 일부 계산을 수행하고, 적절한 응답을 다시 보내는 데이터 센터의 컴퓨터를 나타냅니다.

- 렌더링

  - React에서 작성한 코드를 UI의 HTML 표현으로 변환하는데 피할 수 없는 작업 단위.
  - 렌더링은 서버 또는 클라이언트에서 수행될 수 있습니다. 빌드 시 미리 발생하거나 런타임 시 모든 요청에서 발생할 수 있습니다.
  - Next.js에서는 서버 측 렌더링 , 정적 사이트 생성 및 클라이언트 측 렌더링 의 세 가지 유형의 렌더링 방법을 사용할 수 있습니다 .
    - 자세한 설명은 문서 참고
  - 페이지 수준에서 렌더링 방법을 선택할 수 있음

- 네트워크

  - 애플리케이션 코드가 저장되고 네트워크에 배포되면 실행되는 위치를 아는것이 도움이 됨. 네트워크를 리소스를 공유할 수 있는 연결된 컴퓨토(또는 서버)로 생각할 수 있음. Next.js 애플리케이션의 경우 애플리케이션 코드를 원본 서버, CDN(콘텐츠 전송 네트워크) 및 Edge 에 배포할 수 있음.
  - Origin Servers
    - 앞에서 설명한 것처럼 서버는 응용 프로그램 코드의 원래 버전을 저장하고 실행하는 주 컴퓨터를 나타냄
    - 우리는 이 서버를 CDN 서버 및 에지 서버 와 같이 애플리케이션 코드가 배포될 수 있는 다른 장소와 구별하기 위해 origin 이라는 용어를 사용 합니다.
    - origin server 는 요청을 받으면 응답을 보내기 전에 몇 가지 계산을 수행합니다. 이 계산 작업의 결과는 CDN(Content Delivery Network)으로 이동할 수 있습니다.
  - Content Delivery Network
    - CDN은 전 세계 여러 위치에 정적 콘텐츠(예: HTML 및 이미지 파일)를 저장하고 클라이언트와 원본 서버 사이에 배치됨. 새 요청이 들어오면 사용자와 가장 가까운 CDN 위치에서 캐시된 결과로 응답할 수 있음.
    - 이렇게 하면 각 요청에 대해 계산을 수행할 필요가 없기 때문에 오리진의 부하가 줄어듭니다. 또한 응답이 지리적으로 더 가까운 위치에서 제공되기 때문에 사용자가 더 빠르게 작업할 수 있습니다.
    - Next.js에서는 사전 렌더링을 미리 수행할 수 있으므로 CDN은 작업의 정적 결과를 저장하는 데 적합하므로 콘텐츠 전달이 더 빨라집니다.
  - The Edge
    - 에지는 사용자에게 가장 가까운 네트워크 의 프린지( 또는 에지 )에 대한 일반화된 개념입니다 . CDN은 네트워크의 가장자리(에지)에 정적 콘텐츠를 저장하기 때문에 "에지"의 일부로 간주될 수 있습니다. CDN과 유사하게 에지 서버는 전 세계 여러 위치에 배포됩니다. 그러나 정적 콘텐츠를 저장하는 CDN과 달리 일부 에지 서버는 코드를 실행할 수 있습니다. 즉 , 사용자에게 더 가까운 Edge에서 캐싱 과 코드 실행 을 모두 수행할 수 있습니다. Edge에서 코드를 실행하면 전통적으로 클라이언트 측 또는 서버 측에서 수행되었던 작업 중 일부를 Edge로 이동할 수 있습니다( 여기에서 Next.js가 있는 예제 참조 ). 이렇게 하면 클라이언트로 전송되는 코드의 양이 줄어들고 사용자 요청의 일부가 원본 서버로 완전히 돌아갈 필요가 없으므로 애플리케이션의 성능이 향상되어 대기 시간이 줄어듭니다. Next.js에서는 미들웨어 를 사용하여 Edge에서 코드를 실행할 수 있으며 곧 React Server Components 를 사용하여 코드를 실행할 수 있습니다 .

- React 로 웹 애플리케이션을 처음부터 빌드하기 위해 고려해야 할 사항

  - 코드는 webpack과 같은 번들러를 사용하여 번들링되고 Babel과 같은 컴파일러를 사용하여 변환되어야 합니다.
  - 코드 분할과 같은 프로덕션 최적화를 수행해야 합니다.
  - 성능 및 SEO를 위해 일부 페이지를 정적으로 사전 렌더링할 수 있습니다. 서버 측 렌더링 또는 클라이언트 측 렌더링을 사용할 수도 있습니다.
  - React 앱을 데이터 저장소에 연결하기 위해 서버 측 코드를 작성해야 할 수도 있습니다.

- 이미지 구성 요소 사용

  - 이미지는 기본적으로 지연 로드됩니다. 즉, 뷰표트 외부의 이미지에 대해서는 페이지 속도에 영향을 미치지 않습니다. 이미지는 뷰포트로 스크롤될 때 로드됩니다.

- 기본적으로 Next.js는 모든 페이지를 미리 렌더링합니다. 즉, Next.js는 클라이언트 측 JavaScript로 모든 작업을 수행하는 대신 각 페이지에 대해 미리 HTML을 생성합니다. 사전 렌더링은 더 나은 성능과 SEO를 제공할 수 있습니다.

- 생성된 각 HTML은 해당 페이지에 필요한 최소한의 JavaScript 코드와 연결됩니다. 브라우저에서 페이지를 로드하면 해당 JavaScript 코드가 실행되고 페이지가 완전히 interactive 하게 만들어집니다. (이 과정을 hydration 이라고 합니다.)

- 사전 렌더링이 진행중인지 확인
  - 브라우저에서 JavaScript를 비활성화하고 페이지 엑세스
  - 앱이 JavaScript 없이 렌더링된 것을 확인해야 함. Next.js가 앱을 정적 HTML로 미리 렌더링하여 JavaScript를 실행하지 않고도 앱 UI를 볼 수 있기 때문임.
