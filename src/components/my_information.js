import React, {Component} from 'react';
import styled from 'styled-components';
import {TopMenuContainer, MenuContainer,  MenuItem, MenuLink, SideMenu, } from './community'
import {RightContent} from "./rating";
import { Input, Button } from 'antd';
import axios from "axios";
import {Redirect} from 'react-router-dom'
import {backUrl} from '../App'

const { TextArea } = Input;

const ProfileList = styled.div`
margin-top: 3px;
width: 80%;
background: #f7f7f7;
height: 800px;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
border: 2px solid #e8e8e6;

`;

const FormContainer = styled.div`
display: flex;
flex-direction: column;
width: 60%;
justify-content: center;
align-items: center;

`;

class MyInformation extends Component {
    constructor(props){
        super(props);
        this.state = {
           information: '',
            skills: '',
            submitted: false,

        };

    }

    onChangeInformation = (e) => {
        e.preventDefault();
        this.setState({
            information: e.target.value,
        })
    };
    onChangeSkills = (e) => {
        e.preventDefault();
        this.setState({
            skills: e.target.value,
    })
    };

    onSubmitChanges = () => {
        axios.post(`${backUrl}/api/user/edit`, {
            _token: localStorage.getItem('token'),
            description: this.state.information,
            skills: this.state.skills
        })
            .then( (response) => {
                // handle success
                console.log(response);
                if(response.data.status === 'success'){
                    this.setState({
                        submitted: true,
                    })
                }


            })
            .catch( (error) => {
                // handle error
                console.log(error.response);
            });
    };




    render() {
        if (this.state.submitted === true) {
            return <Redirect to='/profile' />
        }
        return (
            <div>
                <TopMenuContainer >
                    <MenuContainer >
                        <MenuItem><MenuLink>Business</MenuLink></MenuItem>
                        <MenuItem><MenuLink>Features</MenuLink></MenuItem>
                        <MenuItem><MenuLink>Prising</MenuLink></MenuItem>
                        <MenuItem><MenuLink>About Us</MenuLink></MenuItem>
                    </MenuContainer>
                </TopMenuContainer>
                <RightContent style={{zIndex: 0}}>
                    <ProfileList>
                        <FormContainer>

                        <TextArea style={{marginTop: "50px", height: "150px"}} placeholder="Write about you please" value={this.state.information} onChange={this.onChangeInformation} />

                            <TextArea style={{marginTop: "20px", marginBottom: "20px", height: "150px"}} placeholder="Write about your skills" value={this.state.skills}  onChange={this.onChangeSkills} />
                            <Button size="large" type="primary" onClick={this.onSubmitChanges}>Submit</Button>
                        </FormContainer>


                    </ProfileList>
                </RightContent>
                <SideMenu stateMode={this.state.mode}
                          stateTheme={this.state.theme}

                />
            </div>
        );
    }
}



export default MyInformation;
