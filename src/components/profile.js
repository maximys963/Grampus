import React, {Component} from 'react';
import styled from 'styled-components';
import {TopMenuContainer, MenuContainer,  MenuItem, MenuLink, SideMenu, } from './community'

import { Avatar } from 'antd';
import axios from 'axios';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Highcharts from 'highcharts'
import {backUrl} from '../App'

const ProfileList = styled.div`
margin-top: 3px;
width: 80%;
background: #f7f7f7;
height: 1300px;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-item: center;
border: 2px solid #e8e8e6;
`;

export const RightContent = styled.div`
 width: 100%;
 height: 1300px;
 position: absolute;
 left:0;
 padding-left: 256px;
 top: 50px;
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
 align-items: center;
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
margin-left: 5px;
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
const BlockTitle = styled.h4`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
margin-left: 40px;
`;

const BlockSecond = styled.div`
display: flex;
width: 100%;
height: 220px; 
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
border-bottom: 2px solid #e8e8e6;
`;
const AchivesContainer = styled.div`
display: flex;
width: 100%;
flex-direction: row;
justify-content: space-around;
height: 140px;


`;
const BlockThird = styled.div`
display: flex;
width: 100%;
min-height: 100px; 
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
border-bottom: 2px solid #e8e8e6;
`;
const BlockFouth = styled.div`
display: flex;
width: 100%;
min-height: 100px; 
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
border-bottom: 2px solid #e8e8e6;
`;
const ChartContainer = styled.div`
display: flex;
width: 90%;
min-height: auto; 
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
border-bottom: 2px solid #e8e8e6;
margin-left: 40px;
`;

const UserName = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-item: center;
margin-left: 40px;
width: 400px
`;

class Profile extends Component {
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



        };

    }

    componentDidMount(){
        axios.get(`${backUrl}/api/user/info?_token=${localStorage.getItem('token')}`)
            .then( (response) => {
                // handle success
                this.setState({
                    name: response.data.data.name,
                    information: response.data.data.description,
                    skills: response.data.data.skills,
                    avatar_url: response.data.data.avatar_url
                })



            })
            .catch( (error) => {
                // handle error
                console.log(error.response);
            });

        axios.get(`${backUrl}/api/like/category?_token=${localStorage.getItem('token')}&${this.state.user_id}`)
            .then( (response) => {
                // handle success
                console.log(response);
                this.setState({
                    name: response.data.data.name,
                    information: response.data.data.description,
                    skills: response.data.data.skills,
                    avatar_url: response.data.data.avatar_url
                })



            })
            .catch( (error) => {
                // handle error
                console.log(error.response);
            });




    }


    render() {
        const data = [
            {"name":"Likes", "data": {"2018-09-23": 5, "2018-09-24": 9, "2018-09-25": 2, "2018-09-26": 1, "2018-09-27": 4, "2018-09-28": 12, "2018-09-29": 9, "2018-09-30": 3,}},
            {"name":"Dislikes", "data": {"2018-09-23": 2, "2018-09-24": 5, "2018-09-25": 2, "2018-09-26": 8, "2018-09-27": 7, "2018-09-28": 10, "2018-09-29": 5, "2018-09-30": 0,}}
        ];
        return (
            <div style={{height: '1300px'}}>
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
                            <Avatar shape="square" size={100} icon="user" style={{marginLeft: "40px"}} src={this.state.avatar_url} />
                            <UserName>
                                <div>{this.state.name + " " + this.state.surname}</div>
                                <div>{this.state.position ? '' : 'programmer'}</div>
                            </UserName>
                        </BlockFirst>
                        <BlockSecond>
                            <BlockTitle>Achives</BlockTitle>
                            <AchivesContainer>
                                <AchivkaContainer>
                                <Achivka  src={require(".././achivments/none.svg")} />
                                 <p>Communicator</p>
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
                                    <p>Top 3 </p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/number 1.svg")} />
                                    <p>Top 1</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/none.svg")} />
                                    <p>Top 2</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/origami.svg")} />
                                    <p>Smart Mind</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/none.svg")} />
                                    <p>Motivator</p>
                                </AchivkaContainer>
                                <AchivkaContainer>
                                    <Achivka  src={require(".././achivments/none.svg")} />
                                    <p>Idol</p>
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
                        <ChartContainer>
                            <h4 style={{marginBottom: "20px"}}>Statistic chart</h4>
                        <LineChart  data={data} />
                            <PieChart data={[["Good looks", 10], ["Help me with task", 15],  ["Have many ideas", 5] ]}/>
                        </ChartContainer>
                    </ProfileList>
                </RightContent>
                <SideMenu stateMode={this.state.mode}
                          stateTheme={this.state.theme}

                />
            </div>
        );
    }
}



export default Profile;
