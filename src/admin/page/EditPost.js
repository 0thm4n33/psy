import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddPost from "../../pages/AddPost";
import service from "../../services";


export default function EditPost(){
    const {title} = useParams();
    const [post,setPost] = useState();
    
    useEffect(()=>{
        service.getOnePost(title).then(data =>{
            setPost(data);
        }).catch(error=>{
            console.log(`error while fetching post: ${error}`);
        })
    },[title]);

    return(
       <div>
          {post !== undefined && 
            <div>
                <AddPost post={post} />
            </div>
          }
       </div>
    )
}