import BaseService from './baseService.js'
import {AutoWritedDogModel} from '../common/AutoWrite.js'
import ipConfig from '../config/ipConfig.js'
import {imgsUpload, videoBatchUpload, deleteFile} from '../common/fileUpload.js'
@AutoWritedDogModel
class DogService extends BaseService{
	constructor(){
    	super(DogService.model)
  	}
  	// 保存包含图片文件编码的对象接口（数据库保存文件持久化后的网络地址）
  	async saveDogWithFiles(saveObj){
  		let imgKeys = ['head_imgs', 'figure_imgs', 'sport_imgs'] // 图片文件的持久化字段
  		// 如果此处更新的图片里含有base64编码，证明需要物理持久化
  		for(let i = 0; i < imgKeys.length; i++){
  			for(let j = 0; j < saveObj[imgKeys[i]].length; j++){
	  			if(!saveObj[imgKeys[i]][j].startsWith('http')){
	  				saveObj[imgKeys[i]][j] = await imgsUpload(saveObj[imgKeys[i]][j])
	  			}
	  		}
  		}
  		return DogService.model.createObj(saveObj)
  	}
  	// 更新包含图片文件编码的对象接口（数据库保存文件持久化后的网络地址）
  	async updateDogWithFiles(id, update){
  		let originalObj = await DogService.model.findByID(id)
  		let imgKeys = ['head_imgs', 'figure_imgs', 'sport_imgs'] // 图片文件的持久化字段
  		for(let i = 0; i < imgKeys.length; i++){
  			// 如果原始对象里没有此处更新的图片地址，证明需要物理删除
  			for(let j = 0; j < originalObj[imgKeys[i]].length; j++){
	  			if(!update[imgKeys[i]].includes(originalObj[imgKeys[i]][j])){
	  				await deleteFile('.' + originalObj[imgKeys[i]][j].split(ipConfig.port)[1])
	  			}
	  		}
	  		// 如果此处更新的图片里含有base64编码，证明需要物理持久化
	  		for(let j = 0; j < update[imgKeys[i]].length; j++){
	  			if(!update[imgKeys[i]][j].startsWith('http')){
	  				update[imgKeys[i]][j] = await imgsUpload(update[imgKeys[i]][j])
	  			}
	  		}
  		}
  		return DogService.model.updateObj(id, update)
  	}
  	// 更新包含视频文件二进制编码的对象接口，需要产品id和文件名字做批量IO视频文件
  	async updateDogWithVideo(id, fileName, curProcess, videoBin){
		await videoBatchUpload(fileName, videoBin[0]) // IO持久化一段视频文件
		if(curProcess === 1){
			return DogService.model.updateObj(id, {'videoUrl': 'http://'+ipConfig.ip+':'+ipConfig.port+'/'+fileName})
		}else{
			return Promise.resolve({ok:'ok'})
		}
  	}
}
module.exports = new DogService()