export class Router {
    constructor(selector, routes) {
        this.container = document.querySelector(selector)
        this.routes = routes
        this.page = new this.routes.home()
        this.hashChangeHandler = this.hashChangeHandler.bind(this)
        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.hashChangeHandler)
        this.hashChangeHandler()
    }

    hashChangeHandler() {
        const link = window.location.hash.slice(1)
        const Page = this.routes[link] ? this.routes[link] : this.routes.home

        this.page = new Page()
        if (this.page) this.page.destroy()
        
        this.container.innerHTML = ``
        this.container.insertAdjacentElement('afterbegin', this.page.getRoot())
        this.page.afterRender()
    }
}