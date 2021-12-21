const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const database = require('./database/index'); // 与 MySQL 交互

const port = 32334;

var app = express();

app.use(bodyParser.json({ limit: '5mb' }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname)));
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'dist')));
// app.use(router.routes()).use(router.allowedMethods())

//将dist目录当成静态文件目录
// app.use(express.static(path.resolve(__dirname, 'dist')))
// app.all("*", function(req, res, next) {
//     next()
// })

function getReqData(req) {
    if (req.body && Object.keys(req.body).length) {
        return req.body;
    }
    if (req.query && Object.keys(req.query).length) {
        return req.query;
    }
    if (req.params && Object.keys(req.params).length) {
        return req.params;
    }
    return {};
}


app.post('/api/callFunction', async (req, res) => {
    let reqData = getReqData(req);
    try {
        let data = reqData.data;
        console.log('数据', reqData.parameters)
        let result = await database[reqData.method](...reqData.parameters);
        console.log('result: ', JSON.stringify(result));
        let isok = result.code != 200 ? false : true;
        res.json({ ok: isok, data: result });
    } catch (err) {
        let errmsg = err.toString();
        console.log('错误', err);
        res.json({ ok: false, errmsg: errmsg });
    }
});

app.post('/api/createUser', async (req, res) => {
    let request = getReqData(req);
    try {
        let data = request.data;
        let result = await database['createUser'](data);
        res.json({ code: result.code || 500 , msg: result.message, data: result.content });
    } catch (err) {
        let errmsg = err.toString();
        res.json({ code: 500, msg: errmsg });
    }
});

app.post('/api/loginUser', async (req, res) => {
    let request = getReqData(req);
    try {
        let data = request;
        let result = await database['loginUser'](data);
        res.json({ code: result.code || 500 , msg: result.message, data: result.content });
    } catch (err) {
        let errmsg = err.toString();
        res.json({ code: 500, msg: errmsg });
    }
});


var server = app.listen(port);
console.log(`server started at port ${port}.`);