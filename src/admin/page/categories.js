import React from "react";
import service from "../../services";
import '../../styles/categories-admin.css';
import {AddOutlined} from '@material-ui/icons'
import {Autorenew,Remove} from '@material-ui/icons'

export default class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories : [],
            actions: [
                        {'text':'modifier','url':'category/modifier','icon':<Autorenew fontSize="small"/>},
                        {'text':'supprimer','url':'category/delete','icon':<Remove fontSize="small"/>}
                    ]
        }
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(event){
        event.preventDefault();
        console.log(event.target.id)
    }
   
    componentDidMount(){
        service.getCategories().then((data)=>{
            this.setState({
                categories: data.categorys
            })
        })
    }

    render(){
        return(
            <div className="table-wrapper">
                <div className="category-header">
                    <h3>Liste des categories</h3>
                    <a href="add" className="category-add">
                        Ajouter une categorie
                        <AddOutlined />
                    </a>
                </div>
                <table className="categories">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Nombre d'articles</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {this.state.categories !== undefined && 
                        <tbody className="body">
                            {this.state.categories.map((c)=>(
                                <tr key={c._id}>
                                    <td className="category-name">{c.name}</td>
                                    <td>0</td>
                                    <td>
                                        {this.state.actions.map((action)=>(
                                            <a href={action.url} key={action.text} 
                                                id={c._id}
                                                className="category-link"
                                                onClick={this.handleOnClick}
                                            >
                                                {action.text} {action.icon}
                                            </a>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
            </div>
           
        )
    }
}