module.exports = `
html,body{height:100%;}
#body-main {background:#f9f9f9;height:100%;}
#body-main h2,h3,h1,h4{font-size:14px;margin:0;padding:0;}
#body-main a{color:blue;}
#body-main code{padding:2px;background:#eee;color:#000;display:block;margin:10px 0;}
#body-main img{float:left;margin:2px 2px 10px 10px;clear:left;max-width:100%;}
#body-main .outer-elm{width:90%;justify-content: center;display:none;margin:auto;max-height:70%;max-height:70vh;}
#body-main .item{outline:1px solid black;width:48%;padding:0 3%;font-family:Georgia;font-size:20px;line-height:36px;overflow-x:auto;align-self: center;background:#fff;align-self: flex-start;}
#body-main .controlbar{width:100%;height:7%;height:7vh;display:flex;justify-content: center;align-items: center;background:#ffe794;position:absolute;bottom:0}
#body-main .controlbar a{margin:15px;cursor:pointer;font-size:18px;text-decoration:underline;user-select:none;}
#body-main .controlbar a:hover{color:#000;background:#cc3000;}
#body-main .controlbar a:active{color:#000;background:#9c2703;}
#body-main .controlbar input{width:24px;position:relative;}
`;
