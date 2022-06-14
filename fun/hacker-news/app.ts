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

type RouterInfo = {
    path: string,
    page: View,
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

// abstract class 로 선언함으로써, 상속받는 클래스는 이 클래스의 규격에 맞춰 구현해야 함.
abstract class View {
    private template: string;
    private renderTemplate: string;
    private container: HTMLElement;
    private htmlList: string[];
    
    constructor(containerId: string, template: string) {
        const containerElement = document.getElementById(containerId);
        
        if (!containerElement) {
            throw new Error('container is null');
        }

        this.container = containerElement;
        this.template = template;
        this.renderTemplate = template;
        this.htmlList = [];
    }

    protected updateView() {
        this.container.innerHTML = this.renderTemplate
        // 이후의 update 진행을 위해 현재 update 진행 후에 renderTemplate 을 초기화 함.
        this.renderTemplate = this.template;
    }

    protected addHtml(htmlString: string) {
        this.htmlList.push(htmlString);
    }

    protected getHtml() {
        const result = this.htmlList.join('');
        this.clearHtmlList();
        return result;
    }

    protected setTemplateData(key: string, value: string) {
        this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
    }

    private clearHtmlList() {
        this.htmlList = [];
    }

    // 하위 클래스들에서 구현해야하는 render 메서드를 abstract 를 통해 명시함.
    // 하위 클래스는 abstract 메서드를 구현해야 함.
    abstract render(): void;
}

class Router {
    routerTable: RouterInfo[];
    defaultRoute: RouterInfo | null;

    constructor() {
        // 아래 코드는 브라우저에서 실행하게됨. 즉 이때의 this 컨텍스트는 는 Router 의 인스턴스가 아님.
        // Router 의 인스턴스가 아니기 때문에 defaultRoute 나 setDefaultRoute 메서드를 사용할 수 없음.
        // 그렇기 때문에 this 를 고정하기 위해 bind 를 사용하여 묶어줌.
        window.addEventListener('hashchange', this.route.bind(this));
        
        this.routerTable = [];
        this.defaultRoute = null;


    }

    addRouterPath(path: string, page: View) {
        this.routerTable.push({ path, page });
    }

    setDefaultView(page: View) {
        this.defaultRoute = { path: '', page };
    }

    route() {
        const routerPath = location.hash;
        if (routerPath === '' && this.defaultRoute) {
            this.defaultRoute.page.render();
        }
        //  else if (routerPath.indexOf('#/page') >= 0) {
        //     store.currentPage = Number(routerPath.substr(7));
        //     newsFeed();
        // } else {
        //     newsDetail();
        // }

        for (const routeInfo of this.routerTable) {
            if (routerPath.indexOf(routeInfo.path) >= 0) {
                routeInfo.page.render();
                break;
            }
        }
    }
}

class NewsFeedView extends View {
    private api: NewsFeedApi;
    private feeds: NewsFeed[];
    
    // 유연성을 위해 containerId 를 외부에서 받는다.
    constructor(containerId: string) {
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

        super(containerId, template);

        this.api = new NewsFeedApi();
        this.feeds = store.feeds; // getData(NEWS_URL);

        if (this.feeds.length === 0) {
            this.feeds = store.feeds = this.api.getData();
            this.makeFeeds();
        }
    }

    render() {
        store.currentPage = Number(location.hash.substr(7) || 1);

        for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
            const feed = this.feeds[i];

            this.addHtml(`
            <div class="p-6 ${feed.read ? 'bg-gray-200' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
                <div class="flex">
                    <div class="flex-auto">
                        <a href="#/show/${feed.id}">${feed.title}</a>
                    </div>
                    <div class="text-center text-sm">
                        <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${feed.comments_count}</div>
                    </div>
                </div>
                <div class="flex mt-3">
                    <div class="grid grid-cols-3 text-sm text-gray-500">
                        <div><i class="fas fa-user mr-1"></i>${feed.user}</div>
                        <div><i class="fas fa-heart mr-1"></i>${feed.points}</div>
                        <div><i class="fas fa-clock mr-1"></i>${feed.time_ago}</div>
                    </div>
                </div>
            </div>
            `);
        }
    
        this.setTemplateData('news_feed', this.getHtml());
        this.setTemplateData('prev_page', String(store.currentPage > 1 ? store.currentPage - 1 : 1));
        this.setTemplateData('next_page', String(store.currentPage +1));
    
        this.updateView();
    }

    private makeFeeds() {
        for (let i = 0; i < this.feeds.length; i++) {
            this.feeds[i].read = false;
        }
    }
}

class NewsDetailView extends View {
    constructor(containerId: string) {
        let template = `
            <div class="bg-gray-600 min-h-screen pb-8">
                <div class="bg-white text-xl">
                    <div class="mx-auto px-4">
                        <div class="flex justify-between items-center py-6">
                            <div class="flex justify-start">
                                <h1 class="font-extrabold">Hacker News</h1>
                            </div>
                            <div class="items-center justify-end">
                                <a href="#/page/{{__currentPage__}}" class="text-gray-500">
                                    <i class="fa fa-times"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="h-full border rounded-xl bg-white m-6 p-4">
                    <h2>{{__title__}}</h2>
                    <div class="text-gray-400 h-20">
                        {{__content__}}
                    </div>
    
                    {{__comments__}}
    
                </div>
            </div>
        `;

        super(containerId, template);
    }

    render() {
        const id = location.hash.substr(7)
        const api = new NewsDetailApi();
        const newsContent = api.getData(id);

        for (let i = 0; i < store.feeds.length; i++) {
            if (store.feeds[i].id === Number(id)) {
                store.feeds[i].read = true;
                break;
            }
        }
    
        this.setTemplateData('comments', this.makeComment(newsContent.comments))
        this.setTemplateData('currentPage', String(store.currentPage));
        this.setTemplateData('title', newsContent.title);
        this.setTemplateData('content', newsContent.content);
        
        this.updateView();
    }

    private makeComment(comments: NewsComment[]) {
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            this.addHtml(`
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
                this.addHtml(this.makeComment(comment.comments));
            }
        }
    
        return this.getHtml();
    }
}

// router 인스턴스 만들기.
const router = new Router();
const newsFeedView = new NewsFeedView('root');
const newsDetailView = new NewsDetailView('root');

router.setDefaultView(newsFeedView);
router.addRouterPath('/page/', newsFeedView);
router.addRouterPath('/show/', newsDetailView);

router.route();
