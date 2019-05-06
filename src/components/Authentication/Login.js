import React, { Component } from "react"
import UserManager from "../../modules/UserManager"

export default class Login extends Component {


    state = {
        email: "",
        password: "",
    }

  
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

   
    handleLogin = () => {
        // e.preventDefault()
        UserManager.getAllUsers()
        .then(users => {
            let loginUser = users.find(element =>
                element.email.toLowerCase() === this.state.email.toLowerCase() 
                && element.password.toLowerCase() === this.state.password.toLowerCase())
                if(loginUser) {
                    sessionStorage.setItem("userId", loginUser.id)
                    
                    this.props.history.push("/")
                } else {
                    window.alert("Login information not found. Please try again or register an account.")
                }
        })
           
            
    }

    render() {
        return (
            <div>
            <form onSubmit={this.handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail">
                    Email address
                </label>
                <input onChange={this.handleFieldChange} type="email"
                       id="email"
                       placeholder="Email address"
                       required="" autoFocus="" />
                <label htmlFor="inputPassword">
                    Password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                       id="password"
                       placeholder="Password"
                       required="" />
                <button type="button" 
                onClick={this.handleLogin}
                >
                    Sign in
                </button>
            </form>
            
            <button type="button"
            className="btn btn-primary"
            onClick= {() => {
                this.props.history.push("/register")
            }}> Register </button>
            </div>
        
        )
        }
}