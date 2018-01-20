import {callApi, addItem, updateItemTitle, deleteItem, searchItem} from '../service'


export async function getTotalPageData () {
    var json = await callApi()
    window.totalPageData = json || []
}

export function getCurrentPageData (options = {}) {
    let {pageIndex, pageSize} = options
    this.$store.dispatch('todo_getCurrentPageData', getPageData(pageIndex, pageSize))
}

export function changeModalState (show) {
    this.$store.dispatch('todo_changeModalState', show)
}

export function changePageData (res) {
    let pageData = []
    const actionDispath = {
        add () {
            pageData = addItem(res.params)
        },
        delete () {
            pageData = deleteItem(res.params)
        },
        update () {
            pageData = updateItemTitle(res.params)
        },
        search () {
            pageData = searchItem(res.params)
        }
    }
    actionDispath[res.action]()
    let params = {
        pageData,
        action: res.action
    }
    this.$store.dispatch('todo_changePageData', params)
}

function getPageData (pageIndex = 0, pageSize = 10) {
    let totalPageData = window.totalPageData || [],
        startIndex = pageIndex * pageSize,
        endIndex = startIndex + 10,
        currentPageData = []
    if (totalPageData && totalPageData instanceof Array) {
        currentPageData = totalPageData.slice(startIndex, endIndex)
    }
    return currentPageData
}

export function sendSelectedId (id) {
    this.$store.dispatch('todo_sendSelectedId', id)
}
