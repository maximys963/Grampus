import React, {Component} from 'react';

import styled from 'styled-components'
import reqwest from 'reqwest';
import { List, Avatar, Button, Badge, Skeleton, Select, Alert } from 'antd';
import axios from "axios"
import {Redirect} from 'react-router-dom'

import {backUrl} from '../App'
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
const Option = Select.Option;


const PeopleContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
 align-items: flex-end;
`;
const Like = styled.div`
color: #57dd49
`;
const Dislike = styled.div`
color: #f63a3a
`;



class PeopleList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            likeSelectOpen: false,
            dislikeSelectOpen: false,
            categoriesList: [],
            badcategoriesList: [],
            likeLink: '',
            dislikeLink: '',
            hide: true,
            dishide: true,
            error: '',
            visible: true,
            redirected: false,

        };
    }

    handleClose = () => {
        this.setState({ visible: false });
    };

    getSelectedElement = (e) => {

        console.log(e.nameID);
    };


    componentDidMount (){
        axios.get(`${backUrl}/api/category/all?_token=${localStorage.getItem('token')}`)
            .then( (response) => {
                // handle success
                console.log(response.data.data.categories);
                this.setState({
                    categoriesList: response.data.data.categories,
                })
            });


        axios.get(`${backUrl}/api/category/all?_token=${localStorage.getItem('token')}&type=1`)
            .then( (response) => {
                // handle success
                console.log(response.data.data.categories);
                this.setState({
                    badcategoriesList: response.data.data.categories,
                })
            });

    }
    render(){
        if (this.state.redirected === true) {
            return <Redirect to='/profileoutsider' />
        }
        const styles = {
            display: this.state.hide ? 'none' : 'display',
            width: 200,
        };
        const dis_styles = {
            display: this.state.dishide ? 'none' : 'display',
            width: 200,
        };
        return(
            <div>
                {this.state.error ? <Alert
                message={this.state.error}
                type="error"
                closable
                afterClose={this.handleClose}
            /> : null }
            <List
                className="demo-loadmore-list"
                loading={this.props.initLoading}
                itemLayout="horizontal"
                dataSource={this.props.list}
                renderItem={(item, index) => (
                    <PeopleContainer id={index} style={{ width: "700px" }} >
                        <List.Item style={{ width: "700px" }}  actions={[
                            <Like onClick={(e)=>{
                                localStorage.setItem('userid', item.id);
                                const tnode = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[1];
                                console.log(item.id);
                                this.setState({
                                    likeLink: tnode.style.display,
                                });
                                if(this.state.dislikeSelectOpen){
                                    e.target.parentNode.parentNode.parentNode.parentNode.childNodes[2].style.display = 'none';
                                    this.setState({
                                        dislikeSelectOpen: !this.state.dislikeSelectOpen,


                                    });
                                }
                                if(this.state.likeSelectOpen){
                                    tnode.style.display = 'none';
                                    this.setState({
                                        likeSelectOpen: !this.state.likeSelectOpen,
                                        hide: true
                                    })

                                }else{
                                    tnode.style.display = 'block';
                                    this.setState({
                                        likeSelectOpen: !this.state.likeSelectOpen,
                                        hide: false
                                    });
                                }

                            }}>Like<Badge count={item.has_likes_count.toString() } style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} /></Like>,
                            <Dislike onClick={(e)=>{
                                localStorage.setItem('userid', item.id);
                                const tnode = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[2];
                                if(this.state.likeSelectOpen){
                                    e.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].style.display = 'none';
                                    this.setState({
                                        likeSelectOpen: !this.state.likeSelectOpen
                                    });

                                }
                                if(this.state.dislikeSelectOpen){
                                    tnode.style.display = 'none';

                                    this.setState({
                                        dislikeSelectOpen: !this.state.dislikeSelectOpen,
                                        dishide: true
                                    })

                                }else{
                                    tnode.style.display = 'block';
                                    console.log(this.state.dislikeSelectOpen);
                                    this.setState({
                                        dislikeSelectOpen: !this.state.dislikeSelectOpen,
                                        dishide: false
                                    });
                                }

                            }} >Dislike<Badge count={item.has_dis_likes_count} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} /></Dislike>]}>
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar size={64} src={item.avatar_url} />}
                                    title={<a onClick={
                                        ()=>{
                                            console.log("clicked");
                                            console.log(item.name);
                                            localStorage.setItem('othername', item.name);
                                            localStorage.setItem('otherid', item.id);
                                            this.setState({
                                                redirected: true
                                            })


                                        }
                                    } >{item.name}</a>}
                                    description={item.position}
                                />
                            </Skeleton>
                        </List.Item>
                        <Select
                            id="1"
                            showSearch
                            style={styles}
                            placeholder="Select a reason"
                            optionFilterProp="children"
                            onChange={this.props.onChange}
                            onFocus={this.props.onFocus}
                            onBlur={this.props.onBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                this.state.categoriesList.map((elem, index )=>(
                                    <Option key={index} value={elem.id} onClick={(e)=>{
                                        console.log(e.key);
                                        let userID = localStorage.getItem('userid');
                                        localStorage.setItem('userid', null);
                                        axios.post(`${backUrl}/api/like/do`,{
                                            user_id: userID,
                                            status: 1,
                                            category: e.key,
                                            _token: localStorage.getItem('token'),
                                        })
                                            .then( (response) => {
                                                // handle success
                                                console.log(response);

                                            })
                                            .catch( (error) => {
                                                this.setState({
                                                    error: error.response.data.error
                                                })
                                            });
                                        this.setState({
                                            hide: true,
                                        })



                                    }

                                    }>{elem.name}</Option>
                                ))
                            }
                        </Select>

                        <Select id="2"
                                showSearch
                                style={dis_styles}
                                placeholder="Select a reason"
                                optionFilterProp="children"
                                onChange={this.props.onChange}
                                onFocus={this.props.onFocus}
                                onBlur={this.props.onBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                this.state.badcategoriesList.map((elem, index )=>(
                                    <Option key={index} value={elem.id} onClick={(e)=>{
                                        console.log(e.key);
                                        let userID = localStorage.getItem('userid');
                                        console.log(userID);
                                        localStorage.setItem('userid', null);
                                        axios.post(`${backUrl}/api/like/do`,{
                                            user_id: userID,
                                            status: -1,
                                            category: e.key,
                                            _token: localStorage.getItem('token'),
                                        })
                                            .then( (response) => {
                                                // handle success
                                                console.log(response);

                                            })
                                            .catch( (error) => {
                                                this.setState({
                                                    error: error.response.data.error
                                                })
                                                }
                                                // handle error

                                            );

                                        this.setState({
                                            dishide: true,
                                        })


                                    }

                                    }>{elem.name}</Option>
                                ))
                            }

                        </Select>
                    </PeopleContainer>

                )}
            />
            </div>
        )
    }
}

export default PeopleList