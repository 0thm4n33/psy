import { Grid } from "@mui/material";
import React from "react";
import ArticleComponent from "./article";

export default class ArticleList extends React.Component{

    render(){
        return <this.functionalRender />
    }

    functionalRender = ()=>{
        let articles = [];
        if(this.props.posts !== null){
            this.props.posts.forEach((a,index)=>{
                const title = a.category+'/'+a.postUrl;
                 articles.push(<ArticleComponent a={a} title={title} index={index}/>)
            });
            return(
                <div>
                    <Grid container>
                        {articles}
                    </Grid>
                </div>
            )
        }
    }
}