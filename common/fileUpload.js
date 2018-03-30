import fs from 'fs'
import ipConfig from '../config/ipConfig.js'
// 物理IO持久化base64编码图片
export const imgsUpload = img => {
	return new Promise((resolve, reject) => {
		let base64Data = img.replace(/^data:image\/\w+;base64,/, '')
		let dataBuffer = new Buffer(base64Data, 'base64')
		let fileName = 'public/images/'+Math.random().toString(36).substr(2)+'.jpg'
		let writerStream = fs.createWriteStream(fileName, {encoding: 'utf8'})
		writerStream.write(dataBuffer, 'utf8')
		writerStream.end()
		writerStream.on('finish', () => {resolve('http://'+ipConfig.ip+':'+ipConfig.port+'/'+fileName)})
		writerStream.on('error', err => {console.log('err==='+ err)})
	})
}
// 批量物理IO持久化视频
export const videoBatchUpload = (fileName, videoBin) => {
	return new Promise((resolve, reject) => {
		let writerStream = fs.createWriteStream(fileName, {encoding:'binary', flags: 'a+'})
		writerStream.write(videoBin)
	  	writerStream.end()
	  	writerStream.on('finish', () => {resolve('success')})
		writerStream.on('error', err => {console.log('err==='+ err)})
	})
}
// 删除文件
export const deleteFile = path => {
	return new Promise((resolve, reject) => {
		fs.unlink(path, () => {resolve('delete_success')})
	})
}