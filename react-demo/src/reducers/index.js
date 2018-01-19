import * as types from '../constants/ActionTypes';
import createReducer from './createReducer';

const default_state = {}

let reducers = {
    [types.GET_TOTAL_DATA]:(state=default_state,action)=>{
        state['totalPageData'] = action['payload'].totalPageData;
        state['currentPageData'] = action['payload'].currentPageData
        return Object.assign({},state);
    },
    [types.GET_CURRENT_PAGE_DATA]:(state=default_state,action)=>{
        state['currentPageData'] = action.payload;
        return Object.assign({},state);
    },
    [types.CHANGE_MODAL_STATE]:(state=default_state,action)=>{
        state['modalState'] = action.payload;
        return Object.assign({},state);
    },
    [types.SEND_SELECTED_ID]:(state=default_state,action)=>{
        state['selectedId'] = action.payload;
        state['currentPageData'] = null;
        return Object.assign({},state);
    }
}

export default createReducer(default_state,reducers);