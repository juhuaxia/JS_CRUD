import React ,{Component}from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux'
import * as actions from '../action'

class Modal extends Component {
    constructor(){
        super();
        this.state = {
            textVal:''
        }
    }
    onChangeHandle(e){
        if(e.target.value != this.state.textVal){
            this.setState({
                textVal:e.target.value
            });
        }
    }
    clickHandle(){
        if(this.state.textVal != ''){
            this.props.okCallback(this.state.textVal);
            this.setState({
                textVal:''
            })
            this.props.todo_changeModalState(false);
        }else{
            alert('输入框内容不能为空')
        }
    }
    render(){
        var modalClass = classNames({
            modal: true,
            show: this.props.modalState
        });
        return (
            <div className={modalClass}>
                <div className="modal-inner">
                    <input type='text' 
                        value={this.state.textVal}
                        onChange={(e)=>{this.onChangeHandle(e)}}
                        />
                    <button onClick={()=>this.clickHandle()}>ok</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let {modalState} = state;
    return {
        modalState
    }
}
  
const mapDispatchToProps = actions

const conn = connect(mapStateToProps,mapDispatchToProps)(Modal)
  
export default conn;