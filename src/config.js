module.exports = {
  // puppet_padplus Token
  token: "puppet_padplus_55e9c6269f00e28f",
  // 机器人名字
  name: "robot",
  // 房间/群聊
  room: {
    // 管理群组列表
    roomList: {
      // 群名(用于展示，最好是群名，可随意) : 群id(这个可不能随意)
      公司一群: "*****@chatroom",
      开发部: "*****@chatroom"
    },
    // 加入房间回复
    roomJoinReply: `\n 你好，欢迎你的加入，请向大家介绍你自己！`
  },
  // 私人
  personal: {
    // 好友验证自动通过关键字
    addFriendKeywords: ["加群", "加群验证关键词"],
    // 是否开启加群
    addRoom: true
  },
  remindRoomTopic: ['订餐'], // 提示的群
  announceText: '大家记得订餐', // 订餐开始提示语
  endAnnounceText: '今日订餐结束', // 订餐结束提示语
  orderMsg: ['me','我'], // 订餐回复信息
  lookOrder: ['今日订餐'], // 回复关键词，查看订单
  managerList: ['超岭','管理员1'], // 管理员名字
  reminderTime: '10  56  18  *  *  *',// 每日提醒时间 每天，18点 56分 10秒提示
  endTime: '10  57  18  *  *  *',// 订餐截至时间
}
