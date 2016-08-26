
var sourceUI = function () {
	this.data = {
		sourceUISound : {
			navList :[{
				id:'1',
				name:'英语发音'
			},{
				id:'2',
				name:'动物叫声'
			},{
				id:'3',
				name:'乐器'
			}]
		},

		sourceUIImage : {
			navList :[{
				id:'1',
				name:'食品'
			},{
				id:'2',
				name:'建筑物'
			},{
				id:'3',
				name:'动物'
			},{
				id:'4',
				name:'国家'
			},{
				id:'5',
				name:'人物'
			},{
				id:'6',
				name:'物体'
			}
		}
	}

	return this.data;
}


module.exports = new sourceUI