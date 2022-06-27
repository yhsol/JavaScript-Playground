import { NewsFeed, NewsStore } from "./types"

export class Store implements NewsStore {
  private feeds: NewsFeed[];
  private _currentPage: number;

  constructor() {
    this.feeds = [];
    this._currentPage = 1;
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(page: number) {
    this._currentPage = page;
  }

  get nextPage() {
    return this._currentPage + 1;
  }

  get prevPage() {
    return this._currentPage > 1 ? this._currentPage - 1 : 1;
  }
  
  get numberOfFeed() {
    return this.feeds.length;
  }

  get hasFeeds() {
    return this.feeds.length > 0;
  }

  getAllFeeds() {
    return this.feeds;
  }

  getFeed(position: number) {
    return this.feeds[position];
  }

  setFeeds(feeds: NewsFeed[]) {
    this.feeds = feeds.map(feed => ({
      ...feed, 
      read: false,
    }));
  }

  makeRead(id: number) {
    const feed = this.feeds.find(feed => feed.id === id);

    if (feed) {
      feed.read = true;
    }
  }
}