import { Page } from "../Page.js"

export class Currency extends Page {
    constructor(params,store) {
        super(params,store)
        this.data = params
        this.store = store
        this.changeFavoriteHandler = this.changeFavoriteHandler.bind(this)
    }
    getRoot() {
        let option = ''
        let stars = this.store.getState().favorites
        if (Object.keys(this.data.rates).length > 0) {
            // this.data.rates.sort((a, b) => a )
            Object.keys(this.data.rates).forEach(type => {
                let full = ''
                if (stars.includes(type)) full =  ' full'
                option += `
                    <div class="currency__item">
                        <p class="currency__star${full}" data-type="favorite" data-name="${type}"></p>
                        <p class="currency__name" data-type="name">${type}</p>
                        <p class="currency__price" data-type="buy">${this.data.rates[type].toFixed(4)}</p>
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
        // this.subscribe(state => console.log(state))
    }

    changeFavoriteHandler(e) {
        const value = e.target.dataset.name
        if (e.target.classList.contains('full')) {
            e.target.classList.remove('full')
            this.dispatch({type:'REMOVE_FAV', value})
        } else {
            e.target.classList.add('full')
            this.dispatch({type:'ADD_FAV', value})
        }
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