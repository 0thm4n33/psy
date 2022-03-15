import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/navbar";
import service from '../services/index';
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import '../styles/article-page.css';
import { CardMedia } from "@material-ui/core";

function ArticlePage(){
    const { title } = useParams();
    const [post,setPost] = useState('');

    useEffect(()=>{
        async function fecthArticle(){
            const post = await service.getOnePost(title);
            console.log('post content: '+post.content);
            service.getContentXML(post.content,(result)=>{
                let postContent = document.getElementById('post-content');
                if(postContent !== null) postContent.appendChild(result);
            })
            post.title = post.title.split('_').join(' ');
            setPost(post);
        }
        fecthArticle();
    },[title]);
   
    if(post !== ''){
        return(
            <div className="post">
                <div>
                    <Header 
                    title={post.title}
                    subtitle={post.subtitle}
                    >
                        <NavBar />
                        <SearchBar />
                    </Header>
                </div>
                <div className="post-body">
                    <div className="post-image">
                        <CardMedia
                        component="img"
                        height="400"
                        image={post.imageUrl}
                        title={post.title}
                        >
                        </CardMedia>
                    </div>
                    <div className="post-content" id="post-content" />
                </div>
            </div>
        )
    }else{
        return(
            <div>404 NOT FOUND</div>
        )
    }
}

export default ArticlePage;