import * as types from '../constants'

export const actions = {
    todo_getCurrentPageData ({commit}, data) {
        commit({
            type: types.GET_CURRENT_PAGE_DATA,
            currentPageData: data
        })
    },
    todo_sendSelectedId ({commit}, id) {
        commit({
            type: types.SEND_SELECTED_ID,
            selectedId: id
        })
    },
    todo_changeModalState ({commit}, show) {
        commit({
            type: types.CHANGE_MODAL_STATE,
            showModal: show
        })
    },
    todo_changePageData ({commit}, params) {
        let {pageData, action} = params
        commit({
            type: types.CHANGE_PAGE_DATA,
            pageData,
            action
        })
    }
}
