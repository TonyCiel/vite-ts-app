const mysql = require('mysql');
// 将下划线命名转为驼峰命名
const changeTuofeng = (value, char = "_") => {
    let arr = value.split("");
    let index = arr.indexOf(char);
    let newValue = value, flag = false;
    if (index != -1) {
        arr.splice(index, 2, arr[index + 1].toUpperCase());
        newValue = arr.join('');
        flag = true;
    }
    return {
        flag,
        newValue
    };
}
const replaceUnderLine = (obj, char = "_") => {
    let arr = Object.keys(obj);
    arr.forEach((item) => {
        let before = Object.prototype.toString.call(obj[item]) === "[object Object]" ? replaceUnderLine(obj[item], char) : obj[item];
        let key = changeTuofeng(item, char);
        obj[key.newValue] = before;
        if (key.flag) {
            delete obj[item];
        }
    })
    return obj;
}
const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	database: 'test',
	user: 'root',
	password: '925850'
});

const getCode = (code, message,data) => {
	return {
		code,
		message,
        content: !data ? {} : replaceUnderLine(data)
	}
}
module.exports = {
    connection,
    getCode
}