import { Page } from "../Page.js"

export class Home extends Page {
    getRoot() {
        const div = document.createElement('div')
        div.innerHTML = `<h1>Home</h1>`
        return div
    }
}