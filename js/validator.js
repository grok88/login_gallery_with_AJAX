class Validator{
	constructor(){
		this.DOMElems = {
			form : document.querySelector('.form-signin'),
			email : document.querySelector('#inputEmail'),
			password : document.querySelector('#inputPassword'),
			remember : document.querySelector('.remember'),
			loginAlertInfo : document.querySelector('#loginAlertInfo'),
			main : document.querySelector('main'),
			userLink : document.querySelectorAll('.user-link'),
			gall : document.querySelector('.gal'),
			userLink : document.querySelector('.user-link'),
			galleryLink : document.querySelector('.gallery-link')
		}
	}

	//edit pass
	editPass (pass){
		return pass.replace(/./g,'*');
	}

	showHidePass(e){
		let target = e.target;
		if (target.id !== 'btn-pass') return;
		
		let btnPass = document.querySelector('.btn-pass');
		let pass = document.querySelector('.user-pass');

		pass.textContent = this.DOMElems.password.value;
		btnPass.textContent = "Скрыть пароль";
		
		
		if(btnPass.classList.contains('hideBtn')){
			btnPass.textContent = "Показать пароль";
			pass.textContent = this.editPass(this.DOMElems.password.value);
		}

		btnPass.classList.toggle('hideBtn');
	}

	//Add User info
	addUserInfo(login,pass){
		if(document.querySelector('.user-info')) document.querySelector('.user-info').remove();
		console.log(1);
		const div = document.createElement('div');
		div.className = 'user-info';

		const table = `
		<table class="table">			
			<thead>
				<tr>
					<th>Email</th>
					<th>Пароль</th>
					<th>Показать - скрыть пароль</th>
				</tr>
			</thead>
			<tbody id="table-content">
				<tr>
					<td class='user-login'>${login}</td>
					<td><span class ='user-pass'>${this.editPass(pass)}</span></td>
					<td><button type = "button" class="btn-pass" id="btn-pass" >Показать пароль</button></td>
				</tr>
			</tbody>
		</table>
		`;

		div.innerHTML = table;

		// button back
		let btnBack = document.createElement('button');
		btnBack.id = "btn-back";
		btnBack.textContent = 'Back';
		
		div.append(btnBack);

		this.DOMElems.main.append(div);
		return true;
	}

	//checkUSers
	checkUsers(login,pass){
		let loginVal = login.toLowerCase();
		let passVal = pass.toLowerCase();

		let date = JSON.parse(localStorage.getItem('checkUser'));

		let check = date.filter(elem => {
			if (elem.login.toLowerCase() !== loginVal || elem.pass != passVal){		
				return false;
			} else {
				return true;
			}
		});
		
		if (check.length != 0) {
			console.log(`Success`);
			this.DOMElems.form.style.display = 'none';
			return true;
		} else {
			console.log('error');
			this.showAlertInfo('Неправильный логин или пароль', 'alert-warning');
			setTimeout(() => this.DOMElems.loginAlertInfo.classList.add('hidden'),3000);
		};
	}

	// BackBtn
	BackBtn(e){
		let target = e.target;

		if (target.id !== 'btn-back') return;

		document.querySelector('.user-info').remove();

		this.DOMElems.gall.classList.remove('hide');

		this.DOMElems.userLink.style.textDecoration = 'inherit';
		this.DOMElems.userLink.style.color = 'inherit';

		this.DOMElems.galleryLink.style.textDecoration = 'underline';
		this.DOMElems.galleryLink.style.color = 'red';
	}

	checkCorrectLogin (login) {
		const regLogin = /^([a-z0-9_-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
		return regLogin.test(login);
	}

	showAlertInfo (str, classAlert){
		if (!classAlert) classAlert = 'alert-info';
		this.DOMElems.loginAlertInfo.classList.remove('alert-warning','alert-danger','alert-info','hidden');
		this.DOMElems.loginAlertInfo.classList.add(classAlert);
		this.DOMElems.loginAlertInfo.innerHTML = str;
	}
	
	handler(loginValue,passValue){

		if(this.checkCorrectLogin(loginValue)){
			if (passValue.length < 8){
				this.showAlertInfo('Пароль  не должен быть меньше 8 символов','alert-warning');
				return false;
			} else {
				if(this.checkUsers(loginValue,passValue)){
					console.log(true);
					this.showAlertInfo('Авторизация прошла успешно','alert-success');
					return true;
				}
			}
		} else {
			this.showAlertInfo('Некоректный login','alert-warning');
			return false;
		}		
	}

	//setLogAndPass 
	setLogAndPass(database){
		let res = JSON.stringify(database);
		localStorage.setItem('checkUser',res);
	}

	// save login and pass to local storage
	rememberLS(e){
		if (this.DOMElems.remember.checked){
			const loginValue = this.DOMElems.email.value;
			const passValue = this.DOMElems.password.value;
			let temp = [];
			temp.push(loginValue,passValue); 
			localStorage.setItem('temp', JSON.stringify(temp));
		} else {
			localStorage.removeItem('temp');
		}
	}
	
	tempShow (e){
		if (localStorage.getItem('temp') === null) return;
		let [login, pass] = JSON.parse(localStorage.getItem('temp'));
		this.DOMElems.email.value = login;
		this.DOMElems.password.value = pass;
	}
	//load all Events
	initial(){
		document.addEventListener('DOMContentLoaded', this.tempShow.bind(this));
		this.DOMElems.main.addEventListener('click', this.showHidePass.bind(this));
		this.DOMElems.main.addEventListener('click', this.BackBtn.bind(this));
		this.DOMElems.remember.addEventListener('change', this.rememberLS.bind(this));
	}

}
