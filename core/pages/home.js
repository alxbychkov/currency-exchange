import { Page } from "../Page.js"

export class Home extends Page {
    constructor(params) {
        super(params)
        this.data = params
    }
    getRoot() {
        let option = ''
        let icon = ''
        if (Object.keys(this.data.rates).length > 0) {
            Object.keys(this.data.rates).forEach(type => {
                option += `<option value="${type}">${type}</option>`
            })
            icon = Object.keys(this.data.rates)[0]
            console.log(icon)
        }

        const div = document.createElement('div')
        div.innerHTML = `
            <h1 class="page__title">Обмен</h1>
            <div class="exchange-wrapper">
                <form class="exchange__form">
                    <div class="form__items">
                        <p class="items__title">Продать</p>
                        <select name="sell" id="sell" class="items__select">${option}</select>
                        <div class="exchange__sum">
                            <input type="number" class="form__input" placeholder="100">
                            <span class="exchange__icon" data-type="icon">${icon}</span>
                        </div>
                        <div class="exchange__rate">
                            <p class="rate__title">Курс обмена:</p>
                            <p class="rate__info">
                                <span data-type="sell-price">100</span>&nbsp;<span class="uppercase" data-type="sell-cur">${icon}</span>&nbsp;=&nbsp;
                                <span data-type="buy-price">100</span>&nbsp;<span class="uppercase" data-type="buy-cur">${icon}</span>
                            </p>
                        </div>
                    </div>
                    <div class="form__items">
                        <p class="items__title">Получить</p>
                        <select name="buy" id="buy" class="items__select">${option}</select>
                        <div class="exchange__sum">
                            <input type="number" class="form__input" placeholder="100">
                            <span class="exchange__icon" data-type="icon">${icon}</span>
                        </div>
                    </div>
                    <input type="submit" class="form__btn" value="Поменять">
                </form>
            </div>
        `
        return div
    }

    afterRender() {
        const selector = document.querySelectorAll('select')
        if (selector.length > 0) {
            selector.forEach(s => {
                s.addEventListener('change', this.selectChangeHandler)
            })
        }
    }

    selectChangeHandler(e) {
        const type = e.target.value
        const icon = e.target.parentNode.querySelector('[data-type="icon"]')
        const info = e.target.closest('form').querySelector('.rate__info')
        const sellCur = e.target.closest('form').querySelector('[data-type="sell-cur"]')
        const buyCur = e.target.closest('form').querySelector('[data-type="buy-cur"]')
        const buyPrice = e.target.closest('form').querySelector('[data-type="buy-price"]')
        const sellPrice = e.target.closest('form').querySelector('[data-type="sell-price"]')

        if (e.target.name === 'sell') sellCur.innerHTML = type
        if (e.target.name === 'buy') buyCur.innerHTML = type

        if (icon) icon.innerHTML = type
        if (info) {

        }
    }

    destroy() {
        const selector = document.querySelectorAll('select')
        if (selector.length > 0) {
            selector.forEach(s => {
                s.removeEventListener('change', this.selectChangeHandler)
            })
        }
    }
}