import type { NewsDetail, NewsFeed } from "../types";

export class Api {
    ajax: XMLHttpRequest;
    url: string;

    constructor(url: string) {
        this.ajax = new XMLHttpRequest();
        this.url = url;
    }
    
    getRequest<T>(): T {
        this.ajax.open('GET', this.url, false);
        this.ajax.send();
        
        return JSON.parse(this.ajax.response);
    }
}

export class NewsFeedApi extends Api {
    getData(): NewsFeed[] {
        return this.getRequest<NewsFeed[]>();
    }
}

export class NewsDetailApi extends Api {
    getData(id: string): NewsDetail {
        return this.getRequest<NewsDetail>();
    }
}