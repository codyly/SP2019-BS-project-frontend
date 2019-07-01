import { Layout, Menu, Breadcrumb, Icon, Input, Button } from 'antd';
import React from 'react';
import 'antd/dist/antd.css'; 
import '../css/main.css';
import LoginPage from '../components/LoginPage';
import user from '../objects/user';
import Constants from '../Constants'
import AvartarMenu from '../components/UserHeaderMenu';
import RegistryPage from '../components/RegistryPage';
import superagent from 'superagent';
import jsonp from 'superagent-jsonp';
import {
    Route,
    Link,
    NavLink,
    Redirect
  } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import MarketPage from '../components/SubPages/Market';
// import { BrowserHistory } from 'react-router'

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;



export default class Main extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
          location: "中国,浙江省,杭州市,西湖区",
          location_lat: 34,
          location_lng: 120,
          logged: 0,
          cartNum: 0
        }
    }

    componentDidMount() {
        let that = this;
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {  
                    var longitude = position.coords.longitude;  
                    var latitude = position.coords.latitude;  
                    if(longitude !== null && longitude !==undefined){
                        that.setState({location_lng: longitude, location_lat: latitude});
                        superagent.get('https://apis.map.qq.com/ws/geocoder/v1/')
                        .use(jsonp({timeout: 1000}))
                        .query({location:that.state.location_lat+','+that.state.location_lng,key:'4DXBZ-4UTK3-HEW32-3R2XX-ZDTJQ-GNFN7'})
                        .query({output: 'jsonp'})
                        .end((err,res)=>{
                            console.log(res)
                            const temp = res.body['result']['ad_info']['name'];
                            if(temp!==undefined && temp!==null){
                                user.location = temp;
                                that.setState({location: user.location})
                            }
                            
                    })       
                    }
                },
                    function (e) {
                     var msg = e.code;
                     var dd = e.message;
                    //  console.log(msg)
                    //  console.log(dd)
                }
            ) 
        }else{
            console.log('error')
        }
        this.setState({logged: user.getState()});        
    };

    updateCartNum = (cartnum)=>{
        this.setState({
            cartNum: cartnum
        });
    }

    handleSearch = (value) =>{
        this.setState({
            searchValue: value
        })
    };

    getMode = () =>{
        var text = "";
        if(document.getElementById('searching-bar')){
            text += document.getElementById('searching-bar').value;
            
        }
        // console.log('2&'+text);
        return '2&'+text;
    };
    
    render(){
        return (
            <BrowserRouter>
            <Redirect path="/" exact={true} to={{ pathname: '/market', mode: '0'}}/>
            <Layout id="main-layout">
                <Header>
                <div id="main-logo" />
                <Menu mode="horizontal"
                    theme="dark"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <SubMenu
                        defaultSelectedKeys={['0']}
                        style={{overflowY: 'auto'}}
                        key="1"
                        title={
                            <span className="submenu-title-wrapper">
                                <Icon type="book"/>
                                Categories
                            </span>
                        }>
                   
                   <Menu.ItemGroup title="TextBook">
                        <Menu.Item key="2">All
                        <Link to={{ pathname: '/market', mode: '0'}}></Link>
                        </Menu.Item>
                        <Menu.Item key="3">Professional
                        <NavLink to={{ pathname: '/market', mode: "2&professional"}} style={{textAlign:"center", width:"100%"}}></NavLink>
                        </Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="Others">
                        <Menu.Item key="4">Fictions
                        <NavLink to={{ pathname: '/market', mode: "2&fiction"}} style={{textAlign:"center", width:"100%"}}></NavLink>
                        </Menu.Item>
                        <Menu.Item key="5">Tools
                        <NavLink to={{ pathname: '/market', mode: "2&tool"}} style={{textAlign:"center", width:"100%"}}></NavLink>
                        </Menu.Item>
                    </Menu.ItemGroup>
                    </SubMenu>
                    <Menu.Item key="17">
                        <span className="submenu-title-wrapper">
                                <Icon type="shop"/>
                                Today's Deals
                        </span>
                        <NavLink to={{ pathname: '/market', mode: "3"}} style={{textAlign:"center", width:"100%"}}></NavLink>
                    </Menu.Item>
                    <Menu.Item>
                    
                    <Search
                        id="searching-bar"
                        placeholder="input search text"
                        enterButton={ <NavLink to={{ pathname: '/market', mode: this.getMode()}} style={{textAlign:"center", width:"100%"}}>
                            <Icon type="search"/></NavLink>}
                        onSearch={this.handleSearch}
                        style={{ paddingLeft:"10px", paddingTop: "15px", width: "500px" }}
                        />
                    </Menu.Item>
                    <Menu.Item style={{float: "right",   paddingRight: "40px"}} disabled>
                        { this.state.logged === Constants.userConstants['no_logged'] ? <span><LoginPage/><RegistryPage/></span> : <AvartarMenu cartNum={this.state.cartNum}/>   }
                    </Menu.Item>
                    <SubMenu 
                        style={{
                            marginBottom: "-2px"
                        }}
                        title={
                        <span>
                        <Icon type="environment"/>
                        <label style={{fontSize: "12px"}}>{this.state.location}</label>
                        </span>
                        }>

                        </SubMenu>
                </Menu>
                </Header>
                <Content style={{ padding: '0 50px'}} id="main-content">
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>bookStore</Breadcrumb.Item>
                    <Breadcrumb.Item>Market</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: "100%", height: "100%"}}>
                    <Route path='/market' exact component={MarketPage}></Route>
                </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
            </BrowserRouter>
        );
    }
}