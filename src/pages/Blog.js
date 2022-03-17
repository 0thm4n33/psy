import React from "react";
import ArticleList from "../components/articlesList";
import Header from "../components/header";
import NavBar from "../components/navbar";
import SearchBar from "../components/searchBar";
import serivces from '../services/index';
import "../styles/blog.css";
export default class BlogPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            categories: [],
            posts: []
        }
    }

    async componentDidMount(){
        const postResult = await serivces.getPosts();
        console.log(postResult);
        this.setState({
            posts: postResult.posts
        })
    }

    render(){
        return(
            <div className="blog-wrapper">
                <Header 
                    title={"Blog Psy En Ligne"} 
                    subtitle={"Retrouvez tous nos articles de psychologie sur notre blog. Votre bien-Être est entre de bonnes mains"}
                    >
                     <NavBar /> 
                    <SearchBar />
                </Header>
                <div className="center">
                    <ArticleList posts={this.state.posts}/>
                </div>
            </div>
        )
    }
}