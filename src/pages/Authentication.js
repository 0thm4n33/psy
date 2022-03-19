import React from "react";
import '../styles/connexion.css';
import service from '../services/index';
import { Navigate } from "react-router-dom";

export default class AuthenticationPage extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            user: null
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }

    handleOnChange(event){
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]:value
        });
    }

    handleOnSubmit(event){
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.authenticate(user);
    }

    authenticate(user){
        service.login(user).then(async response =>{
            if(response.status === 201){
                const { user } = await response.json();
                this.setState({
                    user: user
                })
                if(this.props.service !== undefined){
                    console.log('user authenticated .... ');
                    this.props.service.setAuthenticated(true);
                } 
            }
            else if(response.status === 404){
                alert('email or password are incorrect');
            }
        }).catch(err=>{
            console.log(err);
        });
    }

    render(){
        let {user} = this.state;
        return(
            <div>
                {
                    user && (
                    <Navigate to="/admin/AllPosts" replace={true} />
                )}
                <div className="auth-body">
                    <form onSubmit={this.handleOnSubmit}>
                    <h3>Connexion</h3>
                        <div className="auth-email">
                            <label>
                                Email*
                            </label>
                            <input type="text" name="email" id="email" 
                                value={this.state.email}
                                onChange={this.handleOnChange}
                            />
                        </div>
                        <div className="auth-password">
                            <label>
                                Mot de passe*
                            </label>
                            <input type="password" name="password" id="password" 
                                value={this.state.password}
                                onChange={this.handleOnChange}
                            />
                        </div>
                        <div className="auth-connect">
                            <input type="submit" value="Se connecter" />
                        </div>
                    </form>
                </div>
            </div>     
        )
    }
}