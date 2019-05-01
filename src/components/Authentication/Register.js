import React, { Component } from "react"

export default class RegisterForm extends Component {
    state = {
        name: "",
        email: "",
        password: ""
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleRegister = () => {
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        console.log(newUser)
        this.props.postUser(newUser)
        .then(this.props.history.push("/login"))
    }

    render() {
        return (
            <React.Fragment>
                <form className="registerForm">
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                             type="text"
                            required className="form-control"
                             onChange={this.handleFieldChange}
                            id="name"
                         />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            required className="form-control"
                            onChange={this.handleFieldChange}
                            id="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            required className="form-control"
                            onChange={this.handleFieldChange}
                            id="password"/>
                    </div>
                    <button
            type="button"
            onClick={this.handleRegister}
            className="btn btn-primary"
          >
            Register
          </button>
                </form>
            </React.Fragment>
        )
    }
}