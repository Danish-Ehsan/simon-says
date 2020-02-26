$(function(){

	var $buttons = $('.button');
	var $modBtns = $('.modeButton');
	var $play = $('#play');
	var $strict = $('#strict');
	var $alt = $('#alt');
	var $counter = $('#MainCnt');
	var $userCnt = $('#userCnt');
	var $limitCnt = $('#limitCnt');

	var key = [];
	var userKey = [];
	var altKey = [];
	var userTurn = false;
	var setting = false;
	var gameOn = false;
	var timerOne, timerTwo, settingTimer;
	var winLimit = 5;

	var i = 0;
	var ii = 0;
	var iii = 0;


	$modBtns.not('#play').on('click', function() {
		$this = $(this);
		if (setting === false) {
			$this.toggleClass('active');
			if ($this.is('#alt')) {
				if ($this.hasClass('active')) {
					reset();
					$this.toggleClass('active');
					init();
				} else {
					reset();
					init();
				}
			}
		} else {
			if ($this.is('#strict')) {
				winLimit++;
				$limitCnt.text(winLimit);
			} else if ($this.is('#alt')) {
				winLimit--;
				$limitCnt.text(winLimit);
			}
		}
	});


	$play.on('mousedown', function() {
		$this = $(this);
		if (setting === false) {
			settingTimer = setTimeout (function() {
				reset();
				setting = true;
				$play.addClass('setting');
				$limitCnt.addClass('setting').text(winLimit);
			}, 1000);
		} else if (setting === true) {
			clearTimeout(settingTimer);
			setting = false;
		}
	});

	$play.on('mouseup', function() {
		console.log('key length= ' + key.length);
		if (setting === false && key.length < 1) {
			clearTimeout(settingTimer);
			console.log('testing2');
			init();
		} else if (setting === false && key.length >= 1) {
			clearTimeout(settingTimer);
			console.log('testing3');
			reset();
		}
	});


	function init() {
		setTimeout(function() {
			gameOn = true;
		}, 500);
		$play.removeClass('setting').toggleClass('active');
		$limitCnt.removeClass('setting');
		console.log('testing');
		if ($play.hasClass('active')) {
			console.log('testing2');
			nextTurn();
			$userCnt.show().text('00');
			$limitCnt.show().text(winLimit);
		} 
	}


	function nextTurn() {
		//generate new random buttom press
		$counter.removeClass('end').html('--');
		var keyGen;
		function newKey() {
			var thisKey = Math.random();
			keyGen = (function() {
				switch (true) {
					case  thisKey < 0.25:
						return 0;
						console.log(1);
						break;
					case  thisKey < 0.50:
						return 1;
						console.log(2);
						break;
					case  thisKey < 0.75:
						return 2;
						console.log(3);
						break;
					case  thisKey < 1:
						return 3;
						console.log(4);
						break;
				}		
			}());
		}
		console.log('keyGen= ' + keyGen);
		if (!$alt.hasClass('active')) {
			newKey();
			key.push(keyGen);
			$counter.text(key.length);
			console.log('keyGen= ' + keyGen);
			console.log('key= ' + key);
		} else {
			key = [];
			iii++;
			for (var i = 0; i < iii; i++) {
				newKey();
				key.push(keyGen);
			}
			$counter.text(key.length);
			console.log('altKey= ' + key);
		}
		playSeq();
	}


	//play current sequence
	function playSeq() {
		console.log('i= ' + i);
		if (key.length > 0) {
			$buttons.eq(key[i]).addClass('active');
		}
		timerOne = setTimeout(function() {
			$buttons.eq(key[i]).removeClass('active');
			i++;
		}, 600);

		timerTwo = setTimeout(function() {
			if(i < key.length) {
				playSeq();
			} else {
				userTurn = true;
				i = 0;
				console.log('userTurn= ' + userTurn);
			}
		}, 1000);
	}
	
	//get user response

	$buttons.each(function(index) {
		console.log('button test');
		$(this).on('click', function() {
			if (userTurn === true) {
				$(this).addClass('active');
				console.log('userPress= ' + index);
				userInput(index);
				var timer = setTimeout(function() {
						$buttons.eq(index).removeClass('active');
				}, 500);
			}
		});
	});


	function userInput(index) {

			userKey.push(index);
			console.log('userKey= ' + userKey);
			console.log('userKey i= ' + userKey[ii], 'key i= ' + key[ii]);
			console.log('userKey L=' + userKey.length, 'key L=' + key.length)

			if (userKey[ii] === key[ii] && userKey.length < key.length) {
				console.log('if ONE');
				ii++;
				$userCnt.text(userKey.length);
			} else if (userKey[ii] === key[ii] && userKey.length === key.length) {
				console.log('if TWO');
				userTurn = false;
				ii = 0;
				$userCnt.text(userKey.length);
				userKey = [];
				setTimeout(function() {
					if (key.length < winLimit) {
						$userCnt.text('--');
						nextTurn();
					} else {
						$userCnt.hide();
						$limitCnt.hide();
						$counter.addClass('end').html('you<br>win!');
						key = [];
						userKey = [];
						i = 0;
						ii = 0;
						setTimeout(function() {
							$modBtns.removeClass('active');
						}, 1200);
					}
				}, 800);
			} else {
				console.log('if THREE');
				userTurn = false;
				$counter.text('!!');
				setTimeout(function() {
					ii = 0;
					$counter.text(key.length);
					userKey = [];
					if (!$strict.hasClass('active')) {
						playSeq();
					} else {
						$userCnt.hide();
						$limitCnt.hide();
						$counter.addClass('end').html('game<br>over');
						key = [];
						userKey = [];
						userTurn = false;
						setTimeout(function() {
							$modBtns.removeClass('active');
						}, 1200);
					}
				}, 800);
			}

	}

	function reset() {
			clearTimeout(timerOne);
			clearTimeout(timerTwo);
			userTurn = false;
			setting = false;
			gameOn = false;
			key = [];
			userKey = [];
			i = 0;
			ii = 0;
			iii = 0;
			$buttons.removeClass('active');
			$modBtns.removeClass('active');
			$counter.removeClass('end').text('--');
			$limitCnt.show().text('--');
			$userCnt.show().text('--');
	}
});

