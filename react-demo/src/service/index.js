import es6Promis from 'es6-promise';
import 'isomorphic-fetch';

es6Promis.polyfill();

const apis = {
    getData:'https://jsonplaceholder.typicode.com/albums'
}

export default function callApi(config={}){
    let {url,method,data,success,error} = config;
    fetch(apis.getData)
        .then(res=>res.json())
        .then(json=>{
            return success(json);
        })
        .catch(error=>console.log(error))
}

export function addItem(params){
    let {val,pageData,data} = params;
    let addItem = {
        userid:1,
        id:-1,
        title:val
    }
    pageData.unshift(addItem);
    data.unshift(addItem);
    return pageData;
}

export function updateItemTitle(params){
    let {selectedId,val,pageData} = params;
    if(selectedId !== null){
        for(let i=0,l=pageData.length;i<l;i++){
            let item = pageData[i];
            if(item.id == selectedId){
                item.title = val
                break;
            }
        }
    }
    return pageData;
}
export function deleteItem(params){
    let {selectedId,pageData} = params;
    if(selectedId !== null){
        for(let i=0,l=pageData.length;i<l;i++){
            let item = pageData[i];
            if(item.id == selectedId){
                item.selected = false;
                pageData.splice(i,1);
                break;
            }
        }
    }
    return pageData;
}
export function searchItem(params){
    let {val,data} = params;
    let result = [];
    for(let i=0,l=data.length;i<l;i++){
        let item = data[i];
        if(item['title'].indexOf(val)>=0){
            result.push(item);
        }
    }
    return result;
}