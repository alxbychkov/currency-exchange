import { Page } from "../Page.js"

export class Currency extends Page {
    constructor(params) {
        super(params)
        this.data = params
    }
    getRoot() {
        let option = ''
        if (Object.keys(this.data.rates).length > 0) {
            Object.keys(this.data.rates).forEach(type => {
                option += `
                    <div class="currency__item">
                        <p class="currency__star" data-type="favorite"></p>
                        <p class="currency__name" data-type="name">${type}</p>
                        <p class="currency__price" data-type="buy">${this.data.rates[type]}</p>
                        <p class="currency__price" data-type="sell">1.2074</p>
                    </div>
                `
            })
        }
        const div = document.createElement('div')
        div.innerHTML = `
            <h1 class="page__title">Курсы валют</h1>
            <div class="currency-wrapper">
            <div class="currency__item currency__head">
                <p class="currency__title">Покупка</p>
                <p class="currency__title">Продажа</p>
            </div>
            ${option}
        </div>
        `
        return div
    }

    afterRender() {
        const stars = document.querySelectorAll('[data-type="favorite"]')
        if (stars.length > 0) {
            stars.forEach(star => {
                star.addEventListener('click', this.changeFavoriteHandler)
            })
        }
    }

    changeFavoriteHandler(e) {
        e.target.classList.contains('full') ? e.target.classList.remove('full') : e.target.classList.add('full') 
    }

    destroy() {
        const stars = document.querySelectorAll('[data-type="favourite"]')
        if (stars.length > 0) {
            stars.forEach(star => {
                star.removeEventListener('click', this.changeFavoriteHandler)
            })
        }
    }
}