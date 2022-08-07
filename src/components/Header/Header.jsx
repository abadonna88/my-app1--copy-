import React from "react";
import { NavLink } from "react-router-dom";
import style from './Header.module.css';


const Header = (props) => {
    return <header className={style.header}>
        <img src='https://pbs.twimg.com/media/DZ3nN3eWsAAm_K7.jpg:large'></img>

        <div className={style.loginBlock}> 
            { props.isAuth 
            ? <div>{props.login}<button onClick={props.logout}>log out</button></div>
            : <NavLink to={'/login'}>Login</NavLink>
            }
        </div>
    </header>
}

export default Header;