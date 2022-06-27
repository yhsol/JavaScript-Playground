export default abstract class View {
  private template: string;
  private renderTemplate: string;
  private container: HTMLElement;
    private htmlList: string[];
  
    constructor(containerId: string, template: string) {
      const containerElement = document.getElementById(containerId);
  
      if (!containerElement) {
        throw '최상위 컨테이너가 없어 UI를 진행하지 못합니다.';
      }
    
      this.container = containerElement;
      this.template = template;
      this.renderTemplate = template;
      this.htmlList = [];
    }
  
    protected updateView() {
      this.container.innerHTML = this.renderTemplate;
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
  
    abstract render(...params: string[]): void;
  }
  