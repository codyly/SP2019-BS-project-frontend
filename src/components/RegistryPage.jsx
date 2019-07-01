import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Icon, Input, Checkbox, Modal, message} from 'antd';
import {Col, Row, Card} from 'antd';
import '../css/LoginPage.css';
import 'antd/dist/antd.css'; 
import sha1 from 'js-sha1';
import GoogleLogin from 'react-google-login';
import GitHubLogin from 'react-github-login';
import Constants from '../Constants';
import { POSTRquest } from '../utils/httpRequest';
import { Route, Redirect } from 'react-router'
import user from '../objects/user';
import App from '../App';
import Main from '../main/Main';
class LoginInfo{
    static values = "";
};

function registryFeedback(str){
    if(str['stateCode'] === 0){
        ReactDOM.render(<Main />, document.getElementById('root'));
    }
}


export class RegistryForm extends React.Component{
    
    handleSubmit = e =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) =>{
            if(!err){
                if(values['password'].length < 6){
                    message.error("password must be longer than 6")
                    return;
                }
                else if(values['confirm']!==values['password']){
                    message.error("confirm password not matched") 
                    return;
                }
                else if(values['email'].indexOf('@')===-1){
                    message.error("error email form") 
                    return;
                }
                values['confirm'] = window.btoa(sha1(values['confirm']));
                values['password'] = window.btoa(sha1(values['password']));
                if(1){
                    var data = {
                        name: values['username'],
                        pwd:  values['password'],
                        email: values['email']
                    }
                    var url = Constants.userConstants['reg_url'];
                    console.log(data);
                    POSTRquest(url, data, registryFeedback);
                    LoginInfo.values = values;
                    console.log('Received values of form: ', values);
                }
            }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const element =  (
        <Form onSubmit={this.handleSubmit} id="login-form">
            <Form.Item>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
            })(
                <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
                />,
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
            })(
                <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                />,
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('confirm', {
                rules: [{ required: true, message: 'Please confirm your Password!' }],
            })(
                <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Confirm password"
                />,
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your Email!' }],
            })(
                <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
                />,
            )}
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" id="login-form-button">
                Sign up
            </Button>
            </Form.Item>
        </Form>
        );
        return element;
    }
}

export default class RegistryPage extends React.Component{
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    };

    showModal = () =>{
        this.setState({
            visible:true,
        });
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
    
    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        const WrappedNormalLoginForm = Form.create({ name: 'Login_Form' })(RegistryForm);
        const responseGoogle = (response) => {
            console.log(response);
          }
        const onSuccess = response => console.log(response);
        const onFailure = response => console.error(response);
        return (
          <span>
            <Button type="default" ghost onClick={this.showModal}>
              Sign up
            </Button>
            <Modal
              title="Registry"
              width="360px"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              style={{border: "0px white"}}
              footer={[<div id="reg-banner">
                  <img src={Constants.pictureUrl['welcome-banner']}></img>
              </div>]}
            >
            <WrappedNormalLoginForm/>
            </Modal>
          </span>
        );
      }
}
