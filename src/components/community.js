import React, {Component} from 'react';
import styled from 'styled-components'
import { Menu, Icon, Switch } from 'antd';
import { NavLink} from "react-router-dom"
const { SubMenu } = Menu;


export const TopMenuContainer = styled.div`
 background-color: #1e1e1e;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
export const MenuContainer = styled.ul`
  display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    margin-bottom: 0;
`;
export const MenuItem = styled.li`
   padding-left: 25px;
    padding-right: 25px;
`;
export const MenuLink = styled.a`
 color: white;
    font-size: 16px;
    text-decoration: none;
`;

export const SideMenu = (props) =>(
    <Menu
        style={{ width: 256, zIndex: 5 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={props.stateMode}
        theme={props.stateTheme}
    >
        <Menu.Item key="1">
            <Icon type="solution" />

            Profile
            <NavLink to={`/profile`}/>
        </Menu.Item>
        <Menu.Item key="2">
            <Icon type="team" />
            Rating
            <NavLink to={`/rating`}/>
        </Menu.Item>
        <Menu.Item key="3">
            <Icon type="bar-chart" />
            Company State
            <NavLink to={`/state`}/>

        </Menu.Item>
        <Menu.Item key="5">
            <Icon type="fire" />
            Help tasks
            <NavLink to={'/help'}/>
        </Menu.Item>
        <Menu.Item key="6">
            <Icon type="calendar" />
             Calendar
            <NavLink to={'/calendar'}/>
        </Menu.Item>
        <SubMenu key="sub2" title={<span><Icon type="setting" /><span>Settings</span></span>}>
            <Menu.Item key='8'>
                <Icon type="book" /> My Information <NavLink to={'/myinfo'}/>
            </Menu.Item>
            <Menu.Item key="7" onClick={()=>{localStorage.clear()}}>
                <Icon type="logout" /> Log Out <NavLink to={'/'}/>
            </Menu.Item>


        </SubMenu>

    </Menu>
);


class Community extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'inline',
            theme: 'light',
        };
    }






    render() {
        return (
            <div>
                <TopMenuContainer>
                    <MenuContainer>
                        <MenuItem><MenuLink>Business</MenuLink></MenuItem>
                        <MenuItem><MenuLink>Features</MenuLink></MenuItem>
                        <MenuItem><MenuLink>Prising</MenuLink></MenuItem>
                        <MenuItem><MenuLink>About Us</MenuLink></MenuItem>
                    </MenuContainer>
                </TopMenuContainer>
                <div>
                  <SideMenu stateMode={this.state.mode} stateTheme={this.state.theme}/>
                </div>
            </div>
        );
    }
}




export default Community;
