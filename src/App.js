import React from 'react';
import './App.css';
import 'antd/dist/antd.css'; 
import './css/LoginPage.css';
import LoginPage from './components/LoginPage';
import Main from './main/Main'
import {Form} from 'antd';
import {Map, Marker} from 'react-amap'; 
function App() {  
   return (
     <div style={{height: "100%"}}>
       <Main/>
    </div>
  );
}

export default App;
