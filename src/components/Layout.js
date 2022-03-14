import React from "react";
import { List, Toolbar, Drawer} from '@material-ui/core';
import SideBar from "./sideBar";
import { styled } from "@mui/material/styles";
import '../styles/layout.css';
import { useLocation } from "react-router-dom";
import logo from '../assets/images/274697502_370553091282912_6384957551422282258_n.jpg';
import service from '../services/index';

export default class Layout extends React.Component {
    render(){
        return <this.functionalRender />
    }

    functionalRender = () =>{
        const boxes = service.getBoxes();
        const location = useLocation();
        return(
            <div className='root'>
                <div className="side-menu">
                    <Drawer 
                        variant="permanent"
                        anchor="left"
                    >
                        <Toolbar >
                            <img src={logo} alt="Psy en ligne" className="main-logo"/>
                        </Toolbar>
                            <div className="boxes">
                                <List >
                                    {boxes.map((box)=>
                                        <SideBar box={box} 
                                            selected = {location.pathname.includes('/'+box.text) ? true : false}
                                        />
                                    )}
                                </List>
                            </div>
                    </Drawer>
                </div>
                <div className="page">
                    {this.props.children}
                </div>
            </div>
        )
    }
}