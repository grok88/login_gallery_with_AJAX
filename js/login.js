/* 
*  Схематическое изображение класса Логин формы
*/
class LoginForm {
	constructor (validatorModule, galleryModule){
		this.validator = validatorModule;
		this.gallery = galleryModule;
	}	
	
	initComponent (){
		this.email = document.querySelector('#inputEmail');
		this.password = document.querySelector('#inputPassword');
		this.btnInput = document.querySelector('.btn-input');
		this.gall = document.querySelector('.gal');
		this.userPanel = document.querySelector('#user-panel');
		this.form = document.querySelector('.form-signin');
		this.userLink = document.querySelector('.user-link');
		this.galleryLink = document.querySelector('.gallery-link');
		this.exit = document.querySelector('.exit-link');

		this.validateUserData();
	}
	
	validateUserData (){
		this.validator.setLogAndPass(database);
		this.validator.initial();

		this.btnInput.addEventListener('click', this.btnSubmit.bind(this));
		this.userLink.addEventListener('click',this.userLinkInfo.bind(this));
		this.galleryLink.addEventListener('click',this.galleryLinkClick.bind(this));
		this.exit.addEventListener('click', this.exitUser.bind(this));
		//document.body.addEventListener('click',this.backButton.bind(this));
	}

	btnSubmit (e){
		if (localStorage.getItem('check') === true)  return;
		
		if (this.validator.handler(this.email.value,this.password.value)){
			localStorage.setItem('check','true');
			this.enterTrue();
		}

		e.preventDefault();
	}

	enterTrue (){
		this.validator.showAlertInfo('start gallery','alert-success');
		setTimeout(this.closeLogin.bind(this),1000);
	}

	closeLogin (){
		this.form.classList.add('hide');
		this.gall.classList.remove('hide');
		this.userPanel.classList.remove('hide');
		this.validator.DOMElems.loginAlertInfo.classList.add('hide');
		this.galleryLink.style.textDecoration = 'underline';
		this.galleryLink.style.color = 'red';
		this.gallery.initListeners();

	}
	
	userLinkInfo (){
		
		this.galleryLink.style.textDecoration = 'inherit';
		this.galleryLink.style.color = 'inherit';

		this.userLink.style.textDecoration = 'underline';
		this.userLink.style.color = 'red';

		this.gall.classList.add('hide');
		
		this.validator.addUserInfo(this.email.value,this.password.value);
	}

	galleryLinkClick (){
		this.userLink.style.textDecoration = 'inherit';
		this.userLink.style.color = 'inherit';

		this.galleryLink.style.textDecoration = 'underline';
		this.galleryLink.style.color = 'red';

		document.querySelector('.user-info').classList.add('hide');
		this.gall.classList.remove('hide');
	}

	exitUser (){
		document.location.reload(true);
		localStorage.setItem('check','');
	}
}

