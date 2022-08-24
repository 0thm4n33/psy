import { Box } from "@mui/material";
import React from "react";
import ButtonField from "../../components/forms/ButtonField/ButtonField";
import LabelTextArea from "../../components/forms/LabelTextArea/LabelTextArea";
import LabelTextField from "../../components/forms/LabelTextField/LabelTextField";
import {style} from './ConntactUs.style';
import {Send} from '@material-ui/icons'
export default class ConntactUsPage extends React.Component{
    render(){
        return(
            <Box style={style.main} sx={{width:{xs:"100%",md:"60%"}}}>
                    <h3>Conntactez-nous</h3>
                    <Box component={"form"} sx={{fontSize:"11px",display:'flex',gap:"10px",flexDirection:{xs:"column",md:'row'},flexWrap:{xs:'nowrap',md:'wrap'}}}>
                        <LabelTextField type={'text'} label={"Nom *"} size={43} />
                        <LabelTextField type={'text'} label={"Prenom *"} size={43} />
                        <LabelTextField type={'email'} label={"Email *"} size={91}/>
                        <LabelTextArea label={"Votre message *"} />
                        <Box sx={{width:"95%"}}>
                            <ButtonField label={"Envoyer le message"} icon={<Send />}/>
                        </Box>
                    </Box>
            </Box>
        )
    }
}