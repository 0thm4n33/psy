import React from "react";
import CategoryForm from "./categoryForm";
import '../../styles/add-category.css'
import { useNavigate } from "react-router-dom";
import service from "../../services";
export default function AddCategory(){

    const navigate = useNavigate();

    const onSubmit = (category) =>{
        service.addCategory(category).then((res)=>{
            if(res.status === 201){
                navigate('/admin/categories');
            }
        }).catch(error =>{
            alert(error)
        })
    }

    const handleOnClose = () =>{
        navigate('/admin/categories');
    }

    return(
        <div className="add-category">
            <div>Ajouter une nouvelle categorie</div>
            <CategoryForm classStyle={'add-category-form'} 
                onSubmit={onSubmit} 
                handleClose={handleOnClose}
            />
        </div>
    )
}