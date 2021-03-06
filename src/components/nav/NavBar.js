import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
// import "../nav/NavBar.css"


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Library</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/search">Find Books</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/friends">Friends</Link>
                    </li> */}
                    
                </ul>
            </nav>
        )
    }
}

export default NavBar
