const express = require('express');
const app = express();
app.use(express.static('dist', {maxAge:  1000 * 3600}));
app.listen(9999,() => {
    console.log('服务器启动成功')
})