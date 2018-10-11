import React, {Component} from 'react';
import {TopMenuContainer, MenuContainer,  MenuItem, MenuLink, SideMenu} from './community'
import styled from 'styled-components'
import reqwest from 'reqwest';
import { List, Avatar, Button, Skeleton, Select } from 'antd';
import axios from "axios";
import PeopleList from './people_list'
import {backUrl} from '../App'



const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}



export const RightContent = styled.div`
 width: 100%;
 height: 800px;
 position: absolute;
 left:0;
 padding-left: 256px;
 top: 50px;
 display: flex;
 flex-direction: column;
 justify-content: flex-start;
 align-items: center;
`;






class Rating extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode: 'inline',
            theme: 'light',
            initLoading: true,
            loading: false,
            data: [],
            list: [],
            likeSelectOpen: false,
            dislikeSelectOpen: false,
            avatarUrl: '',
        };
    }


    componentDidMount() {
        // this.getData((res) => {
        //     this.setState({
        //         initLoading: false,
        //         data: res.results,
        //         list: res.results,
        //     });
        //     console.log(res)
        // });


        axios.get(`${backUrl}/api/user/all?_token=${localStorage.getItem('token')}`)
            .then( (response) => {
                // handle success
                console.log(response);
                this.setState({
                            initLoading: false,
                            data: response.data.data.users,
                            list: response.data.data.users,

                        });

            })
            .catch( (error) => {
                // handle error
                console.log(error);
            });

    };

    getData = (callback) => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                callback(res);
            },
        });
    };

    onLoadMore = () => {
        this.setState({
            loading: true,
            list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
        });
        this.getData((res) => {
            const data = this.state.data.concat(res.results);
            this.setState({
                data,
                list: data,
                loading: false,
            }, () => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
        });
    };

    render() {
        const { initLoading, loading, list } = this.state;
        const loadMore = !initLoading && !loading ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
            </div>
        ) : null;




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
                    <PeopleList likeSelectOpen={this.state.likeSelectOpen}   initLoading={initLoading}  loadMore={loadMore}  list={list}/>
                </RightContent>
                <SideMenu stateMode={this.state.mode}
                          stateTheme={this.state.theme}
                          style={{zIndex: 10}}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                           />
            </div>
        );
    }
}


export default Rating;
