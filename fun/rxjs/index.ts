// import the fromEvent operator
import { fromEvent } from "rxjs";

// grap button reference
const button = document.getElementById("myButton");

// create an observable of butotn clicks
const myObservable = button && fromEvent(button, "click");

// for now, let's just log the event on each click
// const subscription = myObservable?.subscribe((event) => console.log(event));
const subscription = myObservable?.subscribe({
  // on successful emissions
  next: (event) => console.log(event),
  // on errors
  error: (error) => console.log(error),
  // called once on completion
  complete: () => console.log("complete!"),
});
