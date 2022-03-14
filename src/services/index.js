const PROTOCOLE = 'http';
const ADDRESS = 'localhost';
const PORT = '3030';
const API_ADDRESS = PROTOCOLE+'://'+ADDRESS+':'+PORT;
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

exports.getPosts = async () => {
    const result = await getResults(API_ADDRESS+'/blog');
    return result.json();
};

exports.getBoxes = () =>{
    if(this.isAuthenticated()){
        return boxesAdmin;
    }
    return boxes;
}

exports.setIsAuthenticated = (value) =>{
    authenticated = value;
}

exports.isAuthenticated = () =>{
    return authenticated;
}

exports.getContent =  async (contentUrl) =>{
    const content = await getResults(contentUrl+"."+EXTENSION_CONTENT);
    const reader = content.body.getReader();
    const dataReader = await reader.read(({done,value})=>{
        if(done){
            return
        }
        dataReader.push(value);
    });
    return new TextDecoder().decode(dataReader.value);
}

exports.getContentXML = (url,callback) =>{
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

exports.getCategories = async () => {
    const result = await getResults(API_ADDRESS+'/blog/category');
    return result.json();
};

exports.getOnePost = async(title) =>{
    const post = await getResults(API_ADDRESS+'/blog/'+title);
    return post.json();
}

exports.getAPI = () => {
    return API_ADDRESS;
};

exports.addPosts = (post,image) => {
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

exports.login = async (user) =>{
    const userObject = JSON.stringify(user);
    return fetch(API_ADDRESS+'/user/login',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: userObject
    });
}

const getResults = async (target) => {
    console.log(target);
    return await fetch(target);     
};