import React, {Component} from 'react';
import {TopMenuContainer, MenuContainer,  MenuItem, MenuLink, SideMenu} from './community'
import styled from 'styled-components';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Highcharts from 'highcharts'

ReactChartkick.addAdapter(Highcharts);


const TopGraphicContainer = styled.div`
 width: 100%;
 height: 800px;
 position: absolute;
 left:0;
 padding-left: 256px;
 top: 50px;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
`;

class CompanyState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'inline',
            theme: 'light',
        };
    }
    render() {
const data = [
    {"name":"Likes", "data": {"2017-05-13": 5, "2017-05-14": 9, "2017-05-15": 2, "2017-05-16": 1, "2017-05-17": 4, "2017-05-18": 12, "2017-05-19": 9, "2017-05-20": 3,}},
    {"name":"Dislikes", "data": {"2017-05-13": 2, "2017-05-14": 5, "2017-05-15": 2, "2017-05-16": 8, "2017-05-17": 7, "2017-05-18": 14, "2017-05-19": 5, "2017-05-20": 0,}}
];

        return (
            <div>
                <TopMenuContainer >
                    <MenuContainer>
                        <MenuItem><MenuLink>Business</MenuLink></MenuItem>
                        <MenuItem><MenuLink>Features</MenuLink></MenuItem>
                        <MenuItem><MenuLink>Prising</MenuLink></MenuItem>
                        <MenuItem><MenuLink>About Us</MenuLink></MenuItem>
                    </MenuContainer>
                </TopMenuContainer>
                <SideMenu stateMode={this.state.mode} stateTheme={this.state.theme}/>
                <TopGraphicContainer style={{zIndex: -1}}>
                    <h3>Good Trends</h3>
                    <PieChart data={[["Good looks", 10], ["Attantive to deadlines", 7], ["Help me with task", 31], ["Always arrive in time", 5] , ["Have many ideas", 25], ["Inspire me", 22]   ]} />
                    <br/>
                    <h3>Bad Trends</h3>
                    <br/>
                    <PieChart data={[["Joke stupidly", 22], ["Bad temperament", 5], ["Dismotivate me", 31], ["Deadline killer", 31] , ["Rude person", 7], ["Pessimist", 10]   ]} />
                </TopGraphicContainer>




            </div>
        );
    }
}

export default CompanyState;
