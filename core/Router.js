import { data } from "./Data.js"

export class Router {
    constructor(selector, routes, store) {
        this.container = document.querySelector(selector)
        this.routes = routes
        this.data = data
        this.store = store
        this.page = new this.routes.home()
        this.hashChangeHandler = this.hashChangeHandler.bind(this)
        this.init(store)
    }

    init(store) {
        window.addEventListener('hashchange', this.hashChangeHandler)
        this.hashChangeHandler()
    }

    hashChangeHandler() {
        if (this.page) this.page.destroy()
        const link = window.location.hash.slice(1)
        const Page = this.routes[link] ? this.routes[link] : this.routes.home
        
        document.querySelectorAll(`[router-link]`).forEach(a => a.classList.contains('active') && a.classList.remove('active'))
        document.querySelector(`a[href="#${link}"]`).classList.add('active')
        
        this.page = new Page(data, this.store)
        
        this.container.innerHTML = ``
        this.container.insertAdjacentElement('afterbegin', this.page.getRoot())
        this.page.afterRender()
    }
}