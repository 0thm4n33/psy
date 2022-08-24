import { Button } from "@mui/material";
import {style} from "./ButtonField.style";
import React from "react";

export default function ButtonField({label,icon,callback}){
    return(
        <Button style={style} endIcon={icon}>{label}</Button>
    )
}