import React, { Component } from 'react'
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";


import { auth, createUserProfileDocument } from "../../firebase/firebase.util";

import './sign-up.styles.scss'

class SignUp extends Component {
    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;
        if ( password !== confirmPassword ){
            alert("Passwords do not match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            createUserProfileDocument(user, {displayName});

            this.state = {
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }

        } catch (error){
            console.log(error);
        }
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    render(){
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with an account</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name = 'displayName'
                        type = 'text'
                        value = {displayName}
                        handleChange = {this.handleChange}
                        label = 'Display name'
                        required
                    />
                    <FormInput
                        name = 'email'
                        type = 'email'
                        value = {email}
                        handleChange = {this.handleChange}
                        label = 'E-mail'
                        required
                    />
                    <FormInput
                        name = 'password'
                        type = 'password'
                        value = {password}
                        handleChange = {this.handleChange}
                        label = 'Password'
                        required
                    />
                    <FormInput
                        name = 'confirmPassword'
                        type = 'password'
                        value = {confirmPassword}
                        handleChange = {this.handleChange}
                        label = 'Confirm password'
                        required
                    />
                    <div className="buttons">
                        <CustomButton type='submit'>Sign Up</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;