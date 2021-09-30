import React from "react";
import {Link} from "react-router-dom";


const MenuList = () => {
    return (
        <nav>
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to='/'>Users</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/projects'>Projects</Link>
                </li>
            </ul>
        </nav>
    )
}


export default MenuList