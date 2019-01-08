// 管理账号信息
const USERS_KEY = 'USERS_KEY';
//const STATE_KEY = 'STATE_KEY';
const getUsers = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY); // 获取缓存的用户名
    if (!ret) {
        ret = '[]';
    }
    return JSON.parse(ret);
}

const addUser = function (userInfo) {
    let users = getUsers();
    users.push({
		gesturePassword:userInfo.gesturePassword || '' // 手势密码
    });
    uni.setStorageSync(USERS_KEY, JSON.stringify(users)); // 将用户users对象缓存
}

export default {
    getUsers,
    addUser
}

