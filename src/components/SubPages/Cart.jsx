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


function genCart(cartlist){
    var carts = [];
    console.log(cartlist.length)
    for(var i=0;i<cartlist.length;i++){
        var element = (
            <div style={{border: "1.5px dashed", padding: "20px"}}>
                <p><b>book id: </b>{cartlist[i]['bookid']}</p>
                <p><b>seller name: </b>{cartlist[i]['owner']}</p>
                <span style={{float: "right"}}>
                <Button style={{marginRight:"20px", color: "red"}}icon="close"  type="default">cancel</Button>
                </span>
            </div>
        );
        carts.push(element);
    }
    return carts;
}

export default class CartPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ModalText: 'Content of the modal',
            visible: false, 
            confirmLoading: false,
            cart: ""
        };

    };

    queryBookDetail = () =>{
        if(user.username !== "GUEST"){
            let that = this
            var url = Constants.userConstants.get_cart;
            var query = {username: user.username};
            superagent.get(url)
                .query(query)
                .end((err,res)=>{
                    var info =res.body.info;
                    console.log(info);
                    if(info!==undefined && info!==null){
                        that.setState({
                           cart: eval('(' + info + ')')
                        })
                        console.log(that.state.cart);
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
            <Avatar style={{cursor:"pointer"}} size={36} shape="circle" ghost onClick={this.showModal} src={Constants.pictureUrl['shopping-cart']}/>
            
            <Modal
              title={user.username+"'s Shopping Cart"}
              width="580px"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              footer={[
              ]}
            >
                <div style={{height: "100%", minHeight: "400px"}}>
                    {genCart(this.state.cart)}
                </div>
            </Modal>
          </span>
        );
      }
}
