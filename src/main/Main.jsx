import { Layout, Menu, Breadcrumb, Icon, Input } from 'antd';
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
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

export default class Main extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
          location: "中国,浙江省,杭州市,西湖区",
          location_lat: 34,
          location_lng: 120
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
                        console.log("a") 
                        console.log(that.state.location_lng); 
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
                     console.log(msg)
                     console.log(dd)
                }
            ) 
        }else{
            console.log('error')
        }        
    };
    
    render(){
        return (
            <Layout id="main-layout">
                <Header>
                <div id="main-logo" />
                <Menu mode="horizontal"
                    theme="dark"
                    defaultSelectedKeys={['1']}
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
                        <Menu.Item key="2">General</Menu.Item>
                        <Menu.Item key="3">Professional</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="Others">
                        <Menu.Item key="4">Fictions</Menu.Item>
                        <Menu.Item key="5">Tools</Menu.Item>
                    </Menu.ItemGroup>
                    </SubMenu>
                    <Menu.Item key="17">
                        <span className="submenu-title-wrapper">
                                <Icon type="shop"/>
                                Today's Deals
                        </span>
                    </Menu.Item>
                    <Menu.Item disabled>
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ paddingLeft:"10px", width: "500px" }}
                        />
                    </Menu.Item>
                    <Menu.Item style={{float: "right",   paddingRight: "40px"}} disabled>
                        { user.getState() == Constants.userConstants['no_logged'] ? <span><LoginPage/><RegistryPage/></span> : <AvartarMenu/>   }
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
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: "500px", height: "100%"}}>Content</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}