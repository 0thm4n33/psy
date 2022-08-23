const PROTOCOLE = 'https';
const ADDRESS = 'backend-f4gkq4yrr-essaidiothmane0-gmailcom.vercel.app';
const API_ADDRESS = `${PROTOCOLE}://${ADDRESS}`;
const boxes = [
        {'text':'blog','url':'/blog',},
        {'text':'conntactez-nous','url' : '/conntactez-nous',},
        {'text':'connexion','url' : '/admin/connexion',}
    ];
const boxesAdmin = [
        {'text':'Posts','url':'/admin/posts'},
        {'text':'Categories','url':'/admin/categories'},
        {'text':'Utilisateurs','url':'/admin/users'},
        {'text':'Quitter','url':'/blog'}
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

    static getCategories = async () =>{
        const result = await this.getResults(API_ADDRESS+'/blog/category');
        return result.json();
    }
    
    static getBoxes = () =>{
        console.log('get boxes ... ')
        if(this.isAuthenticated() === 'true'){
            return boxesAdmin;
        }
        return boxes;
    }
    
    static getContent =  async (contentUrl) =>{
        console.log('url: '+contentUrl)
        const content = await Service.getResults(contentUrl);
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
        rawFile.open("GET",url,true);
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
                element = document.createElement('div');
                element.innerText = builder + '\n';
                root.append(element);
                callback(root); //send result
            }
        }
        rawFile.send(null);
    }
    
    static getOnePost = async(title) =>{
        const post = await Service.getResults(API_ADDRESS+'/blog/'+title);
        return post.json();
    }

    static udpateCategory = (category) =>{
        const categoryObject = JSON.stringify(category);
        return this.postFetch(`${API_ADDRESS}/blog/category/${category.id}`,'PUT',categoryObject);

    }

    static addCategory = (category) =>{
        const categoryObject = JSON.stringify(category);
        return this.postFetch(`${API_ADDRESS}/blog/category`,'POST',categoryObject);
    }

    static postFetch(address, method ,object){
        return fetch(address,{
            method: method,
            headers: {'Content-Type':'application/json'},
            body: object
        })
    }

    static deleteOneCategory = (id) =>{
        const address = `${API_ADDRESS}/blog/category/${id}`;
        return fetch(address,{
            method:'DELETE'
        })
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
