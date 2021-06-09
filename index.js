import { Home } from "./core/pages/home.js"
import { Currency } from "./core/pages/currency.js"
import { Router } from "/core/Router.js"

const router = new Router('#app', {home: Home, currency: Currency})
