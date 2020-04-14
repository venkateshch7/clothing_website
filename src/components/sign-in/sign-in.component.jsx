import React, {  Component } from "react";

import '../sign-in/sign-in.styles.scss'
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signInWithGoogle } from "../../firebase/firebase.util";



class SignIn extends Component{
    constructor(props){
        super(props);

        this.state ={
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({email: '',password: ''})
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    render(){
        return(
            <div className='sign-in'>
                <h2 className='title'>I already have an account</h2>
                <span className='sub-title'>SignIn with your email id and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name = 'email'
                        type = 'email'
                        value = {this.state.email}
                        handleChange = {this.handleChange}
                        label = 'email'
                        required
                    />
                    <FormInput
                        name = 'password'
                        type = 'password'
                        value = {this.state.password}
                        handleChange = {this.handleChange}
                        label = 'password'
                        required
                    />
                    <div className="buttons">
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick = {signInWithGoogle} isGoogleSignIn >
                            {''}
                            Sign In with Google{''}
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}
export default SignIn;