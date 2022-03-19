import { Card, CardActionArea, CardActions, CardContent, CardMedia,  Grid,  Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Delete,Create } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import {ArrowForwardIos} from '@material-ui/icons';
import React from "react";
import "../styles/article.css";
import { Link } from "react-router-dom";
import service from '../services/index';

const useStyle = makeStyles(theme =>({
    title:{
        display: "flex",
        flexDirection:"column",
        position:"absolute",
        top: "50%",
        backgroundColor: "none",
        width: "100%",
        textAlign:"center",
        color: "white"
    },
    subtitle:{
        color:"#bdd4e7",
        fontFamily: 'Poppins'
    },
   button:{
       display:"flex",
       background: "none",
       backgroundColor:"none",
       color:"white",
       border:"none",
       padding: "4px",
       position:"absolute",
       width: "55%",
       top: "68%",
       flexDirection:"row-reverse"
   },
   a:{
    color:"white"
   },
   imageContainer:{
       width: "100%"
   }
}))
export default class ArticleComponent extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            article: '',
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentDidMount(){
        console.log('called');
    }

    handleOnClick(event){
    }

    clientPanel = () => {
        return(
            <div className={this.props.index === 0 ? useStyle().button : "card-button"} onClick={this.handleOnClick}>
                <ArrowForwardIos fontSize="small"/>
                <Link to={{
                    pathname: `${this.props.title}`,
                        state:{
                        article: true
                                    }
                                }}> Lire l'article
                </Link>
        </div>
        )
    }

    adminPanel = () =>{
        return(
            <div className="admin-panel">
                <Button startIcon={<Create />}>Modifier</Button>
                <Button startIcon={<Delete />}>Supprimer</Button>
            </div>
        )
    }

    render(){
        return(
              <this.functionalRender />
        )
    }
    
    functionalRender = () =>{
       const md = this.props.index === 0 ? 12 : 4;
       const height = this.props.index === 0 ? "400" : "190";
       const CustomizedCard = styled(Card)`
           border-radius: 20px;
           width: 100%;
           margin: 5px;
       `;
        return(
            <Grid key={this.props.a.title} item xs={12} md={md} className="grid">
                <div>
                    <CustomizedCard>
                        <CardActionArea >
                            <div className={this.props.index === 0 ? useStyle().imageContainer : ""}>
                                <CardMedia 
                                    component="img"
                                    height={height}
                                    alt={this.props.a.title}
                                    image={this.props.a.imageUrl}
                                />
                            </div>
                            {this.props.index === 0 ? 
                                <div className={useStyle().title}>
                                    <Typography
                                        variant="h4"
                                        component="h4"
                                    >
                                        {this.props.a.subtitle}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        component="h6"
                                        className={useStyle().subtitle}
                                    >
                                        {this.props.a.subtitle}
                                    </Typography>
                                </div> : 
                                <CardContent>
                                    <div className="card-title">
                                        {this.props.a.title.split('_').join(' ')}
                                    </div>
                                    <div className="card-subtitle">
                                        {this.props.a.subtitle}
                                    </div>
                                </CardContent>
                            }
                            <CardActions>
                                {service.isAuthenticated() === 'true' ? 
                                    this.adminPanel() : this.clientPanel()
                                }
                            </CardActions>
                        </CardActionArea>
                    </CustomizedCard> 
            </div>
        </Grid>
        )
    }
}
