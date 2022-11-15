import Mock from 'mockjs';
const data = [
    {
        day: "2021-11-21",
        value: 20,
        key: 'allUser'
      },
      {
        day: "2021-11-22",
        value: 23,
        key: 'allUser'
      },
      {
        day: "2021-11-23",
        value: 28,
        key: 'allUser'
      },
      {
        day: "2021-11-24",
        value: 0,
        key: 'allUser'
      },
      {
        day: "2021-11-25",
        value: 18,
        key: 'allUser'
      },
      {
        day: "2021-11-26",
        value: 10,
        key: 'allUser'
      },
      {
        day: "2021-11-21",
        value: 8,
        key: 'createUser'
      },
      {
        day: "2021-11-22",
        value: 2,
        key: 'createUser'
      },
      {
        day: "2021-11-23",
        value: 4,
        key: 'createUser'
      },
      {
        day: "2021-11-24",
        value: 9,
        key: 'createUser'
      },
      {
        day: "2021-11-25",
        value: 3,
        key: 'createUser'
      },
      {
        day: "2021-11-26",
        value: 1,
        key: 'createUser'
      },

      {
        day: "2021-11-21",
        value: 1,
        key: 'loseUser'
      },
      {
        day: "2021-11-22",
        value: 0,
        key: 'loseUser'
      },
      {
        day: "2021-11-23",
        value: 1,
        key: 'loseUser'
      },
      {
        day: "2021-11-24",
        value: 2,
        key: 'loseUser'
      },
      {
        day: "2021-11-25",
        value: 0,
        key: 'loseUser'
      },
      {
        day: "2021-11-26",
        value: 1,
        key: 'loseUser'
      },

      {
        day: "2021-11-21",
        value: 1,
        key: 'pureUser'
      },
      {
        day: "2021-11-22",
        value: 3,
        key: 'pureUser'
      },
      {
        day: "2021-11-23",
        value: 6,
        key: 'pureUser'
      },
      {
        day: "2021-11-24",
        value: 9,
        key: 'pureUser'
      },
      {
        day: "2021-11-25",
        value: 10,
        key: 'pureUser'
      },
      {
        day: "2021-11-26",
        value: 14,
        key: 'pureUser'
      },
]
const tableData = [{
  "spuId": "8995198453527177024",
  "spuTitle": "选品商品支付中心测试",
  "linePrice": "89.99",
  "minPrice": "0.01",
  "maxPrice": "0.01",
  "payMethod": 1
}, {
  "spuId": "8993492251999037202",
  "spuTitle": "腾讯视频会员年卡/季卡/月卡",
  "linePrice": "100.00",
  "minPrice": "0.01",
  "maxPrice": "0.01",
  "payMethod": 3
}, {
  "spuId": "5679972196132612816",
  "spuTitle": "权益中心测试用品",
  "linePrice": "9.99",
  "minPrice": "0.01",
  "maxPrice": "0.01",
  "payMethod": 2
}, {
  "spuId": "8995198453527177034",
  "spuTitle": "对账中心",
  "linePrice": "0.01",
  "minPrice": "0.01",
  "maxPrice": "0.01",
  "payMethod": 3
}, {
  "spuId": "1600594570567283380",
  "spuTitle": "多规格测试0421",
  "linePrice": "666.00",
  "minPrice": "0.01",
  "maxPrice": "0.04",
  "payMethod": 1
}, {
  "spuId": "5679972196132612804",
  "spuTitle": "权益中心测试用礼品",
  "linePrice": "0.01",
  "minPrice": "0.01",
  "maxPrice": "0.01",
  "payMethod": 2
}];
Mock.mock('/mock/getIndexData',
    'get',
    {
        data: data,
    }
)

Mock.mock('/mock/getTableData',
    'get',
    {
        data: tableData,
    }
)