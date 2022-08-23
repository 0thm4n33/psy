import React from "react";
import { List, Toolbar, Drawer, Box, IconButton} from '@mui/material';
import {Menu} from '@material-ui/icons'
import SideBar from "./sideBar";
import '../styles/layout.css';
import { useLocation } from "react-router-dom";
import logo from '../assets/images/274697502_370553091282912_6384957551422282258_n.jpg';
import service from '../services/index';

const drawerWidth = 190;

export default class Layout extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            mobileOpen: false
        }
        this.handlerOpen = this.handlerOpen.bind(this);
    }

    handlerOpen(){
        this.setState({
            mobileOpen: !this.state.mobileOpen
        })
    }

    render(){
        return <this.functionalRender />
    }

    items = () => {
        const boxes = service.getBoxes();
        const location = useLocation();
        return(
            <div>
                <Toolbar >
                    <img src={logo} alt="Psy en ligne" className="main-logo" />
                </Toolbar>
                <div className="boxes">
                    <List >
                        {boxes.map((box)=>
                            <SideBar key={box.text} box={box} 
                                selected = {location.pathname.includes('/'+box.text) ? true : false}
                            />
                        )}
                    </List>
                </div>
            </div>
        )
    }

    functionalRender = () =>{
        return(
            <div className='root'>
                <Box sx={{display:{md:'none',xs:'block'}}}>
                    <IconButton 
                        onClick={this.handlerOpen}
                        edge="start"
                    >
                        <Menu/>
                    </IconButton>
                </Box>
                    <Box sx={{width:{sm:drawerWidth}}}>
                        <Drawer 
                            variant="permanent"
                            sx={{
                                display: { xs:'none',md: 'none',lg: 'block' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                            }}>
                                {this.items()}
                        </Drawer>
                        <Drawer
                            variant="temporary"
                            open={this.state.mobileOpen}
                            onClick={this.handlerOpen}
                            sx={{
                                display:{sm:'none',md:'none',xs:'block'}
                            }}>
                                {this.items()}
                        </Drawer>
                    </Box>           
                <div className="page">
                    {this.props.children}
                </div>
            </div>
        )
    }
}