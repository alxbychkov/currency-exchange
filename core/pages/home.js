import { Page } from "../Page.js"

export class Home extends Page {
    constructor(params) {
        super(params)
        this.data = params
        this.type = 'EUR'
        this.qout = ''
        this.buy = 1
        this.sell = ''
        this.inputChangeHandler = this.inputChangeHandler.bind(this)
        this.selectChangeHandler = this.selectChangeHandler.bind(this)
    }
    
    getRoot() {
        let option_buy = ''
        let option_sell = ''
        let icon = ''
        let icon_sell = this.type

        if (this.data.length > 0) {

            option_buy += `<option value="RUB" data-buy="1">RUB</option>`

            this.data.forEach(obj => {
                const type = obj.CharCode
                const value = obj.Value
                const nominal = obj.Nominal

                if (this.type !== type)
                    option_sell += `<option value="${type}" data-nominal="${nominal}" data-sell="${value}">${type}</option>`
                else {
                    this.qout = parseInt(value)
                    this.nominal = nominal
                    this.sell = (this.buy/this.qout*this.nominal).toFixed(4)
                    option_sell += `<option value="${type}" data-nominal="${nominal}" data-sell="${this.qout}" selected>${type}</option>`
                }
            })

            icon = 'RUB'
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
                                <span data-type="sell-price">${this.nominal}</span>&nbsp;<span class="uppercase" data-type="buy-cur">${icon_sell}</span>&nbsp;=&nbsp;
                                <span data-type="buy-price">${this.qout}</span>&nbsp;<span class="uppercase" data-type="sell-cur">${icon}</span>
                            </p>
                        </div>
                    </div>
                    <div class="form__items">
                        <p class="items__title">Получить</p>
                        <select name="buy" id="buy" class="items__select">${option_sell}</select>
                        <div class="exchange__sum">
                            <input type="number" class="form__input" placeholder="10" name="sell_price" value="${this.sell}" disabled>
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
        this.input_buy_price = document.querySelector('input[name="buy_price"]')
        this.input_sell_price = document.querySelector('input[name="sell_price"]')
        this.info_sell_price = document.querySelector('[data-type="sell-price"]')
        this.info_buy_price = document.querySelector('[data-type="buy-price"]')
        this.info_sell_cur = document.querySelector('[data-type="sell-cur"]')
        this.info_buy_cur = document.querySelector('[data-type="buy-cur"]')
        this.input_buy_price.value = 1

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

        const submitBtn = document.querySelector('.exchange__form input[type="submit"]')
        if (submitBtn) submitBtn.addEventListener('click', e => e.preventDefault())
    }

    selectChangeHandler(e) {
        const type = e.target.value
        
        const icon = e.target.parentNode.querySelector('[data-type="icon"]')
        const info = e.target.closest('form').querySelector('.rate__info')

        if (e.target.name === 'sell') {
            this.info_sell_cur.innerHTML = type
        }
        if (e.target.name === 'buy') {
            this.qout = parseInt(e.target.selectedOptions[0].dataset.sell)
            this.nominal = e.target.selectedOptions[0].dataset.nominal
            this.input_sell_price.value = (this.input_buy_price.value/this.qout*this.nominal).toFixed(4)
            this.info_buy_cur.innerHTML = type
            this.info_buy_price.innerHTML = this.qout
            this.info_sell_price.innerHTML = this.nominal
        }

        if (icon) icon.innerHTML = type
    }

    inputChangeHandler(e) {
        const name = e.target.name
        let sell_price

        switch (name) {
            case 'buy_price':
                sell_price = (e.target.value/this.qout*this.nominal)
                this.input_sell_price.value = sell_price.toFixed(4)
                break
            case 'sell_price':
                break
        }
    }

    destroy() {
        const selector = document.querySelectorAll('select')
        if (selector.length > 0) {
            selector.forEach(s => {
                s.removeEventListener('change', this.selectChangeHandler)
            })
        }

        const inputs = document.querySelectorAll('input[type="number"]')
        if (inputs.length > 0) {
            inputs.forEach(i => {
                i.removeEventListener('input', this.inputChangeHandler)
            })
        }

        const submitBtn = document.querySelector('.exchange__form input[type="submit"]')
        if (submitBtn) submitBtn.removeEventListener('click', e => e.preventDefault())
    }
}