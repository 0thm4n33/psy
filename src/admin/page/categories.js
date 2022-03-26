import React from "react";
import service from "../../services";
import '../../styles/categories-admin.css';
import {AddOutlined, Autorenew,Remove} from '@material-ui/icons'
import ModifyComponent from "../components/modify";

export default class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories : [],
            actions: [
                        {'text':'modifier','icon':<Autorenew fontSize="small"/>},
                        {'text':'supprimer','icon':<Remove fontSize="small"/>}
                    ]
        }
        this.handleOnClick = this.handleOnClick.bind(this);
        this.getCategorys = this.getCategorys.bind(this);
    }

    handleOnClick(event){
        event.preventDefault();
        console.log(event.target.id)
    }
   
    componentDidMount(){
        this.getCategorys();
    }

    getCategorys(){
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
                    <a href="/admin/categories/add-category" className="link">
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
                                <tr key={c._id} className="t-row">
                                    <td className="t-col">{c.name}</td>
                                    <td className="t-col">0</td>
                                    <td className="t-col">
                                        {this.state.actions.map((action,index)=>(
                                            <ModifyComponent
                                                key={index} 
                                                id={c._id} 
                                                text={action.text}
                                                icon={action.icon}   
                                                category={c.name} 
                                                ffive={this.getCategorys}
                                            />
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