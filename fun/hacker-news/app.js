const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

const store = {
    currentPage: 1,
}

function getData(url) {
    ajax.open('GET', url, false);
    ajax.send();
    
    return JSON.parse(ajax.response);
}

function newsFeed() {
    const newsFeed = getData(NEWS_URL);
    const newsList = [];

    let template = `
        <div>
            <h1>Hacker News</h1>
            <ul>
                {{__news_feed__}}
            </ul>
            <div>
                <a href="#/page/{{__prev_page__}}">prev</a>
                <a href="#/page/{{__next_page__}}">next</a>
            </div>
        </div>
    `;

    newsList.push('<ul>')
    for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
        newsList.push(`
        <li>
            <a href="#/show/${newsFeed[i].id}">
                ${newsFeed[i].title} (${newsFeed[i].comments_count})
            </a>
        </li>
        `);
    }
    newsList.push('</ul>')
    newsList.push(`
    <div>
        <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">prev</a>
        <a href="#/page/${store.currentPage + 1}">next</a>
    </div>
    `);
    container.innerHTML = newsList.join('');
}

function newsDetail() {
    const newsContent = getData(CONTENT_URL.replace('@id', location.hash.substr(7)));
    
    container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
        <a href="#/page/${store.currentPage}">to list</a>
    </div>    
    `;
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