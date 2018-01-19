import React ,{Component}from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux'
import * as actions from '../action'

class ListItem extends Component {
    constructor(){
        super();
    }
    shouldComponentUpdate(newProps){
        if(newProps.selected !== this.props.selected || newProps.title !== this.props.title || newProps.id !== this.props.id){
            return true;
        }
        return false;
    }
    doSelect(){
        this.props.todo_sendSelectedId(this.props.id)
    }
    render(){
        var itemClass = classNames({
            'list-item': true,
            'p10':true,
            'sel-item': !!this.props.selected
        });
        return (
            <div onClick={()=>{this.doSelect()}} className={itemClass}>
                <span>{this.props.id}. {this.props.title}</span>
                <img src="http://via.placeholder.com/80x50"/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let {modalState,totalPageData} = state;
    return {
        modalState
    }
}
  
const mapDispatchToProps = actions

const conn = connect(mapStateToProps,mapDispatchToProps)(ListItem)
  
export default conn;
