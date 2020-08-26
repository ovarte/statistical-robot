const fs = require("fs");
const path = require("path");
// 配置文件
const config = require("./config");
const schedule = require("node-schedule");
const moment = require("moment");
const cacheName = moment().format("YYYY-MM-DD");
const filepath = path.join(__dirname, "../", "data", cacheName + ".txt");
let startCollect = false; // 开始统计
const order = {}; // 订餐记录统计，计时结束后，存在data文件夹下的一个文件
// 消息监听回调
module.exports = (bot) => {
	return async function onMessage(msg) {
		if (!msg.room()) {
			return;
		}
		const roomTopic = await msg.room().topic();
		const user = msg.from().name();
		const msgtext = msg.text();
		console.log(msgtext);
		console.log(user);
		console.log(
			config.managerList.includes(user),
			config.announceText,
			msgtext.slice(5)
		);
		// 在指定的群里，指定的管理员，指定的信息下开始统计信息
		if (config.remindRoomTopic.includes(roomTopic)) {
			if (
				config.managerList.includes(user) &&
				config.announceText == msgtext.slice(5)
			) {
				console.log("shezhi start wei true");
				startCollect = true;
			}
			if (startCollect) {
				order[roomTopic] || (order[roomTopic] = {});
				if (config.orderMsg.includes(msgtext)) {
					order[roomTopic][user] = true;
				}
			}

			// ===========管理员发信息， 发的查看订单记录
			if (
				config.managerList.includes(user) &&
				config.lookOrder.includes(msgtext)
			) {
				fs.readFile(filepath, "utf-8", function (err, data) {
					if (err) {
						console.error(err);
						msg.room().say("今日订单暂未生成");
					} else {
						let result = JSON.parse(data);
						result = result[roomTopic] || {};
						msginfo = strTemplate(result);
						msg.room().say(msginfo);
					}
				});
			}
		}
	};
};

// 统计结束，把统计的记录加到文件里
schedule.scheduleJob(config.endTime, (_) => {
	startCollect = false;
	var str = JSON.stringify(order);
	console.log(order);
	fs.writeFile(filepath, str, (_) => {
		if (_) {
			console.log(_.message);
			return;
		}
		console.log("加入到文件");
	});
});

function strTemplate(data) {
	var str = "当日订餐：\n";
	for (const value of Object.keys(data)) {
		str += value + "\n";
	}
	return str;
}
