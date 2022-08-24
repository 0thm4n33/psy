import { FormControl, TextField } from '@mui/material';
import React from 'react';

export default function LabelTextField({type,label,size}){
    const style = {
        backgroundColor:"white",
        borderRadius:"10px",
        padding:"10px",
        color:"#C5C5C5"
    }

    return(
       <FormControl style={style} sx={{width:{xs:"80%",lg:`${size}%`}}}>
            <div>{label}</div>
            <TextField
                type={type}
                sx={{padding:'5px'}} />
       </FormControl>
    )
}