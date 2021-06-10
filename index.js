import { Home } from "./core/pages/home.js"
import { Currency } from "./core/pages/currency.js"
import { Router } from "/core/Router.js"

const router = new Router('#app', {home: Home, currency: Currency})

const main = document.querySelector('main.main')
// if (main) {
//     main.addEventListener('click', e => {
//         const self = e.target
//         if (self.dataset.type === 'favorite') {
//             self.classList.contains('full') ? self.classList.remove('full') : self.classList.add('full') 
//         }
//     })
// }
