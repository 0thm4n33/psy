const PROTOCOLE = 'https';
const ADDRESS = 'backend-flax-rho.vercel.app';
//const ADDRESS = 'localhost';
//const PORT = '3030';
const API_ADDRESS = PROTOCOLE+'://'+ADDRESS;
const EXTENSION_CONTENT = "txt";
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

    static setAuthenticated(){
       localStorage.setItem('auth',true);
    }

    static isAuthenticated(){
        let value = localStorage.getItem('auth');
        console.log('value: '+value);
        return value;
    }

    static disconnect(){
        localStorage.removeItem('auth');
    }

    static getPosts = async () => {
        const result = await Service.getResults(API_ADDRESS+'/blog');
        return result.json();
    };
    
    static getBoxes = () =>{
        console.log('get boxes ... ')
        if(this.isAuthenticated() === 'true'){
            return boxesAdmin;
        }
        return boxes;
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

    static deleteOnePost = (id) =>{
        return fetch(API_ADDRESS+'/blog/'+id,{
            method: 'DELETE',
        });
    }
    
    static getAPI = () => {
        return API_ADDRESS;
    };
    
    static addPosts = (post,image,method) => {
        const address = method === 'POST' ? API_ADDRESS+'/blog' : API_ADDRESS+'/blog/'+post._id;
        let postObject = JSON.stringify(post);
        console.log(`post: ${postObject}`);
        let formData = new FormData();
        formData.append('image',image);
        formData.append('post',postObject);
        return fetch(address,{
            method: method,
            body: formData
        })
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
