import React,{Component} from 'react';
import callApi,{addItem,updateItemTitle,deleteItem,searchItem} from '../service';
import List from './list';
import Modal from './modal'
import {connect} from 'react-redux'
import * as actions from '../action'

class FiledBox extends Component {
    constructor(){
        super();
        this.pageIndex = 0;
        this.pageSize = 10;
        this.totalPageData = [];
        this.action = null;
        this.selectedId = null;
        this.state = {
            pageData:[]
        };
        this.modalCallback = this.modalCallback.bind(this);
    }
    componentDidMount(){
        this.props.todo_getTotalData();
    }
    componentWillReceiveProps(newProps){
        let {currentPageData,totalPageData,selectedId} = newProps;
        this.totalPageData = totalPageData||[];
        if(selectedId !== undefined){
            this.selectedId = selectedId;
            this.changeSelectedItem()
        }
        if(currentPageData instanceof Array){
            let resultData = [];
            if(this.action !== null){
                resultData = resultData.concat(currentPageData);
                this.action = null;
                this.pageIndex = 0;
            }else{
                resultData = this.state.pageData.concat(currentPageData)
            }
            this.setState({
                pageData:resultData
            })
        }
        
    }
    loadPageData(){
        let pageIndex = this.action !== null?0:++this.pageIndex
        let options = {
            pageIndex:pageIndex,
            pageSize:this.pageSize,
            totalData:this.props.totalPageData
        }
        this.props.todo_getCurrentPageData(options);
    }
    changeSelectedItem(){
        if(this.selectedId !== null){
            for(var i=0,l=this.state.pageData.length;i<l;i++){
                let item = this.state.pageData[i];
                if(item.id == this.selectedId){
                    item.selected = true;
                }else{
                    item.selected = false;
                }
            }
            this.setState({
                pageData:this.state.pageData
            })
        }
    }
    /**
     * 
     * addItem : userId id title
     */
    addData(){
        this.props.todo_changeModalState(true);
        this.action = 'add'
    }
    delete(){
        let params = {
            selectedId:this.selectedId,
            pageData:this.state.pageData
        }
        let resulteData = deleteItem(params);
        this.action = 'delete';
        this.setState({
            pageData:resulteData
        })
    }
    updateData(){
        this.props.todo_changeModalState(true);
        this.action = 'update'
    }
    searchData(){
        this.props.todo_changeModalState(true);
        this.action = 'search'
    }
    modalCallback(val){
        let action = this.action,
            resulteData = [],
            params = {};
        if(action == 'add'){
            params = {
                val,
                pageData:this.state.pageData,
                data:this.totalPageData
            }
            resulteData = addItem(params)
        }else if(action == 'update'){
            params = {
                selectedId:this.selectedId,
                val,
                pageData:this.state.pageData
            }
            resulteData = updateItemTitle(params)
        }else if(action == 'search'){
            params = {
                val,
                data:this.totalPageData
            }
            resulteData = searchItem(params)
        }

        this.setState({
            pageData:resulteData
        })
    }
    render(){
        return (
            <div>
                <button onClick={()=>this.loadPageData()}>load more data</button>
                <button onClick={()=>{this.addData()}}>add</button>
                <button onClick={()=>{this.delete()}}>delete</button>
                <button onClick={()=>{this.updateData()}}>update</button>
                <button onClick={()=>{this.searchData()}}>search</button>
                <List pageData={this.state.pageData}/>
                <Modal okCallback={this.modalCallback}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let {totalPageData,currentPageData,selectedId} = state;
    return {
        totalPageData,
        currentPageData,
        selectedId
    }
}
  
const mapDispatchToProps = actions

const conn = connect(mapStateToProps,mapDispatchToProps)(FiledBox)
  
export default conn;