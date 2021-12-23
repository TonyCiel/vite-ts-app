const { connection,getCode } = require('../config');

// 添加角色
async function updateRole(data) {
    const { roleName,id,roleMenus } = data;
    return new Promise((resolve, reject) => {
        if(id == 1) { // 第一个角色
            reject(getCode(400, '超级管理员角色不能操作！！'));
            return;
        }
        if(!roleName) {
            reject(getCode(400, '角色名称不能为空'));
        }
        let sql = 'insert into role_table(role_name,role_menus) values(?,?)';
        let query = [roleName, roleMenus];
        if(id) {
            sql = `update role_table set role_name = '${roleName}' , role_menus = '${roleMenus}'  where id = ?`;
            query = [id]
        }
        console.log('修改以下数据：', query)
        connection.query(sql, query, function (error, result) {
            if (error) {
                reject(getCode(400, error));
            } else {
                console.log('修改角色～result',result)
                let r = result['affectedRows'] == 1;
                if (!r) {
                    reject({
                        code: 400,
                        message: '数据插入失败～'
                    });
                } else {
                    resolve({
                        code: 200,
                        message: '修改成功'
                    });
                }
            };
        });
    }).catch((err) => {
        console.log('err', err)
        return err;
    });
};
// 获取所有角色
async function roleList() {
    return new Promise((resolve, reject) => {
        let sql = 'select * from role_table';
        connection.query(sql, function (error, result) {
            if (error) {
                reject(getCode(400, error));
            } else {
                resolve(getCode(200,'查询成功',result));;
            };
        });
    }).catch((err) => {
        console.log('err', err)
        return err;
    });
}
// 删除角色
async function deleteRole(data) {
    const {id } = data;
    return new Promise((resolve, reject) => {
        if(id == 1) { // 第一个角色是超级管理员一定不能删除
            reject(getCode(400, '超级管理员角色不能操作！！'));
            return;
        }
        let sql = 'delete from role_table where id = ?';
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
    updateRole: updateRole,
    roleList: roleList,
    deleteRole: deleteRole
}