import { Layout, Menu, Avatar,Badge } from 'antd';
import React from 'react';
import 'antd/dist/antd.css'; 
import '../css/main.css';
import LoginPage from '../components/LoginPage';
import user from '../objects/user';
import Constants from '../Constants'
import { Dropdown, Icon } from 'antd';
import superagent from 'superagent';
import CartPage from './SubPages/Cart';
import FavPage from './SubPages/Fav';
import MsgPage from './SubPages/MessagePage';
import UploadPage from './SubPages/Upload'
import OrderPage from './SubPages/OrderView';
import AccountPage from './SubPages/Account';
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

function logout(){
    const url = Constants.userConstants['home'];
    user.username="Guest";
    window.location.href=url;
}


const menu = (
  <Menu 
    mode="horizontal"
    theme="dark"
    style={{ lineHeight: '64px', marginTop: '28px' }}>
        <Menu.Item key="00">
            <span>
                <Icon type='user' style={{marginRight: '5px'}}></Icon>
                <span><AccountPage/></span>
            </span>
        </Menu.Item>
        <Menu.Item key="11">
            <span>
            <Badge dot={user.unread > 0}>
                <Icon type='message' style={{marginRight: '5px'}}></Icon>
                <span><MsgPage/></span>
            </Badge>
            </span>
        </Menu.Item>
        <Menu.Item key="22">
            <span>
                <Icon type='heart' style={{marginRight: '5px'}}></Icon>
                <span><FavPage/></span>
            </span>
        </Menu.Item>
        <Menu.Item key="23">
            <span>
                <Icon type='shopping' style={{marginRight: '5px'}}></Icon>
                <span><UploadPage/></span>
            </span>
        </Menu.Item>
        <Menu.Item key="33">
            <span>
                <Icon type='bars' style={{marginRight: '5px'}}></Icon>
                <span><OrderPage/></span>
            </span>
        </Menu.Item>
        <Menu.Item key="44" onClick={logout}>
            <span>
                <Icon type='logout' style={{marginRight: '5px'}}></Icon>
                <span>Log out</span>
            </span>
        </Menu.Item>
  </Menu>
);

export default class AvatarMenu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cartNum: 0
        }
        this.updateCart();
    }
    
    updateCart=()=>{
        let that = this;
        setInterval(()=>{
            var url = Constants.userConstants.get_cart;
            var query = {username: user.username};
                superagent.get(url)
                    .query(query)
                    .end((err,res)=>{
                        var count = res.body.info;
                        if(count!==undefined && count!==null){
                            this.setState({
                                cartNum: count.split('bookid').length
                            })
                        }        
                    })
        },2000);
    }

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
                <Badge count={Math.max(0, this.state.cartNum-1)} >
                    <CartPage/>
                </Badge>
                <label style={{marginLeft: 10}}></label>
                </span>              
            </span>
          </div>
        );
    }
}