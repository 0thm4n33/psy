import React from "react";
import '../styles/sideBar.css';
import {DescriptionOutlined,EmailOutlined,NoteAddOutlined,Input,ExitToApp,PersonAddOutlined,CategoryOutlined} from '@material-ui/icons';
import service from "../services";
const logos = {
    'blog': <DescriptionOutlined/>,
    'conntactez-nous': <EmailOutlined />,
    'connexion': <Input/>,
    'posts':<NoteAddOutlined />,
    'logout': <ExitToApp />,
    'utilisateurs':<PersonAddOutlined />,
    'categories':<CategoryOutlined />
}

export default class SideBar extends React.Component{
   
    onClickHandler(event){
        if(event.target.innerText === 'logout'){
            service.disconnect();
        }
    }

    render(){
        const box = this.props.box;
        const icon = logos[box.text];
        return(
            <div className={this.props.selected === true ? 'active' : 'box'} >
                <a href={box.url} onClick={this.onClickHandler}>
                    <div className="logo">
                        {icon}
                    </div>  
                    {box.text}
                </a>
            </div>
        )
    }
}