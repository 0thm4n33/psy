import { Button, Modal, Typography, Box, Stack } from "@mui/material";
import React, { useState } from "react";
import service from "../../services";
import CategoryForm from "./categoryForm";

export default function ModifyComponent(props){
    const [open,setOpen] = useState(false);
    
    const handleOpen = () =>{
        setOpen(true)
    }

    const handleClose = () =>{
        setOpen(false)
    }

    const modifyModal = () => {
        return(
            <div className="modal-category-body">
                <CategoryForm 
                    categoryName={props.category} 
                    handleClose={handleClose} 
                    onSubmit={handleOnModifiy}
                    />
            </div>
        )
    }

    const deleteModal = () =>{
       return(
           <Box sx={{width: '50%', border: '1px solid black', backgroundColor: 'white'}} >
                <Typography variant="overline" sx={{padding: '10px'}}>
                    Vous etes sur de vouloir supprimer  {props.category} ?
                </Typography>
                <Stack direction={"row-reverse"}>
                    <Button color="error" onClick={deleteCategory}>Supprimer</Button>
                    <Button color="secondary" onClick={handleClose}>Annuler</Button>
                </Stack>
           </Box>
       )
    }

    const deleteCategory = () =>{
        service.deleteOneCategory(props.id).then((res)=>{
            if(res.status === 204){
                props.ffive();
            }
        }).catch((res)=>{
            alert(`error while deleting category`);       
         })
    }

    
    const handleOnModifiy = (categoryForm) => {
        const category = { ...categoryForm,id:props.id}
        service.udpateCategory(category).then((res)=>{
            if(res.status === 201) {
                props.ffive();
            }
            handleClose();
        });
    }

    return(
        <div className="category-link">
            <Button onClick={handleOpen} color="inherit">
                {props.text} {props.icon}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className="category-modal">
                    {props.text === "modifier" ? modifyModal() : deleteModal()}
                </div>
            </Modal>
        </div>
    )
}