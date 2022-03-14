import React from "react";
import service from '../services/index'
import '../styles/navbar.css';

export default class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories : []
        }
    }
    async componentDidMount(){
        const categoryResult = await service.getCategories();
        this.setState({
            categories: categoryResult.categorys
        });
    }
    render(){
        return(
            <div className="menu">
               {this.state.categories.map(category =>(
                   <a key={category.name} href={'/blog/'+category.name}>{category.name}</a>
               ))}
            </div>
        )
    }
}