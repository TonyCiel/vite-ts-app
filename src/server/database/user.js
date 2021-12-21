const { connection, getCode } = require('../config');

// 添加用户
async function createUser(data) {
    const { account, password, userName, roleids } = data;
    return new Promise((resolve, reject) => {
        let sql = 'insert into users_table(user_account,user_password,role_ids,user_name) values(?,?,?,?)';
        console.log('添加以下数据：', [account, password, roleids, userName])
        connection.query(sql, [account, password, roleids, userName], function (error, result) {
            if (error) {
                reject(getCode(400, '数据库出错～'));
            } else {
                let r = result['affectedRows'] == 1;
                if (!r) {
                    reject({
                        code: 400,
                        message: '数据插入失败～'
                    });
                } else {
                    resolve({
                        code: 200,
                        message: '添加成功'
                    });
                }
            };
        });
    }).catch((err) => {
        console.log('err', err)
        return err;
    });
};
// 用户登录
async function loginUser(data) {
    const { account, password } = data;
    return new Promise((resolve, reject) => {
        let sql = 'select * from users_table where user_account = ? and user_password = ?;';
        connection.query(sql, [account, password], function (error, result) {
            if (error) {
                reject(getCode(400, '数据库出错～'));
            } else {
                // console.log('result',result[0])
                const userInfo = result.length ? result[0] : {};
                delete userInfo.user_password;
                result && !result.length ? reject(getCode(400, '账号或密码错误')) :  resolve(getCode(200,'登录成功',userInfo));;
            };
        });
    }).catch((err) => {
        console.log('err', err)
        return err;
    });
}


module.exports = {
    createUser: createUser,
    loginUser: loginUser
}
