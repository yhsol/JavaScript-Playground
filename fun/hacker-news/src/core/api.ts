import type { NewsDetail, NewsFeed } from "../types";

export default class Api {
  xhr: XMLHttpRequest;
  url: string;

  constructor(url: string) {
    this.xhr = new XMLHttpRequest();
    this.url = url;
  }

  getRequestWithXHR<T>(cb: (data: T) => void) {
    this.xhr.open('GET', this.url);
    this.xhr.addEventListener('load', () => {
      cb(JSON.parse(this.xhr.response) as T);
    });
    this.xhr.send();
  }

  getRequestWithPromise<T>(cb: (data: T) => void) {
    fetch(this.url)
    // 여기서 .json() 은 비동기적으로 데이터를 json 형태로 바꿈.
    .then(response => response.json())
    .then(cb)
    .catch(() => {
      console.log('request error!');
    })
  }
}

export class NewsFeedApi extends Api {
  constructor(url: string) {
    super(url);
  }

  getDataWithXHR(cb: (data: NewsFeed[]) => void) {
    return this.getRequestWithXHR<NewsFeed[]>(cb);
  }

  getDataWithPromise(cb: (data: NewsFeed[]) => void) {
    return this.getRequestWithPromise<NewsFeed[]>(cb);
  }
}

export class NewsDetailApi extends Api {
  constructor(url: string) {
    super(url);
  }

  getDataWithXHR(cb: (data: NewsDetail) => void) {
    return this.getRequestWithXHR<NewsDetail>(cb);
  }

  getDataWithPromise(cb: (data: NewsDetail) => void) {
    return this.getRequestWithPromise<NewsDetail>(cb);
  }
}
