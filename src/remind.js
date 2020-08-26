const schedule = require('node-schedule')
const config = require('./config')

module.exports = bot => async() => {
    // 提醒订餐
    schedule.scheduleJob(config.reminderTime, async _ => {
        if(!isWorkDay()){
            return false
        }
        try{
            const searchRoom = await bot.Room.find({ topic: config.remindRoomTopic[0]});
            await searchRoom.announce(config.announceText)
        }catch(err){
            console.log(err.message)
        }
    })
    // 订餐截至时间提醒
    schedule.scheduleJob(config.endTime, async _ =>{
        if(!isWorkDay()){
            return false
        }
        try{
            const searchRoom = await bot.Room.find({ topic: config.remindRoomTopic[0]});
            await searchRoom.announce(config.endAnnounceText)
        }catch(err){
            console.log(err.message)
        }
    })
}
// 是否是工作日
function isWorkDay(){
    const today = new Date().getDay();
    if(today === 0 || today === 6 ){
        return false
    }
    return true
}