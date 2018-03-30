import mongoose from 'mongoose'
const options = {  
	useMongoClient: true
}
mongoose.connect('mongodb://localhost:27017/test001', options)
const db = mongoose.connection
db.on('error', console.error)
db.on('open', ()=>{
	console.log('数据库连接成功...')
})
module.exports = db