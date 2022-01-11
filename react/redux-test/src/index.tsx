import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./modules";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
const store = createStore(rootReducer);

// 하지만, React 렌더 함수가 동기인데 promise가 resolve 되기 전에 무엇을 렌더 할 수 있을까요? Recoil은 보류중인 데이터를 다루기 위해 React Suspense와 함께 동작하도록 디자인되어 있습니다. 컴포넌트를 Suspense의 경계로 감싸는 것으로 아직 보류중인 하위 항목들을 잡아내고 대체하기 위한 UI를 렌더합니다.
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <RecoilRoot>
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </RecoilRoot>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
