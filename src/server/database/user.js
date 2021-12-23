const { connection, getCode } = require('../config');

// 添加用户
async function createUser(data) {
    const { account, password, userName, roleids,id } = data;
    return new Promise((resolve, reject) => {
        let sql = 'insert into users_table(user_account,user_password,role_ids,user_name) values(?,?,?,?)';
        let query = [account, password, roleids, userName];
        if(id) {
            sql = `update users_table set user_account = '${account}' , role_ids = '${roleids}',  user_name = '${userName}' where id = ?`;
            if(password) {
                sql = `update users_table set user_account = '${account}' , user_password = '${password}', role_ids = '${roleids}' , user_name = '${userName}' where id = ?`;
            }
            query = [id]
        }
        console.log('添加以下数据：', [account, password, roleids, userName])
        connection.query(sql, query, function (error, result) {
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
// 根据角色id查出菜单
// 获取所有用户
async function getMenuByRoleId(roleid) {
    return new Promise((resolve, reject) => {
        let sql = 'select id,role_menus from role_table where id = ?';
        connection.query(sql,[roleid], function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result[0]);
            };
        });
    }).catch((err) => {
        console.log('err', err)
        return err;
    });
}
// 用户登录
async function loginUser(data) {
    const { account, password } = data;
    return new Promise((resolve, reject) => {
        let sql = 'select * from users_table where user_account = ? and user_password = ?;';
        connection.query(sql, [account, password], function (error, result) {
            if (error) {
                reject(getCode(400, '数据库出错～'));
            } else {
                const userInfo = result.length ? result[0] : {};
                delete userInfo.user_password;
                console.log('userInfo',userInfo)
                getMenuByRoleId(userInfo.role_ids).then(res => {
                    console.log('res',res)
                    if(res) {
                        userInfo.role_menus = res.role_menus;
                    }
                    result && !result.length ? reject(getCode(400, '账号或密码错误')) :  resolve(getCode(200,'登录成功',userInfo));;
                })
            };
        });
    }).catch((err) => {
        console.log('err', err)
        return err;
    });
}
// 获取所有用户
async function userList() {
    return new Promise((resolve, reject) => {
        let sql = 'select * from users_table';
        connection.query(sql, function (error, result) {
            if (error) {
                reject(getCode(400, '数据库出错～'));
            } else {
                result.forEach(item => {
                    delete item.user_password
                })
                // console.log('result',result[0])
                resolve(getCode(200,'查询成功',result));;
            };
        });
    }).catch((err) => {
        console.log('err', err)
        return err;
    });
}
// 删除用户
async function deleteUser(data) {
    const {id } = data;
    return new Promise((resolve, reject) => {
        if(id == 1) { // 第一个用户不能操作
            reject(getCode(400, '超级管理员不能操作！！'));
            return;
        }
        let sql = 'delete from users_table where id = ?';
        connection.query(sql, [id], function (error, result) {
            if (error) {
                reject(getCode(400, '数据库出错～'));
            } else {
                let r = result['affectedRows'] == 1;
                if (!r) {
                    reject({
                        code: 400,
                        message: '删除失败'
                    });
                } else {
                    resolve({
                        code: 200,
                        message: '删除成功',
                    });
                }
            };
        });
    }).catch((err) => {
        console.log('err', err)
        return err;
    });
}

module.exports = {
    createUser: createUser,
    loginUser: loginUser,
    userList: userList,
    deleteUser: deleteUser
}
