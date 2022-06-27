import type { RouteInfo } from "../types";
import View from "./view";

export default class Router {
  private isStart: boolean;
  routeTable: RouteInfo[];
  defaultRoute: RouteInfo | null;

  constructor() {
    // 아래 코드는 브라우저에서 실행하게됨. 즉 이때의 this 컨텍스트는 는 Router 의 인스턴스가 아님.
    // Router 의 인스턴스가 아니기 때문에 defaultRoute 나 setDefaultRoute 메서드를 사용할 수 없음.
    // 그렇기 때문에 this 를 고정하기 위해 bind 를 사용하여 묶어줌.
    window.addEventListener('hashchange', this.route.bind(this));
    
    this.isStart = false;
    this.routeTable = [];
    this.defaultRoute = null;
  }

  setDefaultPage(page: View, params: RegExp | null = null): void {
    this.defaultRoute = {
      path: '', 
      page, 
      params,
    };
  }

  addRoutePath(path: string, page: View, params: RegExp | null = null): void {
    this.routeTable.push({ path, page, params });

    if (!this.isStart) {
      this.isStart = true;
      // Execute next tick
      setTimeout(this.route.bind(this), 0);
    }
  }

  private route() {
    const routePath: string = location.hash;
    
    if (routePath === '' && this.defaultRoute) {
      this.defaultRoute.page.render();
      return;
    }

    for(const routeInfo of this.routeTable) {
      if (routePath.indexOf(routeInfo.path) >= 0) {        
        if (routeInfo.params) {
          const parseParams = routePath.match(routeInfo.params);

          if (parseParams) {
            routeInfo.page.render.apply(null, [parseParams[1]]);
          }          
        } else {
          routeInfo.page.render();
        }       
        return;
      }  
    }
  }
}
