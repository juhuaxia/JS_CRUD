import React,{Component} from 'react';
import ListItem from './item'

export default class List extends Component {
    constructor(){
        super();
    }
    

    render(){
        return (
            <div className="list">
                {
                    this.props.pageData.map((item,i)=>{
                        let {title,id,selected} = item;
                        return (
                            <ListItem 
                                key={i}
                                id={id}
                                title={title}
                                selected={selected}
                            />
                        )
                    })
                }
            </div>
        )
    }
}