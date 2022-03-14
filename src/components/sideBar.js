import React from "react";
import '../styles/sideBar.css';
import {DescriptionOutlined,EmailOutlined,Add,Input,ExitToApp} from '@material-ui/icons';

const logos = {
    'blog': <DescriptionOutlined/>,
    'conntactez-nous': <EmailOutlined />,
    'connexion': <Input/>,
    'post':<Add />,
    'logout':<ExitToApp />
}

export default class SideBar extends React.Component{
    render(){
        const box = this.props.box;
        const icon = logos[box.text];
        return(
            <div className={this.props.selected === true ? 'active' : 'box'}>
                <a href={box.url}>
                    <div className="logo">
                        {icon}
                    </div>  
                    {box.text}
                </a>
            </div>
        )
    }
}