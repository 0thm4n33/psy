import { Grid } from "@mui/material";
import React from "react";
import ArticleComponent from "./article";
import FirstArticle from "./mainArticle";
export default class ArticleList extends React.Component{

    render(){
        return <this.functionalRender />
    }

    functionalRender = ()=>{
        let articles = [];
        if(this.props.posts !== null){
            this.props.posts.forEach((a,index)=>{
                const title = a.category+'/'+a.postUrl;
                index === 0 ? articles.push(<FirstArticle article={a} title={title}/>) :
                 articles.push(<ArticleComponent a={a} title={title}/>)
            });
            return(
                <div className="list">
                    <Grid container>
                        {articles}
                    </Grid>
                </div>
            )
        }
    }
}