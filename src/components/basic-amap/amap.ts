import AMapLoader from '@amap/amap-jsapi-loader';
import { AMapOptions } from '../../../env';
let mapLoadState:string = '';
let Amap:any = null;
let loaderror:unknown = '';
interface PromiseReadyHolderConfig {
  resolved: any,
  reject: any
}
const MAP_READY_HOLDERS: Array<PromiseReadyHolderConfig> = []; //地图加载情况
const loadAmapObj = ():Promise<any> => {
  mapLoadState = 'pending';
  return new Promise(async (resolved, reject) => {
    try {
      Amap = await AMapLoader.load(AMapOptions);
      mapLoadState = 'success';
      resolved(Amap);
    }catch(e) {
      console.error('加载地图失败',e);
      loaderror = e;
      mapLoadState = 'fail';
      reject(e);
    }
  }) 
}
const checkMapLoaded = (isdone:boolean, data:any) => {
	while (MAP_READY_HOLDERS.length > 0) {
		let holder:PromiseReadyHolderConfig | undefined = MAP_READY_HOLDERS.shift();
		if (isdone) {
			holder && holder.resolved(data);
		} else {
			holder && holder.reject(data);
		}
	}
	return;
}
export const loadAMap = async () => {
  let promise = new Promise((resolved, reject) => {
    MAP_READY_HOLDERS.push({
      resolved,
      reject
    });
  });
  if (mapLoadState == '') {
    try {
      let Amap = await loadAmapObj();
      checkMapLoaded(true, Amap);
    } catch (e) {
      checkMapLoaded(false, e);
    }
  } else if (mapLoadState == 'success') {
    checkMapLoaded(true, AMap);
  } else if (mapLoadState == 'fail') {
    checkMapLoaded(false, loaderror);
  }
  return promise;
}

export const AMap = Amap;