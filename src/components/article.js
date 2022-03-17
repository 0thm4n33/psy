import { Card, CardActionArea, CardActions, CardContent, CardMedia,  Grid,  Typography } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import {ArrowForwardIos} from '@material-ui/icons';
import React from "react";
import "../styles/article.css";
import { Link } from "react-router-dom";

export default class ArticleComponent extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            article: ''
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentDidMount(){
        this.setState({
            article: this.props.a
        });
    }

    handleOnClick(event){
    }

    render(){
       const CustomizedCard = styled(Card)`
           border-radius: 20px;
           width: 100%;
           margin: 5px;
       `;
        return(
<<<<<<< HEAD
                <Grid key={this.props.a.title} item xs={12} md={4} lg={4} className="grid">
                    <div>
                        <CustomizedCard>
                            <CardActionArea >
                                <CardMedia 
                                    component="img"
                                    height="190"
                                    alt={this.props.a.title}
                                    image={this.props.a.imageUrl}
                                />
                                <CardContent>
                                    <div className="card-title">
                                        {this.props.a.title.split('_').join(' ')}
                                    </div>
                                    <Typography variant="body2" color="textSecondary">
                                        {this.props.a.subtitle}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <button className="card-button" onClick={this.handleOnClick}>
                                        <ArrowForwardIos fontSize="small"/>
                                        <Link to={{
                                            pathname: `${this.props.title}`,
                                            state:{
                                                article: true
                                            }
                                        }}>
                                            Lire l'article
                                        </Link>
                                    </button>
                                </CardActions>
                            </CardActionArea>
                        </CustomizedCard> 
                </div>
            </Grid>
=======
            <Grid key={this.props.a.title} item xs={12} md={4} lg={4} className="grid">
                <div>
                    <CustomizedCard>
                        <CardActionArea >
                            <CardMedia 
                                component="img"
                                height="190"
                                alt={this.props.a.title}
                                image={this.props.a.imageUrl}
                            />
                            <CardContent>
                                <div className="card-title">
                                    {this.props.a.title.split('_').join(' ')}
                                </div>
                                <Typography variant="body2" color="textSecondary">
                                    {this.props.a.subtitle}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <button className="card-button" onClick={this.handleOnClick}>
                                    <ArrowForwardIos fontSize="small"/>
                                    <Link to={{
                                        pathname: `${this.props.title}`,
                                        state:{
                                            article: true
                                        }
                                    }}>
                                        Lire l'article
                                    </Link>
                                </button>
                            </CardActions>
                        </CardActionArea>
                    </CustomizedCard> 
            </div>
        </Grid>
>>>>>>> b80222eb7d3ca4a152b1455e72a21f676534894a
        )
    }
}
