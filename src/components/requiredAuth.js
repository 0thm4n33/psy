import React from "react";
import { Navigate } from "react-router-dom";
import service from '../services/index';

export default class RequiredAuth extends React.Component {
    render(){
        const isAuth = service.isAuthenticated();
        return(
            <div>
                {isAuth === true ? 
                    this.props.children : 
                        <Navigate to='/admin/connexion' replace={true} />}
            </div>
        )
    }
}