const express = require('express');

/*引入express
* */
const app = express();
const port = process.env.PORT || 3333;


//静态文件目录，
app.use('/public',express.static('../../img/group1'));//将文件设置成静态


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