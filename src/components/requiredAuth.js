import React from "react";
import { Navigate } from "react-router-dom";

export default class RequiredAuth extends React.Component {
    render(){
        const isAuth = this.props.service.isAuthenticated();
        console.log('isAuth: '+typeof isAuth);
        return(
            <div>
                {isAuth === 'true' ? 
                    this.props.children : 
                        <Navigate to='/admin/connexion' replace={true} />}
            </div>
        )
    }
}