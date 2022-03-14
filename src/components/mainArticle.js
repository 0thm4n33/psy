import { Button, makeStyles, Typography } from "@material-ui/core";
import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import {ArrowForwardIos} from '@material-ui/icons';
import { Link } from "react-router-dom";
import React from "react";

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
       background: "none",
       color:"white",
       border:"none",
       padding: "4px"
   },
   a:{
    color:"white"
   },
   imageContainer:{
       width: "100%"
   }
}))

export default class FirstArticle extends React.Component{
    
    render(){
        return <this.functionalRender/>
    }

    functionalRender = () =>{
        const classes = useStyle();
        return(
            <div className="first">
            <Grid item xs={12} md={12} lg={12}>
                <CardActionArea>
                    <Card>
                        <div className={classes.imgContainer}>
                            <CardMedia
                                    component="img"
                                    image={this.props.article.imageUrl}
                                    height="400"
                                    title={this.props.article.title}
                                    className={classes.image}
                                />
                        </div>
                       
                            <div className={classes.title}>
                                <Typography
                                    variant="h4"
                                    component="h4"
                                >
                                    {this.props.article.subtitle}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    component="h6"
                                    className={classes.subtitle}
                                >
                                    {this.props.article.subtitle}
                                </Typography>
                                <Button className={classes.button}>
                                <Link to={{
                                        pathname: `${this.props.title}`,
                                        state:{
                                            article: true
                                        }
                                    }}>
                                        Lire l'article
                                    </Link>
                                        <ArrowForwardIos fontSize="small"/>
                                </Button>
                            </div>
                    </Card>
                </CardActionArea>
            </Grid>
        </div>
        )
    }
}