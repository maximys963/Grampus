import React, {Component} from 'react';
import styled from 'styled-components';
import {TopMenuContainer, MenuContainer,  MenuItem, MenuLink, SideMenu, } from './community'
import {RightContent} from "./rating";
import { Avatar, Calendar, Badge } from 'antd';
import axios from 'axios';
import {Redirected} from 'react-router-dom'
import {backUrl} from '../App'



function getListData(value) {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'Meeting.' },
                { type: 'success', content: 'Mom Birthday.' },
            ]; break;
        case 10:
            listData = [
                { type: 'warning', content: 'Metting.' },
                { type: 'success', content: 'Watch football.' },
                { type: 'error', content: 'Work out.' },
            ]; break;
        case 15:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'Styding english.' },
                { type: 'error', content: 'paly games.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
            ]; break;
        default:
    }
    return listData || [];
}


function dateCellRender(value) {
    const listData = getListData(value);
    return (
        <ul className="events">
            {
                listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))
            }
        </ul>
    );
}

function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}

function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}

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

class SmartCalendar extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode: 'inline',
            theme: 'light',




        };

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

                        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender}/>


                </RightContent>
                <SideMenu stateMode={this.state.mode}
                          stateTheme={this.state.theme}

                />
            </div>
        );
    }
}




export default SmartCalendar;
