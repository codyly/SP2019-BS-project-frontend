import React from 'react';
const HOST = "47.106.34.252";
const PORT = "80";
const URL = "http://"+HOST+":"+PORT+"/";


export default class Constants{
    static userConstants = {
      'logged': 1, 'no_logged': 0
    };

    static pictureUrl = {
      'avatar-default': URL+"avatar.png",
      'welcome-banner': URL+"welcome.png",
      'login-banner': URL+"login_support.png",
      'shopping-cart':  URL+"shopping_cart.png"
    };
}