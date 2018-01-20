import * as types from '../constants'

export const mutations = {
    [types.GET_CURRENT_PAGE_DATA] (state, payload) {
        if (state['loadMoreDataIsReload'] === true) {
            state['currentPageData'] = []
        }
        state['currentPageData'] = state['currentPageData'].concat(payload.currentPageData)
        state['loadMoreDataIsReload'] = false
    },
    [types.SEND_SELECTED_ID] (state, payload) {
        state['selectedId'] = payload.selectedId
    },
    [types.CHANGE_MODAL_STATE] (state, payload) {
        state['showModal'] = payload.showModal
    },
    [types.CHANGE_PAGE_DATA] (state, payload) {
        state['currentPageData'] = payload.pageData
        if (payload.action === 'search') {
            state['loadMoreDataIsReload'] = true
        }
    }
}
