import React from "react";
import {Search} from '@material-ui/icons';
import "../styles/searchBar.css";

export default class SearchBar extends React.Component{
    render(){
        return(
            <form>
                <div className="searchwrapper">
                    <input type="text" placeholder="Chercher sur notre blog" />
                    <span className="icon">
                        <Search />
                    </span>
                </div>
            </form>
        )
    }
}