import React from 'react';
const HOST = "47.106.34.252";
const PORT = "80";
const URL = "http://"+HOST+":"+PORT+"/";
var HOST_A = "localhost";
const PORT_A = "80";
HOST_A = "172.20.10.3";

const URL_A = "http://"+HOST_A+":"+PORT_A+"/";


export default class Constants{
 

    static sysConstants = {
      'queryMarket': URL_A+'queryMarket',
      'queryCategory': URL_A+'queryCategory',
      'queryToday': URL_A+'queryToday',
      'queryBook': URL_A+'queryBook',
      'basicPrice': 9.98,
    };

    static userConstants = {
      'logged': 1, 'no_logged': 0,
      'reg_url': URL_A+'user/registry',
      'login_url': URL_A+'user/login',
      'add_cart': URL_A+'user/addToCart',
      'get_cart': URL_A+'user/getCart',
      'add_fav': URL_A+'user/addToFav',
      'get_fav': URL_A+'user/getFav',
      'buyBook': URL_A+'user/buyBook',
      'r_cart': URL_A+'user/removeFromCart',
      'r_fav': URL_A+'user/removeFromFav',
      'get_user': URL_A+'user/getUser',
      'home': "http://localhost:3000"
    };

    static pictureUrl = {
      'avatar-default': URL+"avatar.png",
      'welcome-banner': URL+"welcome.png",
      'login-banner': URL+"login_support.png",
      'shopping-cart':  URL+"shopping_cart.png",
      'unload-cover': URL+"default.png"
    };

    static toUnicode = toUnicode;

    static rounding = (num)=>{
      var aNew;
      var re = /([0-9]+\.[0-9]{2})[0-9]*/;
      aNew = num.replace(re,"$1");
      return num;
    }
}

function toUnicode (originStr){
  originStr = originStr.split('\"').join("\'");

  var str = '"' + originStr + '"'
  if(str===undefined || str===null){
    return "";
  }else{
    str = eval(str);
    str = unescape(str.replace(/\u/g, "%u"));
    return str;
  }
};