import React from 'react';
import { Icon, Button, Row, Col } from 'antd';

const ColProps = {
  xs: 6,
  sm: 6,
}

export default class citys extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      city:''
    }
  }
  componentDidMount () {
    // 获取地理位置
    fetch("http://restapi.amap.com/v3/ip?key=高德地图key").then((res)=>{
      if(res.ok){
        res.text().then((data)=>{
          const detail=JSON.parse(data)
          this.setState({
            city:detail.city,
            adcode:detail.adcode
          })
        })
      }
    }).catch((res)=>{
      console.log(res.status);
    });
  }

  render () {
    return (
      <div>   
            <Row gutter={24}>
              <Col {...ColProps} xl={{ span: 4 }} md={{ span: 6 }}>
                <a href={"/#/activitys/"+this.state.adcode}><Button>{this.state.city}</Button></a>
              </Col>
            </Row>
      </div>
    );
  }
}