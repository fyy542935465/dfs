const express = require('express');
const swig = require('swig');
const path = require('path')

/*引入express
* */
const app = express();
const port = 3825;



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
app.get('*',(req,res) => {
    res.send('404')
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