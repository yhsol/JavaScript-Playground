const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

function getData(url) {
    ajax.open('GET', url, false);
    ajax.send();
    
    return JSON.parse(ajax.response);
}

// ajax.open('GET', NEWS_URL, false);
// ajax.send();

// const newsFeed = JSON.parse(ajax.response);
const newsFeed = getData(NEWS_URL);
const ul = document.createElement('ul');

window.addEventListener('hashchange', () => {
    const id = location.hash.substr(1);
    // ajax.open('GET', CONTENT_URL.replace('@id', id), false);
    // ajax.send();

    // const newsContent = JSON.parse(ajax.response);
    const newsContent = getData(CONTENT_URL.replace('@id', id));
    const title = document.createElement('h1');

    title.innerText = newsContent.title;

    content.appendChild(title);
})

for (let i = 0; i < 10; i++) {
    const div = document.createElement('div');
    // const li = document.createElement('li');
    // const a = document.createElement('a');

    div.innerHTML = 
    `
    <li>
        <a href="#${newsFeed[i].id}">
            ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
    </li>
    `;

    // a.href = `#${newsFeed[i].id}`;
    // a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;

    // li.appendChild(a);
    // ul.appendChild(li);
    ul.appendChild(div.firstElementChild);
}

container.appendChild(ul);
container.appendChild(content);
