import mongoose from 'mongoose'
import db from '../config/db'
class BaseSchema extends mongoose.Schema{
	constructor(properties,schemaName){
		super(properties,{
			versionKey:false,
			retainKeyOrder:true,
			timestamps:true
		});
		this.statics = {
			/**************************************查询方法**************************************/
			findAll(){
				return this.model(schemaName).find()
			},
			findAllAndRef(refs){
				return this.model(schemaName).find().populate(refs)
			},
			findByID(id){
				return this.model(schemaName).findById(id)
			},
			findByIDAndRef(id,refs){
				return this.model(schemaName).findById(id).populate(refs)
			},
			findByFilter(filter){
				return this.model(schemaName).find(filter);
			},
			findByFilterAndRef(filter,refs){
				return this.model(schemaName).find(filter).populate(refs)
			},
			/**************************************更新方法**************************************/
			updateObj(id, update){
				return this.model(schemaName).findByIdAndUpdate(id, {$set: update})
			},
			/**************************************插入方法**************************************/
			createObj(obj){
				return this.model(schemaName).create(obj)
			},
			/**************************************删除方法**************************************/
			removeObj(id){
				return this.model(schemaName).findByIdAndRemove(id)
			},
		}
	}
}
module.exports = BaseSchema