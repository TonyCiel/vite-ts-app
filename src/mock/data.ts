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
Mock.mock('/mock/getIndexData',
    'get',
    {
        data: data,
    }
)