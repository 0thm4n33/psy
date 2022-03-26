import React from "react";
import { Button, Stack} from "@mui/material";

export default class CategoryForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.categoryName === undefined ? '' : this.props.categoryName,
            nombreOfArticle: 0,
            classStyle: this.props.classStyle === undefined ? 'table-form' : this.props.classStyle
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    handleOnChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    onSubmitForm(){
        const category = {
            name: this.state.name
        }
        this.props.onSubmit(category);
    }

    render(){
        return(
            <form className={this.state.classStyle}>
                <table className={this.state.classStyle}>
                    <tbody>
                        <tr>
                            <td>Nom</td>
                            <td>
                                <input type="text" name="name" id="name" value={this.state.name}  onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre d'article</td>
                            <td>
                                <input type="number" name="nombreOfArticle" id="nombreOfArticle" value={this.state.nombreOfArticle} onChange={this.handleOnChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Stack alignItems={"flex-end"} direction="row-reverse">
                        <Button color="primary" onClick={this.onSubmitForm}>Enregistrer</Button>
                        <Button onClick={this.props.handleClose} color="error">Annuler</Button>
                </Stack>
        </form>
        )
    }
}