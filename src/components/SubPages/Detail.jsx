import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../../main/Main'
import {POSTRquest} from '../../utils/httpRequest'
import {Button, Form, Icon, Input, Checkbox, Modal, Rate,Switch} from 'antd';
import '../../css/LoginPage.css';
import 'antd/dist/antd.css'; 
import sha1 from 'js-sha1';
import GoogleLogin from 'react-google-login';
import Constants from '../../Constants';
import user from '../../objects/user';
import { Popconfirm, message } from 'antd';
import superagent from 'superagent';
import ConsultPage from './ConsultPage'
export default class DetailPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ModalText: 'Content of the modal',
            visible: false, 
            confirmLoading: false,
            isFav:false,
            isCart:false,
            bookInfo: {}
        };

    };

    queryBookDetail = ()=>{
        let that = this;
        var url = Constants.sysConstants.queryBook;
        var query = {owner: this.props.owner, id: this.props.bookid};
            superagent.get(url)
                .query(query)
                .end((err,res)=>{
                    var maxPage = parseInt(res.body.info/24) +1 ;
                    var temp = res.body.marketResBody;
                    if(temp!==undefined && temp!==null){
                        that.setState({bookInfo: temp.booklist[0]})
                    }
                                
                })
        if(user.username !== "GUEST"){

            url = Constants.userConstants.get_cart;
            query = {username: user.username};
            superagent.get(url)
                .query(query)
                .end((err,res)=>{
                    var info =res.body.info;
                    
                    if(info!==undefined && info!==null){
                        that.setState({
                            isCart: info.indexOf(this.props.bookid) !== -1,
                        })
                    }
                                
                })

            url = Constants.userConstants.get_fav;
            query = {username: user.username};
            superagent.get(url)
                .query(query)
                .end((err,res)=>{
                    var info =res.body.info;
                    
                    if(info!==undefined && info!==null){
                        that.setState({
                            isFav: info.indexOf(this.props.bookid) !== -1,
                        })
                    }
                                
                }) 
            }       
    }
    

    showModal = () =>{
        this.queryBookDetail();
        this.setState({
            visible:true,
        });
        console.log(this.props.bookid)
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

    handleBuy = () =>{
        if(user.username==="Guest"){
            alert("Guest! Pleast log in First!");
        }
        else{
            let that = this;
            var url = Constants.userConstants.buyBook;
            var query = {username: user.username, owner: this.props.owner, bookid: this.props.bookid, price: this.props.price};
                superagent.get(url)
                    .query(query)
                    .end((err,res)=>{
                        var count = parseInt(res.body.info);
                        if(count!==undefined && count!==null){
                            console.log(count)
                        }        
                    });
                message.success('success')
            }
        
    }

    handleCart =()=>{
        if(user.username==="Guest"){
            alert("Guest! Pleast log in First!");
        }
        else{
            var url = Constants.userConstants.add_cart;
            if(!this.state.isCart){
                url = Constants.userConstants.add_cart;
            }
            else{
                url = Constants.userConstants.r_cart;
            }
            let that = this;
            
            var query = {username: user.username, owner: this.props.owner, bookid: this.props.bookid};
                superagent.get(url)
                    .query(query)
                    .end((err,res)=>{
                        var count = parseInt(res.body.info);
                        if(count!==undefined && count!==null){
                            console.log(count)
                        }        
                    })
            }
    }

    handleFav =()=>{
        if(user.username==="Guest"){
            alert("Guest! Pleast log in First!");
        }
        else{
            let that = this;
            var url = Constants.userConstants.add_fav;
            if(!this.state.isFav){
                url = Constants.userConstants.add_fav;
            }
            else{
                url = Constants.userConstants.r_fav;
            }
            var query = {username: user.username, owner: this.props.owner, bookid: this.props.bookid};
                superagent.get(url)
                    .query(query)
                    .end((err,res)=>{
                        var count = parseInt(res.body.info);
                        if(count!==undefined && count!==null){
                            console.log(count)
                            console.log("a")
                        }        
                    })
            }
    }

    cancel=(e) =>{
        console.log(e);
        message.error('Cancelled');
      }
      
    
    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        const responseGoogle = (response) => {
            console.log(response);
          }
        const onSuccess = response => console.log(response);
        const onFailure = response => console.error(response);
        return (
          <span style={{marginLeft:"0px"}}>
            <Button icon="menu" shape="circle"  type="default"  onClick={this.showModal}>
              
            </Button>
            <Modal
              title={this.props.name}
              width="580px"
              visible={visible}
              onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
            //   style={{border: "0px white"}}
              footer={[
                  
                  <ConsultPage/>,
                  <Button type={this.state.isFav? "primary":"default"}  onClick={this.handleFav}><Icon type="star"/></Button>,
                  <Button type={this.state.isCart? "primary":"default"} onClick={this.handleCart} ><Icon type="shopping-cart"/></Button>,
                  <span style={{margin:"20px"}}>online/offline: <Switch defaultChecked/> </span>,
                  <Popconfirm
                        title="Are you sure buy this book?"
                        onConfirm={this.handleBuy}
                        onCancel={this.cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                  <Button type="primary"  >Buy It!</Button>
                  </Popconfirm>
              ]}
            >
                <div style={{height: "100%", minHeight: "400px"}}>
                    <div style={{float:"left", margin:"20px" , marginTop:"5px", maxWidth: "220px"}}>
                        <img src={this.props.cover} style={{maxHeight: "360px", width: "220px"}}/>
                    </div>
                    <div style={{float:"left", margin:"20px", marginTop:"5px", maxWidth: "220px"}}>
                        <h3><Icon type="book"/>&nbsp;&nbsp;BOOK INFO</h3>
                        <p><b>Description: </b>{this.props.desc}</p>
                        <p><b>Book ID: </b>{this.props.bookid}</p>
                        <p><b>Author: </b>{!this.state.bookInfo.hasOwnProperty('desc') ? 
                        null:Constants.toUnicode(this.state.bookInfo['author'])}</p>
                        <p><b>Pulication Time: </b>{this.state.bookInfo['publicationDate']}</p>
                        <h3><Icon type="contacts"/>&nbsp;&nbsp;SELLER INFO</h3>
                        <p><b>Owner: </b>{this.state.bookInfo['owner']}</p>
                        <p><b>Detail: </b><a href="http://www.dangdang.com/?">link</a></p>
                        <p><b>State: </b>{this.state.bookInfo['state']!==1.5 ? "for sale" : "on sale"}</p>
                        <p><b>Price: </b>{this.props.price}</p>
                        <p><b>Update Time: </b>{this.state.bookInfo['updateDate']}</p>
                        <p><b>Rate: </b>&nbsp;&nbsp;<Rate disabled defaultValue={Math.round(this.props.price / 9 )} /></p>
                    </div>
                </div>
            </Modal>
          </span>
        );
      }
}
