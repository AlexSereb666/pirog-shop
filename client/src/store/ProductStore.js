import { makeAutoObservable } from 'mobx'

export default class ProductStore {
    constructor() {
        this._types = []
        this._views = []
        this._products = []
        this._selectedType = {}
        this._selectedView = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        makeAutoObservable(this)
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }

    setLimit(limit) {
        this._limit = limit
    }

    setTypes(types) {
        this._types = types
    }

    setViews(views) {
        this._views = views
    }

    setProducts(products) {
        this._products = products
    }

    get types() {
        return this._types
    }

    get views() {
        return this._views
    }

    get products() {
        return this._products
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedView() {
        return this._selectedView
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }

    setSelectedView(view) {
        this.setPage(1)
        this._selectedView = view
    }

    get page() {
        return this._page
    }

    get totalCount() {
        return this._totalCount
    }

    get limit() {
        return this._limit
    }
}