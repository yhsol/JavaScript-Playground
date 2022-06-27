import { NEWS_URL } from "../config";
import { NewsFeedApi } from "../core/api";
import View from "../core/view";
import { NewsStore } from "../types";

const template = `
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
          <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
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

export default class NewsFeedView extends View {
  private api: NewsFeedApi;
  private store: NewsStore;

  // 유연성을 위해 containerId 를 외부에서 받는다.
  constructor(containerId: string, store: NewsStore) {
    super(containerId, template);

    this.store = store;
    this.api = new NewsFeedApi(NEWS_URL);

    // 생성자에서 api 호출을 하면 이 클래스 생성 시점에 렌더할 데이터가 왔는지 보장할 수 없기 때문에 api 호출을 렌더로 옮김.
    // this.store.setFeeds(this.api.getData());
  }

  render = (page: string = '1') => {
    this.store.currentPage = Number(page);
    
    // 페이징 될 때마다 렌더를 다시 하기 위해 html 생성 부분을 바깥으로 빼서 함수로 만들고 콜백 실행때마다 새로 생성하고 실행한다.
    if (!this.store.hasFeeds) {
      this.api.getData((data) => {
        this.store.setFeeds(data);
        this.renderView()
      })
    }
    
    this.renderView()
  }
  
  renderView = () => {
    for (let i = (this.store.currentPage - 1) * 10; i < this.store.currentPage * 10; i++) {
      const { id, title, comments_count, user, points, time_ago, read } = this.store.getFeed(i);

      this.addHtml(`
        <div class="p-6 ${read ? 'bg-red-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
          <div class="flex">
            <div class="flex-auto">
              <a href="#/show/${id}">${title}</a>  
            </div>
            <div class="text-center text-sm">
              <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${comments_count}</div>
            </div>
          </div>
          <div class="flex mt-3">
            <div class="grid grid-cols-3 text-sm text-gray-500">
              <div><i class="fas fa-user mr-1"></i>${user}</div>
              <div><i class="fas fa-heart mr-1"></i>${points}</div>
              <div><i class="far fa-clock mr-1"></i>${time_ago}</div>
            </div>  
          </div>
        </div>    
      `);
    }  

    this.setTemplateData('news_feed', this.getHtml());
    this.setTemplateData('prev_page', String(this.store.prevPage));
    this.setTemplateData('next_page', String(this.store.nextPage));
  
    this.updateView();
  }
}
