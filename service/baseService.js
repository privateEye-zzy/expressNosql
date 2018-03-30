class BaseService{
	constructor(model){
		this.model = model
	}
	async baseFindAll(){
		return this.model.findAll()
	}
	async baseFindAllAndRef(refs){
		return this.model.findAllAndRef(refs)
	}
	async baseFindByID(id){
		return this.model.findByID(id)
	}
	async baseFindByIDAndRef(id,refs){
		return this.model.findByIDAndRef(id, refs)
	}
	async baseFindByFilter(filter){
		return this.model.findByFilter(filter)
	}
	async baseFindByFilterAndRef(filter,refs){
		return this.model.findByFilterAndRef(filter, refs)
	}
	async baseUpdateObj(id, update){
		return this.model.updateObj(id, update)
	}
	async baseCreateObj(obj){
		return this.model.createObj(obj)
	}
	async baseRemoveObj(id){
		return this.model.removeObj(id)
	}
}
module.exports = BaseService