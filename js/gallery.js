let BaseGallery = function () {	
	// DOM elements
	this.DOMElems = {
		btn : document.getElementById("add"),
		output : document.querySelector('#result'),
		countSpan : document.querySelector('#count'),
		countImg : document.querySelector('#count-img'),
		selectSort : document.querySelector('#type-selector'),
		count : 0
	};
	this.dataArr = this.transform();
}

BaseGallery.prototype = {
	getArr : function (node){
		let newArr = [];
		node.forEach(elem => {
				newArr.push({
					url : elem.url,
					name : elem.name,
					params : elem.params,
					date : elem.date
				});
		});
		return newArr;
	},
	getName : function(elem){
		return elem.name[0] + elem.name.substr(1).toLowerCase();
	},
	getDate : function(elem){
		let date = elem.date;
		let tmpDate = new Date(date),
			year  = tmpDate.getFullYear(),
			mounth = tmpDate.getMonth() + 1,
			day = tmpDate.getDate(),
			hours = tmpDate.getHours(),
			minuts = tmpDate.getMinutes();
		return `${year}/${mounth}/${day} ${hours}:${minuts}`;
	},
	editArr : function (arr){
		return arr.map((elem) => {
			return {
				url : `http://${elem.url}`,
				name : this.getName(elem),
				params : `${elem.params.status}=>${elem.params.progress}`,
				date : this.getDate(elem),
				dateTemp : elem.date
			};
		});
	},
	transform : function (){
		let newArr = this.getArr(data);
		let result = this.editArr(newArr);	
		return result;
	},
	//фУНКЦИЯ сравнения названия машин от А до Я
	compare : function (a,b){
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();
		let comparison = 0;
		if (nameA > nameB) {
			comparison = 1;
		} else if (nameA < nameB) {
			comparison = -1;
		}
		return comparison;
	},
	compareReverse : function (a,b){
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();
		let comparison = 0;
		if (nameA > nameB) {
			comparison = 1;
		} else if (nameA < nameB) {
			comparison = -1;
		}
		return comparison * -1;
	},
	compareDate : function(a,b){
		let dateA = new Date(a.dateTemp).getTime();
		let dateB = new Date(b.dateTemp).getTime();;
		return dateA - dateB;
	},
	compareDateReverse : function(a,b){
		let dateA = new Date(a.dateTemp).getTime();
		let dateB = new Date(b.dateTemp).getTime();;
		return dateB - dateA;
	},
	// Сортирует нашу галерею
	sort : function(array){
		let value = this.DOMElems.selectSort.value;
		if (value == 1){
			array.sort(this.compare);
		} else if (value == 2){
			array.sort(this.compareReverse);
		} else if (value == 3){
			array = array.sort(this.compareDate);
		} else if (value == 4){
			array = array.sort(this.compareDateReverse);
		}
		return array;
	},
	init : function (){
        if (this.DOMElems.count  + 1 === this.dataArr.length) {
            this.DOMElems.btn.style.backgroundColor = 'red';
        } else if (this.DOMElems.count === this.dataArr.length) {
            alert('Добавили все изображения');
            return;
        }
        ++this.DOMElems.count;    
    },
	initListeners : function (){
		this.DOMElems.btn.addEventListener("click", this.init.bind(this));
	}
}


let ExtendedGallery = function() {
	BaseGallery.apply(this);
	this.property = {};
}

ExtendedGallery.prototype = {
	// Добавляет картинки в наш HTML
	insertDom : function (){
		let resultHTML = '';
		if (this.DOMElems.count !== this.dataArr.length + 1) {
			
			let rez = this.sort(this.dataArr);
			
			rez.forEach((elem, index) => {
				if (index < this.DOMElems.count){
					resultHTML += `<div class="col-sm-3 col-xs-6">\
										<img src="${elem.url}" alt="${elem.name}" class="img-thumbnail">\
										<div class="info-wrapper">\
											<div class="text-muted">${elem.name}</div>\
											<div class="text-muted">${elem.params}</div>\
											<div class="text-muted">${elem.date}</div>\
										</div>\
										<button class="btn btn-default" type="button" id="delete" data-toggle="tooltip" data-placement="left" title="" >Удалить</button>
									</div>`; 
				}
            });
			this.DOMElems.countSpan.textContent = this.DOMElems.count;
			this.DOMElems.output.innerHTML = resultHTML;
		} 
    },
	// Показывает сколько картинок можно добавить
	showImg : function (){
    	this.DOMElems.countImg.textContent = this.dataArr.length - this.DOMElems.count;
    },	
	deleteImg : function (e){
        let target = e.target;
        if (target.id != 'delete') return;
        let parent = target.closest('.col-sm-3');
        parent.remove();
        --this.DOMElems.count;
        this.DOMElems.countSpan.textContent = this.DOMElems.count;
        this.DOMElems.countImg.textContent = this.dataArr.length - this.DOMElems.count;
        this.DOMElems.btn.style.backgroundColor = "inherit";
	},
	init : function (){
		BaseGallery.prototype.init.apply(this);
		this.insertDom();        
        this.showImg();
	},
	initListeners : function (){
		BaseGallery.prototype.initListeners.apply(this);
		document.addEventListener('click', this.deleteImg.bind(this));
    }
}

// код функции наследования можно найти архиве, который содержится 

inheritance(BaseGallery, ExtendedGallery);

function inheritance(parent, child){
	let childTemp = child.prototype;

	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;

	for (let key in childTemp){
		if (childTemp.hasOwnProperty(key)){
			child.prototype[key] = childTemp[key];
		}
	}
}

