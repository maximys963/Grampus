import React, {Component} from 'react';
import styled from 'styled-components';
import {TopMenuContainer, MenuContainer,  MenuItem, MenuLink, SideMenu, } from './community'
import { message, Button } from 'antd';


import axios from 'axios';




const ProfileList = styled.div`
margin-top: 3px;
width: 80%;
background: #f7f7f7;
height: 1100px;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
border: 2px solid #e8e8e6;
`;

export const RightContent = styled.div`
 width: 100%;
 height: 1100px;
 position: absolute;
 left:0;
 padding-left: 256px;
 top: 50px;
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
 align-items: center;
`;



const BlockFirst = styled.div`
display: flex;
width: 250px;
height: 80px; 
flex-direction: column;
justify-content: center;
align-items: center;

`;

const success = () => {
    message.success(`You promise to help ${this.state.data} `, 5);
};

class Tasks extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode: 'inline',
            theme: 'light',
            data: [],
            name_1 : [],
            name_2: [],
            name_3: []



        };

    }

    success = () => {
        message.success(`You promise to help ${this.state.data.name} `, 5);
    };


    componentDidMount() {
        // this.getData((res) => {
        //     this.setState({
        //         initLoading: false,
        //         data: res.results,
        //         list: res.results,
        //     });
        //     console.log(res)
        // });


        axios.get(`https://c1d965fa.ngrok.io/api/user/all?_token=${localStorage.getItem('token')}`)
            .then( (response) => {
                // handle success
                console.log( response.data.data.users);
                this.setState({
                    data: response.data.data.users[0],
                    name_1: response.data.data.users[1],
                    name_2: response.data.data.users[2],
                    name_3: response.data.data.users[3],
                });

            })
            .catch( (error) => {
                // handle error
                console.log(error);
            });

    };



    render() {
        return (
            <div style={{height: '1100px'}}>
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
                        <BlockFirst >
                        <Button onClick={this.success} style={{display: 'flex', alignSelf: "center", }}>Help me please somebodywith Vue.js</Button>
                        <p style={{display: 'flex', alignSelf:  "center", }}>{this.state.data.name}</p>
                    </BlockFirst>
                        <BlockFirst>
                            <Button onClick={()=>{
                                message.success(`You promise to help ${this.state.name_1.name} `, 5)}}

                                    style={{display: 'flex', alignSelf: "center", }}>I need coffee (</Button>
                            <p style={{display: 'flex', alignSelf:  "center", }}>{this.state.name_1.name}</p>
                        </BlockFirst>
                        <BlockFirst >
                            <Button
                                onClick={()=>{
                                    message.success(`You promise to help ${this.state.name_2.name} `, 5)}}
                                style={{display: 'flex', alignSelf: "center", }}>Help me with task</Button>
                            <p style={{display: 'flex', alignSelf:  "center", }}>{this.state.name_2.name}</p>
                        </BlockFirst>
                        <BlockFirst >
                            <Button onClick={()=>{
                                message.success(`You promise to help ${this.state.name_3.name} `, 5)}} style={{display: 'flex', alignSelf: "center", }}> Can somebody teach me HTML</Button>
                            <p style={{display: 'flex', alignSelf: "center", }}>{this.state.name_3.name}</p>
                        </BlockFirst>

                    </ProfileList>
                </RightContent>
                <SideMenu stateMode={this.state.mode}
                          stateTheme={this.state.theme}

                />
            </div>
        );
    }
}



export default Tasks;