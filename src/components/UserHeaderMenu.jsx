import { Layout, Menu, Avatar,Badge } from 'antd';
import React from 'react';
import 'antd/dist/antd.css'; 
import '../css/main.css';
import LoginPage from '../components/LoginPage';
import user from '../objects/user';
import Constants from '../Constants'
import { Dropdown, Icon } from 'antd';
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;


const menu = (
  <Menu 
    mode="horizontal"
    theme="dark"
    style={{ lineHeight: '64px', marginTop: '28px' }}>
        <Menu.Item key="00">
            <span>
                <Icon type='user' style={{marginRight: '5px'}}></Icon>
                <span>Account</span>
            </span>
        </Menu.Item>
        <Menu.Item key="11">
            <span>
            <Badge dot={user.unread > 0}>
                <Icon type='message' style={{marginRight: '5px'}}></Icon>
                <span>Messages</span>
            </Badge>
            </span>
        </Menu.Item>
        <Menu.Item key="22">
            <span>
                <Icon type='heart' style={{marginRight: '5px'}}></Icon>
                <span>Favourites</span>
            </span>
        </Menu.Item>
        <Menu.Item key="33">
            <span>
                <Icon type='bars' style={{marginRight: '5px'}}></Icon>
                <span>Orders</span>
            </span>
        </Menu.Item>
        <Menu.Item key="44">
            <span>
                <Icon type='logout' style={{marginRight: '5px'}}></Icon>
                <span>Log out</span>
            </span>
        </Menu.Item>
  </Menu>
);

export default class AvatarMenu extends React.Component{
    render(){
        return(
            <div>
            <span style={{ marginRight:24, cursor:"pointer"}}>
            <Dropdown overlay={menu} style={{cursor:"pointer"}}>
                <span>
                <label style={{marginTop: 60, marginLeft: 20}}>Hello, </label>
                <Badge dot={user.unread > 0}>
                <label style={{color: "#FFF", fontSize: "15px"}}><em>{user.username}</em></label>
                </Badge>
                </span>
            </Dropdown>
            </span>
            <span style={{ marginRight: 24}}>
                <span>
                <Badge count={1} >
                    <Avatar style={{cursor:"pointer"}} size={36} shape="circle" src={Constants.pictureUrl['shopping-cart']}/>
                </Badge>
                <label style={{marginLeft: 10}}></label>
                </span>              
            </span>
          </div>
        );
    }
}