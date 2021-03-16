import React from "react"
import { connect} from "react-redux";
import {Link} from 'react-router-dom'
import {errorMessage} from "../redux/actions/loginSingupActions"
import "./login&signup.css"

class Login extends React.Component{

// user should be able to login to an already exsiting account
// if login succesfull user should be assingned jwt token to local storage
// if the user does not have account a button should redirect to sign up page 

    // sets error message to "" when the user comesback to the login page
    // keeps error message from persiting when moving from login and signup 
    componentDidMount(){
        this.props.errorMessage("")
    }


// creates a formdata object to send to post request
submitLoginInfo =(event)=>{
    event.preventDefault()
    let formdata = new FormData(event.target)
    this.checkUsersAuth(formdata)
}

// post request, checks if user is in the database, 
// should change sendHome functions name 
checkUsersAuth =(formdata)=>{
    fetch('http://localhost:3000/login',{
        method: "POST",
        body: formdata
    })
    .then(res => res.json())
    .then(data => this.sendHome(data))
}


// expects json object from rails backend,
//if the data has a token, the token is stored in session stroage and redirected to homepage
sendHome =(data)=>{
    if(data.token){
        sessionStorage.setItem('token', data.token)
        this.props.history.push("/homepage")
    }
    else
    //  updates the prop "message" to whatever error came back from rails
        this.props.errorMessage(data.error)

}
    render(){
        return(
                <div className="Login">
                    <form className="submissionForm" onSubmit={this.submitLoginInfo }>
                        <h2>Login</h2>
                        <label className="labelA">username</label>
                        <input type="username" name="username"/>
                        <label className="labelA">password</label>
                        <input type="password" name="password"></input>
                        <br />
                        <br />
                        <button className="primary"> login </button>
                    <Link to="/signup">
                        <button> signup</button>
                    </Link>
                    </form>
                        <p className="errorMessage"> {this.props.message}</p>
                </div>
            )
        }
    }
    

const mapStateToProps = (state) =>{
            return {
            message: state.loginSignUpReducer.message
    }
}


export default connect(mapStateToProps, {errorMessage})(Login)

// export default Login