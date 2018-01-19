import callApi from '../service';
import * as types from '../constants/ActionTypes'

export function todo_getTotalData(){
    return dispatch=>{
        callApi({
            success(json){
                let options = {
                    pageIndex:0,
                    pageSize:0,
                    totalData:json
                }
                let firstPageData = getPageData(options)
                dispatch({
                    type:types.GET_TOTAL_DATA,
                    payload:{
                        totalPageData:json,
                        currentPageData:firstPageData
                    }
                })
            }
        })
    }
}

export function todo_getCurrentPageData(options){
    return dispatch=>dispatch({
        type:types.GET_CURRENT_PAGE_DATA,
        payload:getPageData(options)
    })
}

export function todo_changeModalState(modalState){
    return dispatch=>dispatch({
        type:types.CHANGE_MODAL_STATE,
        payload:modalState
    })
}
export function todo_sendSelectedId(id){
    return dispatch=>dispatch({
        type:types.SEND_SELECTED_ID,
        payload:id
    })
}

function getPageData(options){
    let {pageIndex,pageSize,totalData} = options;
    let startIndex = pageIndex * pageSize,
        endIndex = startIndex + 10,
        currentPageData = [];
    if(totalData && totalData instanceof Array){
        currentPageData = totalData.slice(startIndex,endIndex);
    }
    return currentPageData;
}