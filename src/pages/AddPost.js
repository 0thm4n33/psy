import React from "react";
import '../styles/add-post.css';
import service from '../services/index';
export default class AddPost extends React.Component{ 
    
    constructor(props){
        super(props);
        this.state = {
            categories : [],
            title: '',
            subtitle: '',
            category: '',
            content: '',
            image: ''
        };
        this.image = React.createRef();
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
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
        return(
          <div className="post-wrapper">
                <h2>Nouveau post</h2>
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