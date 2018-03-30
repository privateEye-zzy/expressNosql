import express from 'express'
import dogService from '../service/dogService.js'
const router = express.Router()
class DogCtroller{
	static initRouter(){
		/***************查询业务***************/
		router.get('/list', async (req, res, next) => {
			try{res.json(await dogService.baseFindAll())}catch(err){next(err)}
		})
		router.get('/findById', async (req, res, next) => {
			try{res.json(await dogService.baseFindByID(req.query['id']))}catch(err){next(err)}
		})
		/***************保存业务***************/
		router.post('/save', async (req, res, next) => {
			try{res.json(await dogService.saveDogWithFiles(req.body))}catch(err){next(err)}
		})
		/***************修改业务***************/
		router.put('/update', async (req, res, next) => {
			try{res.json(await dogService.updateDogWithFiles(req.body['id'], req.body['update']))}catch(err){next(err)}
		})
		router.put('/updateVideo', async (req, res, next) => {
			try{res.json(await dogService.updateDogWithVideo(req.body['id'], req.body['fileName'], req.body['curProcess'], req.body['videoBin']))}catch(err){next(err)}
		})
		/***************删除业务***************/
		router.delete('/delete', async (req, res, next) => {
			try{res.json(await dogService.baseRemoveObj(req.query['id']))}catch(err){next(err)}
		})
		return router
	}
}
module.exports = DogCtroller.initRouter()