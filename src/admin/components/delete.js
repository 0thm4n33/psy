import React, { useState } from "react";
import { Delete } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { Modal } from "@mui/material";
import '../../styles/delete-modal.css';
import service from "../../services";

export default function DeleteComponenet({ post }){
    const [open,setOpen] = useState();
    
    const handleOpen = () =>{
        setOpen(true)
    }
    
    const handleClose = ()=>{
        setOpen(false)
    }

    const handleDelete = () =>{
        console.log(`url: ${post._id}`);
        service.deleteOnePost(post._id).then((res)=>{
            console.log(`result from backend: ${res.status}`);
            setOpen(false);
        }).catch(error =>{
            console.log(`error while deleting post: ${error}`);
        })
    }
    
    return(
        <div>
             <Button onClick={handleOpen} color="secondary">
                <Delete fontSize="small"/>
                Supprimer
             </Button>
                <Modal
                    open={open}
                    onClose={handleClose}   
                >
                    <div className="body-modal">
                        <h4>Vous voulez vraiment supprimer ce post</h4>
                        <div className="button-modal">
                            <Button color="default" onClick={handleClose}>Annuler</Button>
                            <Button color="secondary" onClick={handleDelete}>Supprimer</Button>
                        </div>
                    </div>
                </Modal>
        </div>
    )
}