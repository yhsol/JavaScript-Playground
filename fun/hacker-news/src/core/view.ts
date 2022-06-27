// abstract class 로 선언함으로써, 상속받는 클래스는 이 클래스의 규격에 맞춰 구현해야 함.
export default abstract class View {
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