import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../../main/Main'
import {POSTRquest} from '../../utils/httpRequest'
import {Button, Form, Icon, Input, Checkbox, Modal, Rate, Avatar} from 'antd';
import '../../css/LoginPage.css';
import 'antd/dist/antd.css'; 
import sha1 from 'js-sha1';
import GoogleLogin from 'react-google-login';
import Constants from '../../Constants';
import user from '../../objects/user';
import { Popconfirm, message } from 'antd';
import superagent from 'superagent';


function genAccount(userlist){
    var Favs = [];
    console.log(userlist.length)
    for(var i=0;i<userlist.length;i++){
        var element = (
            <div style={{padding: "20px"}}>
                <div style={{textAlign:"center"}}>
                <Avatar src={userlist[i]['avatar']} size={128}></Avatar>
                </div>
                <p><b><Icon type="user"></Icon>&nbsp;&nbsp;your name: </b>{userlist[i]['name']}</p>
                <p><b><Icon type="safety-certificate"></Icon>&nbsp;&nbsp;your id: </b>{userlist[i]['userid']}</p>
                <p><b><Icon type="dollar"></Icon>&nbsp;&nbsp;   your coins: </b>{userlist[i]['coins']}</p>
                <Button type="default" style={{margin: "10px"}}> change pwd</Button>
                <Button type="default" style={{margin: "10px"}}> charge coins</Button>
                <Button type="default" style={{margin: "10px"}}> address mgr</Button>
            </div>
        );
        Favs.push(element);
    }
    return Favs;
}

export default class AccountPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ModalText: 'Content of the modal',
            visible: false, 
            confirmLoading: false,
            ulist: [],
        };

    };

    queryBookDetail = () =>{
        if(user.username !== "GUEST"){
            let that = this
            var url = Constants.userConstants.get_user;
            var query = {username: user.username};
            superagent.get(url)
                .query(query)
                .end((err,res)=>{
                    var info =res.body.marketResBody.userlist;
                    // console.log(info);
                    if(info!==undefined && info!==null){
                        that.setState({
                           ulist: info
                        })
                        console.log(that.state.Fav);
                    }
                                
                })
        }
    }

    cancel=(e) =>{
        console.log(e);
        message.error('Cancelled');
    }

    handleOk = () =>{
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(()=>{
            this.setState({
            visible: false,
            confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
    };
    
    showModal = () =>{
        this.queryBookDetail();
        this.setState({
            visible:true,
        });
        // console.log(this.props.bookid)
    };
    
    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        const responseGoogle = (response) => {
            console.log(response);
          }
        const onSuccess = response => console.log(response);
        const onFailure = response => console.error(response);
        return (
          <span style={{marginLeft:"0px"}}>
            <span onClick={this.showModal} >Account</span>
            <Modal
              title={user.username+"'s Account"}
              width="500px"
              height="100%"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              footer={[
              ]}
            >
                <div style={{height: "100%"}}>
                    {genAccount(this.state.ulist)}
                </div>
            </Modal>
          </span>
        );
      }
}
