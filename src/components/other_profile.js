import React, {Component} from 'react';
import styled from 'styled-components';
import {TopMenuContainer, MenuContainer,  MenuItem, MenuLink, SideMenu, } from './community'
import {RightContent} from "./rating";
import { Avatar } from 'antd';
import axios from 'axios';
import {Redirected} from 'react-router-dom'
import {backUrl} from '../App'

const ProfileList = styled.div`
margin-top: 3px;
width: 80%;
background: #f7f7f7;
height: 800px;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-item: center;
border: 2px solid #e8e8e6;
`;

const InfoContainer = styled.div`
margin-left: 40px;
`;
const Achivka = styled.img`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 80px;
height: 80px;

`;
const AchivkaContainer = styled.div`
margin-left: 40px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;
const BlockFirst = styled.div`
display: flex;
width: 100%;
height: 200px; 
flex-direction: row;
justify-content: flex-start;
align-items: center;
border-bottom: 2px solid #e8e8e6;
`;
const BlockTitle = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
margin-left: 40px;
`;


const BlockSecond = styled.div`
display: flex;
width: 100%;
height: 400px; 
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
border-bottom: 2px solid #e8e8e6;
`;
const AchivesContainer = styled.div`
display: flex;
width: 100%;
flex-direction: row;
height: 250px;

`;
const BlockThird = styled.div`
display: flex;
width: 100%;
height: 300px; 
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
border-bottom: 2px solid #e8e8e6;
`;
const BlockFouth = styled.div`
display: flex;
width: 100%;
height: 300px; 
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
border-bottom: 2px solid #e8e8e6;
`;

const UserName = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-item: center;
margin-left: 40px;
width: 400px
`;

class OtherProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode: 'inline',
            theme: 'light',
            name: '',
            surname: '',
            user_id: '',
            information: '',
            skills: '',
            voices_amount: '32',
            comments_amount: '100',
            comments_gotten: '29',
            avatar_url: '',
            has_likes_count: '',
            has_dislike_count: '',



        };

    }

    componentDidMount(){
        axios.get(`${backUrl}/api/user/info?_token=${localStorage.getItem('token')}&id=${localStorage.getItem('otherid')}`)
            .then( (response) => {
                // handle success
                console.log(response);
                this.setState({
                    name: response.data.data.name,
                    information: response.data.data.description,
                    skills: response.data.data.skills,
                    avatar_url: response.data.data.avatar_url,
                    has_likes_count: response.data.data.has_likes_count,
                    has_dislike_count: response.data.data.has_dis_likes_count,
                });




            })
            .catch( (error) => {
                // handle error
                console.log(error.response);
            });

    }



    render() {

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
                        <BlockFirst>
                            <Avatar shape="square" size={100} icon="user" src={this.state.avatar_url} style={{marginLeft: "40px"}} />
                            <UserName>
                                <div>{this.state.name + " " + this.state.surname}</div>
                                <div>{this.state.position}</div>
                                <div>{`Rating points: ${this.state.has_likes_count - this.state.has_dislike_count}`}</div>
                            </UserName>
                        </BlockFirst>
                        <BlockSecond>
                            <BlockTitle>Achives</BlockTitle>
                            <AchivesContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/none.svg")} />
                                    <p>Best Looker</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/best_looker.svg")} />
                                    <p>Best Looker</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/dedliner.svg")} />
                                    <p>Deadliner</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/enot.svg")} />
                                    <p>Office Rescuer</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/extravert.svg")} />
                                    <p>Extrovert</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/introvert.svg")} />
                                    <p>Introvert</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/super2.svg")} />
                                    <p>Super Worker</p>
                                </AchivkaContainer>
                            </AchivesContainer>
                            <AchivesContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/none.svg")} />
                                    <p>Best Looker</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/none.svg")} />
                                    <p>Best Looker</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/number 1.svg")} />
                                    <p>Number 1</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/none.svg")} />
                                    <p>Best Looker</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/origami.svg")} />
                                    <p>Smart Mind</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/none.svg")} />
                                    <p>Best Looker</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/none.svg")} />
                                    <p>Best Looker</p>
                                </AchivkaContainer>
                            </AchivesContainer>

                        </BlockSecond>
                        <BlockThird>
                            <BlockTitle>Information</BlockTitle>
                            <InfoContainer>{this.state.information}</InfoContainer>
                        </BlockThird>
                        <BlockFouth>
                            <BlockTitle>Skills</BlockTitle>
                            <InfoContainer>{this.state.skills}</InfoContainer>
                        </BlockFouth>
                    </ProfileList>
                </RightContent>
                <SideMenu stateMode={this.state.mode}
                          stateTheme={this.state.theme}

                />
            </div>
        );
    }
}



export default OtherProfile;
