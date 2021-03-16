import React from "react"
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom'
import CreateCharacter from "./CharactersCRUD/CreateCharacterpage"
import Login from "./Login&Signup/Login"
import SignUp from "./LoginSignup/SignUp"
import Home from "./HomepageContainer/Homepage"
import Map from "./MapContainer/CreateMap"
import ViewCharacter from "./CharactersCRUD/ViewCharacter"
import CharacterEditor from "./CharactersCRUD/EditCharacterpage"
import SingleMap from "./MapContainer/SingleMapView"
import NavBar from "./NavBar"

class App extends React.Component{
// creates routes for app
// user should start at login and be able to navigate from there
// should not be able to access anything besides login and signup without token 
  render(){
    
    return(
      <Router>
        <Route exact path="/" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
          {!sessionStorage.token && <Redirect to="/"/>}
        <Route exact path="/homepage" component={Home}/>
        <Route exact path="/character_creation" component={CreateCharacter} />
        <Route exact path="/create_game" component={Map}/>
        <Route exact path="/view_character" component={ViewCharacter}/>
        <Route path ="/charactereditor" component={CharacterEditor}/>
        <Route path="/map" component={SingleMap} />
        <Route path="/nav" component={NavBar}/>
      </Router>
    )
  }
}

export default App;
