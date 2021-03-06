import { Home } from "./core/pages/home.js"
import { Currency } from "./core/pages/currency.js"
import { Chart } from "./core/pages/chart.js"
import { Router } from "/core/Router.js"
import { createStore } from "./core/Store.js"
import { rootReducer } from "./core/redux/rootReducer.js"

const store = createStore(rootReducer, storage('exchange'))

store.subscribe(state => {
    storage('exchange', state)
})

const router = new Router('#app', {home: Home, currency: Currency, chart: Chart}, store)

function storage(key, data) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}
