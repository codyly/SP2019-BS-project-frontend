import React from 'react';
import ReactDOM from 'react-dom';

export function URLParam(url, name, value) {
  url += (url.indexOf('?') == -1 ) ? '?' : '&' ;
  url += encodeURIComponent(name) + "=" + encodeURIComponent(value);

  return url;
}


export function GETRequest(url, callback){
    var req =new XMLHttpRequest();
    req.open("GET", url, true);
    req.send(null);
    req.onreadystatechange=(e)=>{
      if (req.readyState === 4) {
        var str = JSON.parse(req.responseText.body);
        var name = str[0];
        console.log(str);
        callback(str);
      }
    }
}

export function POSTRquest(url, data, callback){
  var req =new XMLHttpRequest();
  req.open("post", url, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(data));
  console.log(JSON.stringify(data));
  req.onreadystatechange=(e)=>{
    if (req.readyState === 4) {
      var str = {'stateCode': 0};
      var str = JSON.parse(req.responseText);
      var name = str;
      callback(str);
    }
  }
}
