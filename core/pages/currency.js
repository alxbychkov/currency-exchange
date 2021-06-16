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

        if (this.data.length > 0) {
            if (stars && stars.length > 0) {
                stars.forEach(s => {
                    const obj = this.data.find(el => {
                        if (el.CharCode === s) return el
                    })
                    
                    option += `
                    <div class="currency__item">
                        <p class="currency__star full" data-type="favorite" data-name="${s}"></p>
                        <p class="currency__name" data-type="name">${s}</p>
                        <p class="currency__price" data-type="buy">${obj.Nominal}</p>
                        <p class="currency__price" data-type="sell">${obj.Value}</p>
                    </div>
                `                    
                })
                option += '<br>';                
            }
            this.data.forEach(obj => {
                const type = obj.CharCode
                if (!stars || !stars.includes(type)) {
                    option += `
                    <div class="currency__item">
                        <p class="currency__star" data-type="favorite" data-name="${type}"></p>
                        <p class="currency__name" data-type="name">${type}</p>
                        <p class="currency__price" data-type="buy">${obj.Nominal}</p>
                        <p class="currency__price" data-type="sell">${obj.Value}</p>
                    </div>
                `
                }
            })
        }

        const div = document.createElement('div')
        div.innerHTML = `
            <h1 class="page__title">Курсы валют</h1>
            <div class="currency-wrapper">
            <div class="currency__item currency__head">
                <p class="currency__title">Номинал</p>
                <p class="currency__title">RUB</p>
            </div>
            </div>
            <div class="currency-wrapper currencies">
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