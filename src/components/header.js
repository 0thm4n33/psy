import React from "react";
import '../styles/header.css'

export default class Header extends React.Component{
    render(){
        return(
            <div>
                <div className="header">
                    <h1 className="title">{this.props.title}</h1>
                    <h4 className="subtitle">
                       {this.props.subtitle}
                    </h4>
                </div>
                <div className="sub-header">
                   {this.props.children}
                </div>
            </div>
        )
    }
}