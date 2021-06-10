import { Page } from "../Page.js"

export class Home extends Page {
    constructor(params) {
        super(params)
        this.data = params
        this.type = 'CHF'
        this.qout = ''
        this.buy = 100
        this.sell = ''
        this.inputChangeHandler = this.inputChangeHandler.bind(this)
        this.selectChangeHandler = this.selectChangeHandler.bind(this)
    }
    
    getRoot() {
        let option_buy = ''
        let option_sell = ''
        let icon = ''
        let icon_sell = this.type
        if (Object.keys(this.data.rates).length > 0) {
            Object.keys(this.data.rates).forEach(type => {
                option_buy += `<option value="${type}" data-buy="${this.data.rates[type]}">${type}</option>`
                if (this.type !== type)
                    option_sell += `<option value="${type}" data-sell="${this.data.rates[type]}">${type}</option>`
                else {
                    this.qout = +this.data.rates[type]
                    this.sell = this.qout*this.buy
                    option_sell += `<option value="${type}" data-sell="${this.qout}" selected>${type}</option>`
                }
            })
            icon = Object.keys(this.data.rates)[0]
        }

        const div = document.createElement('div')
        div.innerHTML = `
            <h1 class="page__title">Обмен</h1>
            <div class="exchange-wrapper">
                <form class="exchange__form">
                    <div class="form__items">
                        <p class="items__title">Продать</p>
                        <select name="sell" id="sell" class="items__select">${option_buy}</select>
                        <div class="exchange__sum">
                            <input type="number" class="form__input" placeholder="100" name="buy_price">
                            <span class="exchange__icon" data-type="icon">${icon}</span>
                        </div>
                        <div class="exchange__rate">
                            <p class="rate__title">Курс обмена:</p>
                            <p class="rate__info">
                                <span data-type="sell-price">100</span>&nbsp;<span class="uppercase" data-type="sell-cur">${icon}</span>&nbsp;=&nbsp;
                                <span data-type="buy-price">${this.qout}</span>&nbsp;<span class="uppercase" data-type="buy-cur">${icon_sell}</span>
                            </p>
                        </div>
                    </div>
                    <div class="form__items">
                        <p class="items__title">Получить</p>
                        <select name="buy" id="buy" class="items__select">${option_sell}</select>
                        <div class="exchange__sum">
                            <input type="number" class="form__input" placeholder="10" name="sell_price" value="${this.sell}">
                            <span class="exchange__icon" data-type="icon">${icon_sell}</span>
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

        const inputs = document.querySelectorAll('input[type="number"]')
        if (inputs.length > 0) {
            inputs.forEach(i => {
                i.addEventListener('input', this.inputChangeHandler)
            })
        }
    }

    selectChangeHandler(e) {
        
        this.qout = +e.target.selectedOptions[0].dataset.sell
        const type = e.target.value
        const icon = e.target.parentNode.querySelector('[data-type="icon"]')
        const info = e.target.closest('form').querySelector('.rate__info')
        const sellCur = e.target.closest('form').querySelector('[data-type="sell-cur"]')
        const buyCur = e.target.closest('form').querySelector('[data-type="buy-cur"]')
        const buyPrice = e.target.closest('form').querySelector('[data-type="buy-price"]')
        const sellPrice = e.target.closest('form').querySelector('[data-type="sell-price"]')

        if (e.target.name === 'sell') {
            sellCur.innerHTML = type
            
        }
        if (e.target.name === 'buy') {
            buyCur.innerHTML = type
            buyPrice.innerHTML = this.qout
        }

        if (icon) icon.innerHTML = type
        if (info) {

        }
    }

    inputChangeHandler(e) {
        const name = e.target.name
        const sell_input = document.querySelector('input[name="sell_price"]')
        let sell_price
        switch (name) {
            case 'buy_price':
                sell_price = e.target.value * this.qout
                sell_input.value = sell_price.toFixed(4)
                break
            case 'sell_price':
                
                break
        }
    }

    destroy() {
        const selector = document.querySelectorAll('select')
        if (selector.length > 0) {
            selector.forEach(s => {
                s.removeEventListener('input', this.selectChangeHandler)
            })
        }
    }
}