import React from 'react';

class User{
    state = 0;
    username = "Ren Liu";
    unread = 1;
    location=[];
    getState = ()=>{
      return this.state;  
    };
    setState = (value) =>{
        this.state = value;
    }
};

const user =new User();
user.setState(1);
export default user;