export class Page {
    constructor(params, store) {
        this.params = params
        this.store = store
        this.storeSub = null
    }

    getRoot() {
        throw new Error('Method "getRoot" should be implemented')
    }
    dispatch(action) {
        this.store.dispatch(action)
    }
    subscribe(fn) {
        this.storeSub = this.store.subscribe(fn)
    }
    afterRender() {}
    destroy() {
        this.storeSub.unsubscribe()
    }
}