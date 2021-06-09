import { Page } from "../Page.js"

export class Currency extends Page {
    getRoot() {
        const div = document.createElement('div')
        div.innerHTML = `<h1>Currency</h1>`
        return div
    }
}