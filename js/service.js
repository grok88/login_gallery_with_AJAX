let service = (function(){
	//фУНКЦИЯ сравнения названия машин от А до Я
	function  compare(a,b){
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();
		let comparison = 0;
		if (nameA > nameB) {
			comparison = 1;
		} else if (nameA < nameB) {
			comparison = -1;
		}
		return comparison;
	}

	function compareReverse (a,b){
		const nameA = a.name.toUpperCase();
		const nameB = b.name.toUpperCase();
		let comparison = 0;
		if (nameA > nameB) {
			comparison = 1;
		} else if (nameA < nameB) {
			comparison = -1;
		}
		return comparison * -1;
	}
	function compareDate (a,b){
		let dateA = new Date(a.dateTemp).getTime();
		let dateB = new Date(b.dateTemp).getTime();;
		return dateA - dateB;
	}

	function compareDateReverse(a,b){
		let dateA = new Date(a.dateTemp).getTime();
		let dateB = new Date(b.dateTemp).getTime();;
		return dateB - dateA;
	}
	


	return {
		compare,
		compareReverse,
		compareDate,
		compareDateReverse
	}
})();