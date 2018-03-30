import mongoose from 'mongoose'
import db from '../config/db'
import BaseSchema from './baseSchema.js'
class GogSchema extends BaseSchema{
	constructor(){
		super({
			goodId: {type: String}, // 芯片编号
			name: {type: String}, // 姓名
			price: {type: String}, // 价格
			sex: {type: String},	// 性别
			birth_date: {type: Date}, // 出身日期
			birth_place: {type: String}, // 出身地
			breed: {type: String}, // 犬种
			varieties: {type: String}, // 品种
			sell_state: {type: String}, // 出售状态
			sell_place: {type: String}, // 出售地
			is_hot: {type: String}, // 是否热门
			good_desc: {type: String}, // 产品描述
			is_competition: {type: String}, // 是否参赛
			is_winning: {type: String}, // 是否获奖
			winning_rank: {type: String}, // 获奖名次
			host_unit: {type: String}, // 主办单位
			father: {type: mongoose.Schema.ObjectId, ref: 'dog'}, // 父亲
			mother: {type: mongoose.Schema.ObjectId, ref: 'dog'}, // 母亲
			first_vaccine_time: {type: Date}, // 第一次注射时间
			first_vaccine_name: {type: String}, // 第一次疫苗名称
			first_vaccine_type: {type: String}, // 第一次疫苗
			second_vaccine_time: {type: Date}, // 第二次注射时间
			second_vaccine_name: {type: String}, // 第二次疫苗名称
			second_vaccine_type: {type: String}, // 第二次疫苗
			third_vaccine_time: {type: Date}, // 第三次注射时间
			third_vaccine_name: {type: String}, // 第三次疫苗名称
			third_vaccine_type: {type: String}, // 第三次疫苗
			body_surface: {type: String}, // 体表
			back_hair: {type: String}, // 背毛
			eye_color: {type: String}, // 眼睛颜色
			hair_color: {type: String}, // 毛色
			shape: {type: String}, // 体型
			courage: {type: String}, // 胆量
			attack: {type: String}, // 攻击性
			xianqu: {type: String}, // 衔取
			sport_temp: {type: String}, // 运动气质
			head_imgs:[], // 头部图片
			figure_imgs:[], // 身段图片
			sport_imgs:[], // 运动图片
			videoUrl: {type: String}, // 视频地址
		}, 'dog')
		/******************该Schema特有的方法************************/
		let special = {}
		// 合并该Schema特有的方法和公共的方法
		this.statics = Object.assign(this.statics,special)
	}
}
module.exports = db.model('dog', new GogSchema())