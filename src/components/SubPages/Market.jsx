import { Layout, Menu, Row, Col, Input, Card, Icon } from 'antd';
import React from 'react';
import 'antd/dist/antd.css'; 
import '../../css/main.css';
import user from '../../objects/user';
import superagent from 'superagent';
import jsonp from 'superagent-jsonp';
import { Pagination } from 'antd';
import {
    // BrowserRouter as Router,
    Route,
    // Switch,
    Link,
    NavLink,
    Redirect
  } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import { GETRequest, URLParam } from '../../utils/httpRequest';
import Constants from '../../Constants';
import { tmpdir } from 'os';
import LoginPage from '../LoginPage';
import DetailPage from './Detail';
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;
const { Meta } = Card;

function genBookCard(bookNode, id){
    var name, cover, desc, price, state;
    if(!bookNode.hasOwnProperty('name')){
        name = "unknown";
    }
    else{
        name = Constants.toUnicode(bookNode.name).split("%").join("");
    }

    if(!bookNode.hasOwnProperty('baseCover')){
        cover = Constants.pictureUrl["unload-cover"];
    }
    else{
        cover = Constants.toUnicode(bookNode.baseCover);
    }

    if(!bookNode.hasOwnProperty('desc') || bookNode.desc === null || bookNode.desc === undefined){
        desc = "unknown";
    }
    else{
        desc = bookNode.desc;
        desc = desc.split("[").join("");
        desc = desc.split("]").join("");
        desc = desc.split("'").join("");
        if(desc === null || desc === undefined){
            desc = "description";
        }else{
            // console.log(desc)
            desc = Constants.toUnicode(desc).split("%").join("");
        }
    }

    if(!bookNode.hasOwnProperty('price')){
        price = -1;
    }
    else{
        price = Math.round((bookNode.price+Constants.sysConstants.basicPrice)*100)/100;
    }

    state = bookNode.state;

    var element = (
        <Col key={id} span={24}>
        <Card
            id={"marketCard_"+id}
            hoverable
            style={{ width: 200, height: 408, float: "left", margin:"20px", overflow: "hidden"}}
            cover={<span className="cover-bg" style={{marginTop:"20px"}}><img alt="cover" height="220px" src={cover} /></span>}
        >
            <Meta title={<p>{name}</p>} description={<div style={{height:"60px", marginTop: "-20px", marginBottom: "20px"}}>
                <span>{desc}</span><br></br></div>}/>
            <span style={{marginLeft: state === 1.5? "-70px":"-80px", paddingBottom: "40px"}}>
                <DetailPage bookid={bookNode.bookid} owner={bookNode.owner} price={price} desc={desc} name={name} cover={cover}/></span>
                
            <span style={{float: "right", marginBottom: state === 1.5? "30px":"0px", color: state === 1.5? "red":"orange",
                fontSize: state === 1.5? "20px":"16px",}}><Icon type="dollar"></Icon>&nbsp;&nbsp;{price}</span>
            
        </Card>
        </Col>
    );
    return (element);

}

function genMarketCards(booklist, start, row_num){
    var CardList = [];
    for(var i=start; i<row_num+start && i<booklist.length; i++){
        // console.log(booklist[i]);
        CardList.push(genBookCard(booklist[i], i));

    }
    return (<Row>{CardList}</Row>);

}

export default class MarketPage extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
          currentPage: 0,
          currentBooks:[],
          currentOwner:[],
          maxPage: 20,
          mode: '0&',
          arguments: "default",
          loading: 0
        }
    }

    componentDidMount() {
        var pageNumber = 1;
            let that = this;
            var url = "";
            var modeNum = this.state.mode.split("&")[0];
            var cate = this.state.mode.split("&")[1];
            var query = {};
            // console.log(modeNum)
            if(modeNum ==='0'){
                url=Constants.sysConstants['queryMarket'];
                query = {page: (pageNumber-1).toString()};
            }
            else if(modeNum === '2'){
                url=Constants.sysConstants['queryCategory'];
                query = {page: (pageNumber-1).toString(), category: cate};
            }
            else if(modeNum === '3'){
                url=Constants.sysConstants['queryToday'];
                query = {page: (pageNumber-1).toString()};
            }
            else{
                url=Constants.sysConstants['queryMarket'];
            }
            // console.log('Page: ', pageNumber-1);
            superagent.get(url)
                .query(query)
                .end((err,res)=>{
                    var maxPage = parseInt(res.body.info/24) +1 ;
                    var temp = res.body.marketResBody;
                    if(temp!==undefined && temp!==null){
                            that.setState({currentPage: 0, 
                                        currentBooks: temp.booklist,
                                        currentOwner: temp.userlist,
                                        maxPage: maxPage}, this.handlePageChange(pageNumber))
                    }
                                
                })

    };

    handlePageChange = (pageNumber) =>{
        if(this.props.location.mode){
            
            let that = this;
            var url = "";
            var modeNum = this.state.mode.split("&")[0];
            var cate = this.state.mode.split("&")[1];
            var query = {};
            console.log(modeNum)
            if(modeNum ==='0'){
                url=Constants.sysConstants['queryMarket'];
                query = {page: (pageNumber-1).toString()};
            }
            else if(modeNum === '2'){
                url=Constants.sysConstants['queryCategory'];
                query = {page: (pageNumber-1).toString(), category: cate};
            }
            else if(modeNum === '3'){
                url=Constants.sysConstants['queryToday'];
                query = {page: (pageNumber-1).toString()};
            }
            else{
                url=Constants.sysConstants['queryMarket'];
            }
            // console.log('Page: ', pageNumber-1);
            superagent.get(url)
                .query(query)
                .end((err,res)=>{
                    var maxPage = parseInt(res.body.info/24) + 1 ;
                    var temp = res.body.marketResBody;
                    if(temp!==undefined && temp!==null){
                            that.setState({currentPage: 0, 
                                        currentBooks: temp.booklist,
                                        currentOwner: temp.userlist,
                                        maxPage: maxPage})
                    }
                                
                })
        }
              
    };

    loading = () => {
        // console.log(this.props.location.mode) 
        // setTimeout(()=>{
        //     console.log(this.props.location.mode);
        // },1000);
        if(this.props.location.mode){
            // this.setState({
            //     mode: this.props.location.mode,
            // },()=>{
            //     console.log(this.state.mode);
            //     this.handlePageChange(this.state.currentPage + 1);
            // } )
            this.setState({
                mode: this.props.location.mode,
                currentPage: 0,
                loading: 1
            },()=>{
                console.log(this.state.mode);
                this.handlePageChange(this.state.currentPage + 1);
            } )
            // console.log(this.props.location.mode);/
            setTimeout(()=>{
                this.setState({
                    loading: 0
                })
            },1000);   
        }
        return (
            <Icon type="loading"/>
        );
    };

    render(){
        // var element = genMarketCards(this.state.currentBooks, 0, 20)
        return (<div className="subpage-container">

                    <div style={{width:"100%", float: "none"}}>
                        <div style={{textAlign: "center", fontSize: "32px"}}>
                            {this.props.location.mode === this.state.mode ? null:this.loading()}
                            {this.state.loading === 1 ? <Icon type="loading"/> : null}
                        </div>
                        <div className="Card-container" style={{textAlign: "center"}}>
                            {genMarketCards(this.state.currentBooks, 0, 24)}
                        </div>
                    </div>
                    <br></br>
                    <Card style={{width:"0%", float: "none", opacity: "1", border: "none"}}></Card>
                    <div className="Pagination-container" style={{width:"100%", float: "none"}}>
                        <Pagination defaultCurrent={1} style={{width:"100%", float: "none"}} total={this.state.maxPage*10} onChange={this.handlePageChange} />    
                    </div>

        </div>);
    }
}