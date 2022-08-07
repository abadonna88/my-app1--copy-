import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Nav.module.css';

// const Nav = () => {
//     return <nav className={style.nav}>
//         <div className={style.item}>
//             <NavLink to="/profile" activeClassName={style.activeLink}>
//                 Profile
//             </NavLink>
//         </div>
//         <div className={style.item}>
//             <NavLink to="/users" activeClassName={style.activeLink}
//                 Users
//             </NavLink>
//         </div>
//         <div className={style.item}>
//             <NavLink to="/dialogs" activeClassName={style.activeLink}>
//                 Messages
//             </NavLink>
//         </div>
//         <div className={style.item}>
//             <NavLink to="/news" activeClassName={style.activeLink}>
//                 News
//             </NavLink>
//         </div>
//         <div className={style.item}> 
//             <NavLink to="/music" activeClassName={style.activeLink}>
//                 Music
//             </NavLink>
//         </div>
//     </nav>
// }

const Nav = () => {
        let activeStyle = {
            color: 'green',
        };
        return <nav className={styles.nav}>
            <div className={styles.item}>
                <NavLink to="/profile" style={({ isActive }) =>isActive ? activeStyle : undefined}>
                    Profile
                </NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/users" style={({ isActive }) =>isActive ? activeStyle : undefined}>
                    Users
                </NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/dialogs" style={({ isActive }) =>isActive ? activeStyle : undefined}>
                    Messages
                </NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/news" style={({ isActive }) =>isActive ? activeStyle : undefined}>
                    News
                </NavLink>
            </div>
            <div className={styles.item}> 
                <NavLink to="/music" style={({ isActive }) =>isActive ? activeStyle : undefined}>
                    Music
                </NavLink>
            </div>
        </nav>
    }

export default Nav;