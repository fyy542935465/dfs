const express = require('express');

/*引入express
* */
const app = express();
const port = process.env.PORT || 3333;


//静态文件目录，
app.use('/img',express.static('./img'));//将文件设置成静态

/*
*设置404
* */
app.get('*',(req,res) => {
    res.render('404',{
        content:'页面跑丢了'
    })
})


/* start server
* { port }
* */
app.listen(port,err => {
    if(err){
        console.log(err)
        return;
    }
    console.log('server is running at http://127.0.0.1:'+ port);
})