# RXJS

## What is an Obsevable?

- Observable은 시간이 지남에 따라 도착할 수 있는 스트림 또는 데이터 소스를 나타냄.
- 옵저버블은 거의 anything 에서 만들 수 있는데 가장 흔한 예는 이벤트임.
- 이것은 마우스 이동, 버튼 클릭, 텍스트 필드 입력, 경로 변경 등 무엇이든 될 수 있음.
- Observable을 생성하는 가장 쉬운 방법은 내장 생성 함수를 사용하는 것입니다.
- 예를 들어 fromEvent 도우미 함수를 사용하여 마우스 클릭 이벤트의 관찰 가능 항목을 만들 수 있습니다.

## Subscription

구독은 모든 것을 움직이는 원동력입니다. 이것을 수도꼭지처럼 생각할 수 있습니다. 수도꼭지(관찰 가능)가 준비되어 있고 누군가 손잡이를 돌리기만 하면 됩니다. Observable의 경우 해당 역할은 구독자에게 속합니다.
구독을 생성하려면 관찰자라고도 하는 함수(또는 개체)를 제공하는 구독 메서드를 호출합니다. 여기에서 각 이벤트에 대한 반응(-ive 프로그래밍) 방법을 결정할 수 있습니다. 구독이 생성될 때 이전 시나리오에서 어떤 일이 발생하는지 살펴보겠습니다.

```js
// import the fromEvent operator
import { fromEvent } from "rxjs";

// grab button reference
const button = document.getElementById("myButton");

// create an observable of button clicks
const myObservable = fromEvent(button, "click");

// for now, let's just log the event on each click
const subscription = myObservable.subscribe((event) => console.log(event));
```

위의 예에서 myObservable.subscribe()를 호출하면

1. 버튼에 클릭 이벤트에 대한 이벤트 리스너를 설정함.
2. 각 클릭 이벤트마다 구독 메서드(관찰자)에 전달한 함수를 호출함.
3. clean up 로직(적절한 이벤트 리스너를 제거하는 것과 같은)을 포함한 `unsubscribe` 와 함께 구독 객체를 반환함.
