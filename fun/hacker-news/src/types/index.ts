import View from "../core/view";

export interface NewsStore {
    currentPage: number;
    nextPage: number;
    prevPage: number;
    numberOfFeed: number;
    hasFeed: boolean;
    getAllFeeds(): NewsFeed[];
    getFeed(position: number): NewsFeed;
    setFeeds(feeds: NewsFeed[]): void;
    makeRead(id: number): void;
}

export type News = {
    id: number,
    title: string,
    time_ago: string,
    url: string;
    user: string;
    content: string;
}

export type NewsFeed = News & {
    readonly points: number,
    comments_count: number,
    read?: boolean,
}

export type NewsDetail = News & {
    comments: NewsComment[];
}

export type NewsComment = News & {
    level: number,
    comments: NewsComment[],
}

export type RouterInfo = {
    path: string,
    page: View,
}