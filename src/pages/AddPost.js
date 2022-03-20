import React from "react";
import '../styles/add-post.css';
import service from '../services/index';
export default class AddPost extends React.Component{ 
    
    constructor(props){
        super(props);
        if(this.props.post !== undefined){
            console.log(`post: ${this.props.post}`);
        }
        this.state = {
            categories : [],
            title: this.props.post === undefined ? '' : this.props.post.title.split('_').join(' '),
            subtitle: this.props.post === undefined ? '' : this.props.post.subtitle,
            category: '',
            content: this.props.post === undefined ? '' : this.getContent(this.props.post.content),
            image: this.props.post === undefined ? '' : this.props.post.imageUrl
        };
        this.image = React.createRef();
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.getContent = this.getContent.bind(this);
    }

    handleOnChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    getContent(url){
        service.getContent(url).then(data => {
            this.setState({
                content: data
            })
        }).catch(error =>{
            console.log(`error while fetching content: ${error}`);
        })
    }

    handleOnSubmit(event){
        event.preventDefault();
        const title = this.state.title.split(' ').join('_');
        const post = {
                title: title,
                subtitle: this.state.subtitle,
                category: this.state.category,
                content: this.state.content,
                postUrl: title
            };    
        service.addPosts(post,this.image.current.files[0])
    }

    async componentDidMount(){
        const result = await service.getCategories();
        console.log(result.categorys)
        this.setState({
            categories : result.categorys,
            category: result.categorys[0].name
        });
    }

    render(){
        console.log(`rendering ... ${this.state.image}`);
        return(
          <div className="post-wrapper">
                <h2>{this.props.post === undefined ? "Nouveau post" : "Modifier post"}</h2>
                <form onSubmit={this.handleOnSubmit}>
                  <table className="table">
                      <tr>
                          <td className="label">Titre </td>
                          <td>
                            <input 
                                type="text" 
                                name="title" 
                                id="title" 
                                size={50} 
                                placeholder="entrez un titre" value={this.state.title}
                                onChange={this.handleOnChange}
                                />
                          </td>
                      </tr>
                      <tr>
                          <td className="label">
                            Sous titre
                         </td>
                          <td>
                            <input 
                                type="text" 
                                name="subtitle" 
                                id="subtitle" 
                                size={50} 
                                placeholder="entrez un sous titre" 
                                value={this.state.subtitle}
                                onChange={this.handleOnChange}
                            />
                          </td>
                      </tr>
                      <tr>
                          <td className="label">
                              Categorie
                          </td>
                          <td className="categories">
                              <select name="category" id="category" value={this.state.category}
                                onChange={this.handleOnChange}
                              >
                                  {this.state.categories.map(category => (
                                      <option value={category.name}>{category.name}</option>
                                  ))}
                              </select>
                          </td>
                      </tr>
                      <tr>
                          <td className="label">Image</td>
                          <td>
                              <input type="file" ref={this.image} name="image"/>
                          </td>
                      </tr>
                      {this.props.post !== undefined && 
                            <tr>
                              <td className="label">Image preview</td>
                              <td >
                                <img src={this.props.post.imageUrl} alt={this.props.post.title} className="image-preview" />
                              </td>
                          </tr>
                          }
                      <tr>
                          <td className="label">Contenu</td>
                          <td>
                              <textarea className="content" name="content" id="content" cols="90" rows="30"
                                value={this.state.content} 
                                onChange={this.handleOnChange} 
                              /> 
                          </td>
                      </tr>
                  </table>
                  <div className="submit">
                      <input type="submit" value="valider"/>
                  </div>
                </form>
          </div>
        )
    }
}