import { Box, TextField } from "@mui/material";
import React from "react";

export default function LabelTextArea({label,row,col}){
    const style = {
        backgroundColor:"white",
        borderRadius:"10px",
        padding:"15px",
        display:"flex",
        flexDirection:"column",
        height:"40%",
    }
    return(
        <Box style={style} sx={{width:{xs:"79%",md:"90%"}}}>
            <div>{label}</div>
            <TextField minRows={6} multiline sx={{margin:"20px"}} placeholder={"Ecrivez ici"}/>
        </Box>
    )
}