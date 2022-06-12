# note

- 코드의 양이 늘어나더라도 복잡도가 늘어나지는 않는 코드
- SourceMap 타입스크립트 파일을 컴파일 해서 자바스크립트로 변환하더라도 브라우저에서 기존 ts 파일을 확인할 수 있도록 map 파일을 제공해주는 것.
- class - projected
    - 클래스 속성과 메서드를 외부로 노출시키지 않는 지시어
    - 상속 클래스에서는 사용 가능
    - The protected modifier acts much like the private modifier with the exception that members declared protected can also be accessed within deriving classes.
    - https://www.typescriptlang.org/docs/handbook/classes.html#understanding-protected
    - protected members are only visible to subclasses of the class they’re declared in.
    - https://www.typescriptlang.org/docs/handbook/2/classes.html#protected
- 믹스인
    - 클래스를 조금 더 독립적으로 바라봄
    - 상하관계를 명시하지 않음
    - 필요할 때 조합하여 사용