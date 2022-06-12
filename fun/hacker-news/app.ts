type Store = {
    currentPage: number,
    feeds: NewsFeed[],
}

type News = {
    id: number,
    title: string,
    time_ago: string,
    url: string;
    user: string;
    content: string;
}

type NewsFeed = News & {
    readonly points: number,
    comments_count: number,
    read?: boolean,
}

type NewsDetail = News & {
    comments: NewsComment[];
}

type NewsComment = News & {
    level: number,
    comments: NewsComment[],
}

const container: HTMLElement | null = document.getElementById('root');
const ajax: XMLHttpRequest = new XMLHttpRequest();
const content: HTMLDivElement = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

const store: Store = {
    currentPage: 1,
    feeds: [],
}

class Api {
    getRequest<T>(url: string): T {
        const ajax = new XMLHttpRequest();
        ajax.open('GET', url, false);
        ajax.send();
        
        return JSON.parse(ajax.response);
    }
}

// targetClass 로 제공된 class 에 baseClasses 로 제공된 class 들의 기능을 합성한다.
function applyApiMixins(targetClass: any, baseClasses: any[]) {
    baseClasses.forEach(baseClass => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
            const descriptor = Object.getOwnPropertyDescriptor(baseClass.prototype, name);

            if (descriptor) {
                Object.defineProperty(targetClass.prototype, name, descriptor);
            }
        })
    })
}

interface NewsFeedApi extends Api {};
interface NewsDetailApi extends Api {};

class NewsFeedApi {
    getData(): NewsFeed[] {
        return this.getRequest<NewsFeed[]>(NEWS_URL);
    }
}

class NewsDetailApi {
    getData(id: string): NewsDetail {
        return this.getRequest<NewsDetail>(CONTENT_URL.replace('@id', id));
    }
}

applyApiMixins(NewsFeedApi, [Api]);
applyApiMixins(NewsDetailApi, [Api]);

// function getData<AjaxResponse>(url: string): AjaxResponse {
//     ajax.open('GET', url, false);
//     ajax.send();
    
//     return JSON.parse(ajax.response);
// }

class NewsFeedView {
    constructor() {
        
    }
}

function makeFeeds(feeds: NewsFeed[]) {
    for (let i = 0; i < feeds.length; i++) {
        feeds[i].read = false;
    }

    return feeds;
}

function updateView(html: string) {
    if (container) {
        container.innerHTML = html;
    } else {
        console.log('container is null');
    }
}

function newsFeed() {
    const api = new NewsFeedApi();
    let newsFeeds: NewsFeed[] = store.feeds; // getData(NEWS_URL);
    const newsList = [];

    if (newsFeeds.length === 0) {
        newsFeeds = store.feeds = makeFeeds(api.getData());
    }

    // 변경할 부분을 마킹해 두고 template.replace 를 통해 변경한다.
    let template = `
        <div class="bg-gray-600 min-h-screen">
            <div class="bg-white text-xl">
                <div class="mx-auto px-4">
                    <div class="flex justify-between items-center py-6">
                        <div class="flex justify-start">
                            <h1 class="font-extrabold">Hacker News</h1>
                        </div>
                        <div class="items-center justify-end">
                            <a href="#/page/{{__prev_page__}}" class="text-gray-500">
                                Previous
                            </a>
                            <a href="#/page/{{__next_page__}}" class="text-gray-500">
                                Next
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-4 text-2xl text-gray-700">
                {{__news_feed__}}
            </div>
        </div>
    `;

    for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
        newsList.push(`
        <div class="p-6 ${newsFeeds[i].read ? 'bg-gray-200' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
            <div class="flex">
                <div class="flex-auto">
                    <a href="#/show/${newsFeeds[i].id}">${newsFeeds[i].title}</a>
                </div>
                <div class="text-center text-sm">
                    <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${newsFeeds[i].comments_count}</div>
                </div>
            </div>
            <div class="flex mt-3">
                <div class="grid grid-cols-3 text-sm text-gray-500">
                    <div><i class="fas fa-user mr-1"></i>${newsFeeds[i].user}</div>
                    <div><i class="fas fa-heart mr-1"></i>${newsFeeds[i].points}</div>
                    <div><i class="fas fa-clock mr-1"></i>${newsFeeds[i].time_ago}</div>
                </div>
            </div>
        </div>
        `);
    }

    template = template.replace('{{__news_feed__}}', newsList.join(''));
    template = template.replace('{{__prev_page__}}', String(store.currentPage > 1 ? store.currentPage - 1 : 1));
    template = template.replace('{{__next_page__}}', String(store.currentPage +1));

    updateView(template);
}

function newsDetail() {
    const id = location.hash.substr(7)
    const api = new NewsDetailApi();
    const newsContent = api.getData(id);

    let template = `
        <div class="bg-gray-600 min-h-screen pb-8">
            <div class="bg-white text-xl">
                <div class="mx-auto px-4">
                    <div class="flex justify-between items-center py-6">
                        <div class="flex justify-start">
                            <h1 class="font-extrabold">Hacker News</h1>
                        </div>
                        <div class="items-center justify-end">
                            <a href="#/page/${store.currentPage}" class="text-gray-500">
                                <i class="fa fa-times"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="h-full border rounded-xl bg-white m-6 p-4">
                <h2>${newsContent.title}</h2>
                <div class="text-gray-400 h-20">
                    ${newsContent.content}
                </div>

                {{__comments__}}

            </div>
        </div>
    `;

    for (let i = 0; i < store.feeds.length; i++) {
        if (store.feeds[i].id === Number(id)) {
            store.feeds[i].read = true;
            break;
        }
    }

    updateView(template.replace('{{__comments__}}', makeComment(newsContent.comments)));
}

function makeComment(comments: NewsComment[]) {
    const commentString: string[] = [];
    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        commentString.push(`
            <div style="padding-left: ${40 * comment.level}px;" class="mt-4">
                <div class="text-gray-400">
                    <i class="fa fa-sort-up mr-2"></i>
                    <strong>${comment.user}</strong> ${comment.time_ago}
                </div>
                <p class="text-gray-700">${comment.content}</p>
            </div>
        `);

        // comments 를 다시 호출하여 대댓글을 출력한다.
        if (comment.comments.length > 0) {
            commentString.push(makeComment(comment.comments));
        }
    }

    return commentString.join('');
}

function router() {
    const routerPath = location.hash;
    
    if (routerPath === '') {
        newsFeed();
    } else if (routerPath.indexOf('#/page') >= 0) {
        store.currentPage = Number(routerPath.substr(7));
        newsFeed();
    } else {
        newsDetail();
    }

}

window.addEventListener('hashchange', router)

router();