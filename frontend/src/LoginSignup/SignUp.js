import React from "react"
import {Link} from 'react-router-dom'
import "./login&signup.css"

//user should be able to sing up for an account 

class SignUp extends React.Component{


    // creates FormData object for post request
    handleFormSubmit =(event)=>{
        event.preventDefault()
        let formdata = new FormData(event.target)
        this.creatUser(formdata)
    }

    // needs to change.SetJwtto a real function
    // Post request to create user  

    creatUser =(formdata)=>{
        fetch("http://localhost:3000/signup",{
            method: "POST",
            body: formdata,
        })
        .then( res=> res.json())
        .then( data => this.setSessionStorage(data))
    }

    // json response should be a jwt token
    // sets sessionStorage.token to jwt
    // redirects user to homepage 

    setSessionStorage=(data)=>{
        sessionStorage.setItem('token', data.token)
        
       this.props.history.push("/homepage")
    }
    
   
    render(){
        return(
            <div className="Login">
                <form onSubmit={this.handleFormSubmit} className="submissionForm">
                    <h2> Sign up </h2>
                        <label className="labelA"> username</label>
                        <input type ="text" name="username"/>
                        <label className="labelA"> password</label>
                        <input type ="password" name="password"/>
                        <br />
                        <br />
                        <button className="primary">sign up</button>
                        <Link to="/">
                            <button> login</button>
                        </Link> 
                </form>
            </div>
        )
    }
}


export default SignUp