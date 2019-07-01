import React from 'react';

class User{
    state = 0;
    username = "Guest";
    unread = 1;
    cart = 0;
    location=[];
    getState = ()=>{
      return this.state;  
    };
    setState = (value) =>{
        this.state = value;
    }
};

const user =new User();
export default user;