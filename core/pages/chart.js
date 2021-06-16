import { Page } from "../Page.js"
import { getData } from "../Data.js"

export class Chart extends Page {
    constructor(params,store) {
        super(params,store)
        this.data = params
        this.store = store
        this.cangeChartDataHandler = this.cangeChartDataHandler.bind(this)
        this.i = 0
        this.categories = []
        this.dates = []
    }
    getRoot() {
        let start = '2021-01-01'
        let end = '2021-06-01'
        if (this.store.getState().interval && this.store.getState().interval.length > 0) {
            start = this.store.getState().interval[0]
            end = this.store.getState().interval[1]
        }
        const div = document.createElement('div')
        div.innerHTML = `
            <h1 class="page__title">График</h1>
            <form class="chart__form">
                <label>
                    <input type="date" class="form__input" name="start" value="${start}">
                </label>
                <label>
                    <input type="date" class="form__input" name="end" value="${end}">
                </label>
                <input type="submit" class="form__btn" value="Применить">
            </form>
            <div id="chart"></div>
        `
        return div
    }

    cangeChartDataHandler(e) {
        e.preventDefault()
        const form = e.target.closest('.chart__form')
        if (form) {
            const start = form.querySelector('input[name="start"]')?.value
            const end = form.querySelector('input[name="end"]')?.value

            if (start) {
                getData('chart', {start,end}).then(res => {
                    this.data = res
                    this.drawChart()
                })
                this.dispatch({type:'ADD_INTERVAL', value: [start, end]})
            }          
        }
    }

    drawChart() {
        do {
            this.i++
            this.categories.push(this.data[this.i]['@attributes'].Date)
            this.dates.push(parseFloat(this.data[this.i].Value.replace(',','.')))
        } while ((this.i % 1e4 !== 0) && (this.i !== this.data.length - 1))

        if (this.i === (this.data.length - 1)) {
            Highcharts.chart('chart', {
                xAxis: {
                    categories: this.categories
                },
            
                title: {
                    text: 'Динамика курса доллара к рублю'
                },
            
                series: [{
                    data: this.dates
                }],
            
                annotations: [{
                    labels: [{
                        point: 'max',
                        text: 'Max'
                    }, {
                        point: 'min',
                        text: 'Min',
                        backgroundColor: 'white'
                    }]
                }]
            });

            this.i = 0
            this.categories = []
            this.dates = []
        } else {
            setTimeout(this.drawChart())
        }
    }

    afterRender() {
        if (this.store.getState().interval && this.store.getState().interval.length > 0) {
            let start = this.store.getState().interval[0]
            let end = this.store.getState().interval[1]
            getData('chart', {start,end}).then(res => {
                this.data = res
                this.drawChart()
            })
        }
        else this.drawChart()
        const submitBtn = document.querySelector('.chart__form input[type="submit"]')
        if (submitBtn) {
            submitBtn.addEventListener('click', this.cangeChartDataHandler)
        }
    }

    destroy() {
        const submitBtn = document.querySelector('.chart__form input[type="submit"]')
        if (submitBtn) {
            submitBtn.removeEventListener('click', this.cangeChartDataHandler)
        }
    }
}