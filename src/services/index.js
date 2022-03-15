const PROTOCOLE = 'https';
const ADDRESS = 'backend-red.vercel.app';
//const PORT = '3030';
const API_ADDRESS = PROTOCOLE+'://'+ADDRESS;
const EXTENSION_CONTENT = "html";
var authenticated = false;
const boxes = [
        {'text':'blog','url':'/blog',},
        {'text':'conntactez-nous','url' : '/conntactez-nous',},
        {'text':'connexion','url' : '/admin/connexion',}
    ];
const boxesAdmin = [
        {'text':'post','url':'/admin/post'},
        {'text':'logout','url':'/blog'}
    ];
export default class Service {
    static getPosts = async () => {
        const result = await Service.getResults(API_ADDRESS+'/blog');
        return result.json();
    };
    
    static getBoxes = () =>{
        if(this.isAuthenticated()){
            return boxesAdmin;
        }
        return boxes;
    }
    
    static setIsAuthenticated = (value) =>{
        authenticated = value;
    }
    
    static isAuthenticated = () =>{
        return authenticated;
    }
    
    static getContent =  async (contentUrl) =>{
        const content = await Service.getResults(contentUrl+"."+EXTENSION_CONTENT);
        const reader = content.body.getReader();
        const dataReader = await reader.read(({done,value})=>{
            if(done){
                return
            }
            dataReader.push(value);
        });
        return new TextDecoder().decode(dataReader.value);
    }
    
    static getContentXML = (url,callback) =>{
        let rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("text/plain");
        rawFile.open("GET",url+"."+EXTENSION_CONTENT,true);
        rawFile.onreadystatechange = () =>{
            if(rawFile.readyState === XMLHttpRequest.DONE){
                let result = rawFile.responseText;
                let root = document.createElement('div');
                let element = null;
                let builder = '';
                for(let i = 0;i < result.length;i++){
                    if(result[i] === '\n'){
                        if(builder.length <= 70){
                            element = document.createElement('h3');
                        }
                        else{
                            element = document.createElement('div');
                        }
                        element.innerText = builder;
                        root.append(element);
                        builder = '';
                        continue;
                    }
                    builder = builder + result[i];
                }
                callback(root);
            }
        }
        rawFile.send(null);
    }
    
    static getCategories = async () => {
        const result = await Service.getResults(API_ADDRESS+'/blog/category');
        return result.json();
    };
    
    static getOnePost = async(title) =>{
        const post = await Service.getResults(API_ADDRESS+'/blog/'+title);
        return post.json();
    }
    
    static getAPI = () => {
        return API_ADDRESS;
    };
    
    static addPosts = (post,image) => {
        let postObject = JSON.stringify(post);
        console.log('PostObject : '+JSON.stringify(post));
        let formData = new FormData();
        formData.append('image',image);
        formData.append('post',postObject);
        fetch(API_ADDRESS+'/blog',{
            method: 'POST',
            body: formData
        }).then((response)=>{
            console.log('post added ',response)
        }).catch(error=>{
            console.log('error while adding post '+error);
        });
    }
    
    static login = async (user) =>{
        const userObject = JSON.stringify(user);
        return fetch(API_ADDRESS+'/user/login',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: userObject
        });
    }
    
    static getResults = async (target) => {
        console.log(target);
        return await fetch(target);     
    }; 
}
