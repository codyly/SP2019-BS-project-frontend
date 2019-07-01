import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Icon, Input, Checkbox, Modal, Rate, Avatar} from 'antd';
import 'antd/dist/antd.css'; 
import sha1 from 'js-sha1';
import GoogleLogin from 'react-google-login';
import user from '../../objects/user';
import { Popconfirm, message } from 'antd';
import superagent from 'superagent';
import Consult from './Consult';


export default class ConsultPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ModalText: 'Content of the modal',
            visible: false, 
            confirmLoading: false,
            cart: ""
        };

    };

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
            <Button type="default" style={{margin:"20px"}}onClick={this.showModal}>Consult</Button> 
            <Modal
              title={user.username+"'s Consult"}
              width="580px"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              footer={[
              ]}
            >
                <div style={{height: "100%", minHeight: "400px"}}>
                    <Consult/>
                </div>
            </Modal>
          </span>
        );
      }
}
