module.exports = `
body{background:#f9f9f9}
h2,h3,h1,h4{font-size:14px;margin:0;padding:0;}
a{color:blue;}
img{float:right;margin:2px 2px 10px 10px;clear:left;max-width:100%;}
.outer-main{width:100%;height:100%;justify-content: center;display:none;}
.item{outline:1px solid black;width:30%;padding:1.5%;font-family:Georgia;font-size:20px;line-height:36px;overflow-x:auto;align-self: center;background:#fff}
.controlbar{width:100%;display:flex;justify-content: center;align-items: center;height:80px;background:#ffe794;}
.controlbar a{margin:15px;cursor:pointer;font-size:18px;text-decoration:underline;user-select:none;}
.controlbar a:hover{color:#000;background:#cc3000;}
.controlbar a:active{color:#000;background:#9c2703;}
.controlbar input{
	height:16px; width:24px;
	position:relative;
}
`;
