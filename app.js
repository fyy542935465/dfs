const express = require('express');
const swig = require('swig');
const path = require('path')
const util = require('./util')

/*引入express
* */
const app = express();
const port = 3825;
const server = require('http').Server(app)
const io = require('socket.io')(server)


//设置swig页面不缓存
swig.setDefaults({
  cache: false
})


/*设置静态目录
* swig
* */
app.set('view cache',false);
app.set('views','./assets/views/pages/');
app.set('view engine','html');
app.engine('html',swig.renderFile);

//静态文件目录，
app.use('/img',express.static('./img'));//将文件设置成静态

/*
*设置404
* */
app.get('/',(req,res) => {
  util.query(`select * from users`,[]).then( data => {
    console.log(data)
    res.send(data)
  })
})


/* start server
* { port }
* */
server.listen(port,err => {
    if(err){
        console.log(err)
        return;
    }
    console.log('server is running at http://127.0.0.1:'+ port);
})

io.on('connection',(socket)=>{
  //监听connection（用户连接）事件，socket为用户连接的实例
  socket.on('disconnect',()=>{
   //监听用户断开事件
      console.log("用户"+socket.id+"断开连接");
  });
  console.log("用户"+socket.id+"连接");
  socket.on('msg',(data)=>{
     //监听msg事件（这个是自定义的事件）
      console.log(data);//你好服务器
      data = JSON.parse(data)
      util.query(`select * from users where user_id="${data.user_id}"`,[]).then( res =>{
        console.log(data)
        let obj = {
          name:res[0].username,
          article_id:data.article_id,
        }
        if(data.reply_name && data.reply_id){
          obj.reply_name = data.reply_name
          obj.reply_id = data.reply_id
        }
        
        util.query(`select * from article where id="${data.article_id}"`,[]).then( _res =>{
          obj.user_id = _res[0].user_id
          io.emit('msg',JSON.stringify(obj));
        })
      })
    })
})


io.listen(3826);