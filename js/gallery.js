class BaseGallery{	
	constructor(){
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
	
	getArr(node){
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
	}
	
	getName(elem){
		return elem.name[0] + elem.name.substr(1).toLowerCase();
	}

	getDate(elem){
		let date = elem.date;
		let tmpDate = new Date(date),
			year  = tmpDate.getFullYear(),
			mounth = tmpDate.getMonth() + 1,
			day = tmpDate.getDate(),
			hours = tmpDate.getHours(),
			minuts = tmpDate.getMinutes();
		return `${year}/${mounth}/${day} ${hours}:${minuts}`;
	}

	editArr(arr){
		return arr.map((elem) => {
			return {
				url : `http://${elem.url}`,
				name : this.getName(elem),
				params : `${elem.params.status}=>${elem.params.progress}`,
				date : this.getDate(elem),
				dateTemp : elem.date
			};
		});
	}

	transform (){
		let newArr = this.getArr(data);
		let result = this.editArr(newArr);	
		return result;
	}

	// Сортирует нашу галерею
	sort(value){
		// писал представительный белый человек(но это неточно)
		this.insertDom(config.configSevice[value]);

		//  Индийский вариант

		/* if (value == 1){
			let sortFunction = (array) => {
                array.sort(this.compare);
                return array;
            }
            this.insertDom(sortFunction);
		} else if (value == 2){
			let sortFunction = (array) => {
                array.sort(this.compareReverse);
                return array;
            }
            this.insertDom(sortFunction);
		} else if (value == 3){
			let sortFunction = (array) => {
                array.sort(this.compareDate);
                return array;
            }
            this.insertDom(sortFunction);
		} else if (value == 4){
			let sortFunction = (array) => {
                array.sort(this.compareDateReverse);
                return array;
            }
            this.insertDom(sortFunction);
		} */
	}

	// Обработчик сортировки
	sortHandler(e){
		let target = e.target.value;
		target && this.sort(target);
	}
	
	init(){
        if (this.DOMElems.count  + 1 === this.dataArr.length) {
            this.DOMElems.btn.style.backgroundColor = 'red';
        } else if (this.DOMElems.count === this.dataArr.length) {
            alert('Добавили все изображения');
            return;
        }
        ++this.DOMElems.count;    
	}
	
	initListeners (){
		this.DOMElems.btn.addEventListener("click", this.init.bind(this));
		this.DOMElems.selectSort.addEventListener('click', this.sortHandler.bind(this));
	}
}

class ExtendedGallery extends BaseGallery {
	constructor(){
		// BaseGallery.apply(this);
		super();
		this.property = {};
	}
	
	// Добавляет картинки в наш HTML
	insertDom(func){
		let resultHTML = '';
		if (this.DOMElems.count !== this.dataArr.length + 1) {
			
			let arr = this.dataArr;
			func &&  (arr = func(arr));

			arr.forEach((elem, index) => {
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
	}
	
	// Показывает сколько картинок можно добавить
	showImg(){
    	this.DOMElems.countImg.textContent = this.dataArr.length - this.DOMElems.count;
	}
	
	deleteImg(e){
        let target = e.target;
        if (target.id != 'delete') return;
        let parent = target.closest('.col-sm-3');
        parent.remove();
        --this.DOMElems.count;
        this.DOMElems.countSpan.textContent = this.DOMElems.count;
        this.DOMElems.countImg.textContent = this.dataArr.length - this.DOMElems.count;
        this.DOMElems.btn.style.backgroundColor = "inherit";
	}

	init(){
		// BaseGallery.prototype.init.apply(this);
		super.init();
		this.insertDom();        
        this.showImg();
	}

	initListeners(){
		// BaseGallery.prototype.initListeners.apply(this);
		super.initListeners();
		document.addEventListener('click', this.deleteImg.bind(this));
    }

}


// код функции наследования => for prototype

// inheritance(BaseGallery, ExtendedGallery);

// function inheritance(parent, child){
// 	let childTemp = child.prototype;

// 	child.prototype = Object.create(parent.prototype);
// 	child.prototype.constructor = child;

// 	for (let key in childTemp){
// 		if (childTemp.hasOwnProperty(key)){
// 			child.prototype[key] = childTemp[key];
// 		}
// 	}
// }

