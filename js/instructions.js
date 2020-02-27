(function() {

const titles = document.getElementsByClassName('js--instructions__title');

for (let i = 0; i < titles.length; i++) {
	titles[i].addEventListener('click', function(e) {
		const contentCont = e.target.parentElement.querySelector('.instructions__copy-cont');
		contentCont.classList.toggle('instructions__copy-cont--open');
		e.target.querySelector('.dropdown-arrow').classList.toggle('dropdown-arrow--open');
	});
}

}());