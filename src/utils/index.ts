// 将list转为tree
export const listToTree = (data, pid): any => {
  const arr: Array<any> = []
  data.forEach(val => {
    if (val.parentId == pid) {
      const list = listToTree(data, val.id)
      const obj: any = Object.assign({}, val);
      if (list.length !== 0) {
        obj.children = list
      }
      arr.push(obj)
    }
  })
  return arr
}
// 寻找菜单的父级（根据子节点查到所有的父）
export function getParentNameList(list: Array<any>, id: string) {
  if (!list || !id) {
    return ''
  }
  let arr: Array<string | undefined> = [];
  let findParent = (data: Array<any>, nodeId?: string, parentId?: string) => {
    for (var i = 0, length = data.length; i < length; i++) {
      let node = data[i];
      if (node.id === nodeId) {
        arr.unshift(node.name);
        if (nodeId === list[0].id) {
          break
        }
        findParent(list, parentId);
        break
      } else {
        if (node.children) {
          findParent(node.children, nodeId, node.id);
        }
        continue
      }
    }
    return arr;
  }
  return findParent(list, id);
}
export const getObjType = (obj: any): any => {
  let toString = Object.prototype.toString;
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};
/**
 * 对象深拷贝
 */
export const deepClone = (data: any) => {
  let type = getObjType(data);
  let obj: any;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

/**
 * 节流
 */
 let THROTTLE_TIMERS = {};
 export const throttle = (timerKey: string, func: Function, wait:number) => {
  const that = this;
	if (!timerKey || typeof timerKey != 'string') {
		throw '缺少timerKey';
	}
	if (typeof func != 'function') {
		throw '缺少方法';
	}
	if (!THROTTLE_TIMERS[timerKey]) {
		THROTTLE_TIMERS[timerKey] = 0;
	}
	return function(...args) {
		let now = new Date().getTime();
		if (now - THROTTLE_TIMERS[timerKey] > wait) {
			THROTTLE_TIMERS[timerKey] = now;
			func.apply(that, args)
		}
	}

} 