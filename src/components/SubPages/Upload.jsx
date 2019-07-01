import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Icon, Input, Checkbox, Select, Modal, Rate, Avatar} from 'antd';
import 'antd/dist/antd.css'; 
import sha1 from 'js-sha1';
import GoogleLogin from 'react-google-login';
import user from '../../objects/user';
import { Popconfirm, message } from 'antd';
import superagent from 'superagent';
import Consult from './Consult';

import { Upload } from 'antd';
const { Option } = Select;
const fileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];

const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  listType: 'picture',
  defaultFileList: [...fileList],
};

const props2 = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  listType: 'picture',
  defaultFileList: [...fileList],
  className: 'upload-list-inline',
};

export default class UploadPage extends React.Component{
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
    
    message = () =>{
      message.success("submit succeeded! waiting for administration's checking..")
    }
    
    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        const responseGoogle = (response) => {
            console.log(response);
          }
        const onSuccess = response => console.log(response);
        const onFailure = response => console.error(response);
        const selectBefore = (
            <Select defaultValue="Http://" style={{ width: 90 }}>
              <Option value="Http://">Http://</Option>
              <Option value="Https://">Https://</Option>
            </Select>
          );
          const selectAfter = (
            <Select defaultValue=".com" style={{ width: 80 }}>
              <Option value=".com">.com</Option>
              <Option value=".jp">.jp</Option>
              <Option value=".cn">.cn</Option>
              <Option value=".org">.org</Option>
            </Select>
          );
        return (
          <span style={{marginLeft:"0px"}}>
            <span onClick={this.showModal}>Upload Book</span>
            <Modal
              title={user.username+"'s msg"}
              width="580px"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
              footer={[
              ]}
            >
                <div style={{height: "100%", minHeight: "400px"}}>
                <div>
                    
                    <br />
                    <br />
                    <Upload {...props2}>
                    <Button>
                        <Icon type="upload" /> Upload
                    </Button>
                    </Upload>
                    <br/>
                    <div style={{ marginBottom: 16, margin:"20px" , textAlign:"center"}}>
                    <Input style={{ marginBottom: 16, margin:"20px" }} addonBefore={selectBefore} addonAfter={selectAfter} defaultValue="mysite" /><br />
                    <Input style={{ marginBottom: 16, margin:"20px" }} placeholder="book name" /><br />
                    <Input style={{ marginBottom: 16, margin:"20px" }} placeholder="book desc " /><br />
                    <Input style={{ marginBottom: 16, margin:"20px" }} placeholder="book price" /><br />
                    <Input style={{ marginBottom: 16, margin:"20px" }} placeholder="book author" />
                    <Button style={{float:"right"}} onClick={this.message}>Submit</Button>
                    </div>
                    
                </div>
                </div>
            </Modal>
          </span>
        );
      }
}
