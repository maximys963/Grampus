import React, {Component} from 'react';
import '../styles/main_screen.css'
import Background from '../images/brainstorming-colleagues-communication-1204649.png'
import { Input, Icon,  Button } from 'antd';
import { NavLink } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {backUrl} from '../App'

const Singup = styled.p`
margin-top: 5px;
`;

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            userPassword: '',
            userEmail: '',
            SignedIn: false
        };
    }

    emitEmpty = () => {
        this.userIDInput.focus();
        this.setState({ userID: '' });
    };
    emitEmptyEmail = () => {
        this.email.focus();
        this.setState({ userEmail: '' });
    };

    emitEmptyPassword = () =>{
        this.password.focus();
        this.setState({ userPassword: '' });
    };

    onChangeUserID = (e) => {
        this.setState({ userID: e.target.value });
    };

    onChangeUserEmail = (e) => {
        this.setState({ userEmail: e.target.value})
    };

    onChangeUserPassword = (e) =>{
        this.setState({ userPassword: e.target.value})
    };

    onSignIn = () =>{

        axios.post(`${backUrl}/api/user/login`, {
            email: this.state.userEmail,
            password: this.state.userPassword
        })
            .then((response) => {
            console.log(response);
            if(response.data.status === 'success'){
                this.setState({
                    SignedIn: true,
                });
            localStorage.setItem('token', response.data.data.token);
              localStorage.setItem('name', response.data.data.name);

            // let storage = localStorage.getItem('token');
            //     console.log(response.data.data.name);

            }
            })
            .catch( (error) => {
            // handle error
            console.log(error);
        });




    };



    render() {
        if (this.state.SignedIn === true) {
            return <Redirect to='/profile' />
        }
        const userID  = this.state.userID;
        const  userPassword  = this.state.userPassword;
        const userEmail = this.state.userEmail;
        const suffix = userID ? <Icon type="close-circle" onClick={this.emitEmpty} /> :  null;
        const suffixEmail = userEmail ? <Icon type="close-circle" onClick={this.emitEmptyEmail} />: null;
        const suffixPassword = userPassword ? <Icon type="close-circle" onClick={this.emitEmptyPassword} />: null;

        return (
            <div>
            <div className="menu_container">
                <ul className="main_menu">
                    <li><a href="#">Business</a></li>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">Prising</a></li>
                    <li><a href="#">About Us</a></li>
                </ul>

            </div>
                <section className='container-background-image' style={{backgroundImage: `url(${Background})`}}>
                    <div className="twix_containers" id="moto_container" >
                       <p className="moto">"The harder I work, the more luck I have."</p>
                    </div>
                    <div className="twix_containers" id="sign_in_container">
                        <div className="input_preventer">

                        <Input
                            id="inputs_email"
                            placeholder="Enter your email"
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={suffixEmail}
                            value={userEmail}
                            onChange={this.onChangeUserEmail}
                            ref={node => this.email = node}
                            size="large" />

                        <Input
                            id="inputs_password"
                            placeholder="Enter your password"
                            prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={suffixPassword}
                            value={userPassword}
                            onChange={this.onChangeUserPassword}
                            ref={node => this.password = node}
                            size="large" />
                            <Button size="large" type="primary" onClick={this.onSignIn}>Sign In</Button>
                            <Singup>Or you can create account and <strong><NavLink to="/signup">Sign Up</NavLink></strong></Singup>
                        </div>

                    </div>
                </section>
            </div>
        );
    }
}

export default MainScreen;
