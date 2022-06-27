import type { RouterInfo } from "../types";
import View from "./view";

export default class Router {
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
            return;
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