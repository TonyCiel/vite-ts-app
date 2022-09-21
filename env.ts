export const homePage:string = "/wel/index"; // 首页路径
export const AMapOptions: any = {
  "key": "6407ffd6a71d7509c7ce9d3ceedef9dc",              // 申请好的Web端开发者Key，首次调用 load 时必填
    "version": "1.4.15",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    "AMapUI": {             // 是否加载 AMapUI，缺省不加载
        "version": '1.1',   // AMapUI 版本
        "plugins":['overlay/SimpleMarker'],       // 需要加载的 AMapUI ui插件
    },
    "Loca":{                // 是否加载 Loca， 缺省不加载
        "version": '1.4.15'  // Loca 版本
    },
}
