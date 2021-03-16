import React from "react"
import "./NavBar.css"
import {Link} from "react-router-dom"

class NavBar extends React.Component{
      // clears session stroage, 
    // since sesssion stroage is no longer true the user is push back to login

    logOut =()=>{
        sessionStorage.clear()
    }
    // provides links to the homepage, create game, create charcter, view charcter and the user can click a link to logout 
    render(){
        return(
            <div>
                <ul id="navbar">
                    <li>
                        <Link to="/" onClick={this.logOut}>
                            Logout
                        </Link>
                    </li>
                    <li>
                        <Link to="view_character">
                            view characters
                        </Link>
                    </li>
                    <li>
                        <Link to="/character_creation">
                            charater creation 
                        </Link>
                    </li>
                    <li>
                        <Link to="/create_game">
                            create game
                        </Link>
                    </li>
                    <li>
                        <Link to="/homepage">
                            Homepage
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NavBar