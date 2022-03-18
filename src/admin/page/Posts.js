import React from "react";
import service from "../../services";
import ArticleList from "../../components/articlesList";
export default class PostAdmin extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            posts:[]
        }
    }

    async componentDidMount(){
        service.getPosts().then(data =>{
            this.setState({
                posts: data.posts
            })
        }).catch(error =>{
            console.log('error: '+error);
        })
    }

    render(){
        return(
            <div>
                <div className="header">
                    <h2>Tous les postes</h2>
                </div>
                <div className="body">
                    <ArticleList posts={this.state.posts} />
                </div>
            </div>
        )
    }
}