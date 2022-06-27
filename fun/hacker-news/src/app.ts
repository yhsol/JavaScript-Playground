import Router from "./core/router";
import NewsDetailView from "./page/news-detail-view";
import NewsFeedView from "./page/news-feed-view";
import Store from "./store";

const store = new Store();
const router = new Router();
const newsFeedView = new NewsFeedView('root', store);
const newsDetailView = new NewsDetailView('root', store);

router.setDefaultView(newsFeedView);
router.addRouterPath('/page/', newsFeedView);
router.addRouterPath('/show/', newsDetailView);

router.route();