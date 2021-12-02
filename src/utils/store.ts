/**
 * 存储localStorage
 */
export const setStore = (key: string, obj: object,type?: string) => {
    key = `ciel-${key}`;
    if(type === 'session') {
        window.sessionStorage.setItem(key, JSON.stringify(obj));
    } else {
        window.localStorage.setItem(key, JSON.stringify(obj));
    }
}
/**
 * 获取localStorage
 */
export const getStore = (key: string,type?: string) => {
    key = `ciel-${key}`;
    let value = window.localStorage.getItem(key) || '';
    if(type === 'session') {
        value = window.sessionStorage.getItem(key) || '';
    }
    try {
        value = JSON.parse(value);
    }catch {
        return value;
    }
    return value;
}
/**
 * 清除
 */
export const clearStore = (key: string,type?: string) => {
    key = `ciel-${key}`;
    if(type === 'session') {
        window.sessionStorage.removeItem(key);
    } else {
        window.localStorage.removeItem(key);
    }
}