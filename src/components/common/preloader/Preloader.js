import React from "react";
import load from './../../../assets/images/load.gif';

let Preloader = (props) => {
    return (
        props.isFetching ? <img src={load} /> :null 
    )
}

export default Preloader;