import React from "react";


const MenuList = () => {
    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/#">Active</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/#">Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/#">Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled" href="/#">Disabled</a>
            </li>
        </ul>
    )
}


export default MenuList