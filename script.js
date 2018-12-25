const main = document.getElementById('main');
let screen = 0;
let score = 0;
let answer = '';
mainColors = [
	'#59A3F8',
	'#2ce0d9',
	'#1DD1A1',
	'#f3db2e',
	'#F8B850',
	'#FF756F',
	'#FF6FBA',
	'#A593FA',
	'#C078E6',
	'#E3B26A'
];
bgColors = [
	'#dbf9ff',
	'#e7fffd',
	'#cffbf1',
	'#fffce3',
	'#fffdea',
	'#ffe6e4',
	'#ffe7f5',
	'#f4f0fd',
	'#f2e7ff',
	'#fdf0de'
];
const shapes = [
	'square',
	'triangle',
	'circle',
	'rectangle'
];
const positions = [
	50, 49, 50, 51, 50
];
const degs = [
	30, 60, 90, 120, 150, 180
]

function changePosition(){
	const x = positions[Math.floor(Math.random() * positions.length)];
	const y = positions[Math.floor(Math.random() * positions.length)];
	const target = document.getElementsByClassName('dot')[0];
	target.style.left = `${x}%`;
	target.style.top = `${y}%`;
	if(x == 50 && y == 50){
		answer = 'true';
	}else{
		answer = 'false';
	}
}

function changeColor(){
	const body = document.getElementsByTagName('body')[0];
	body.style.color = mainColors[score];
	body.style.backgroundColor = bgColors[score];
}

function getShape(){
	return shapes[Math.floor(Math.random() * shapes.length)];
}

function renderQuestion (shape){
	const field = document.getElementById('question');
	const scale = (4 + Math.floor(Math.random() * 5)) / 10;
	const deg = degs[Math.floor(Math.random() * degs.length)];
	const subShape = getShape();
	const bgShape = document.createElement('div');
	bgShape.id = 'bg-shape';
	bgShape.classList.add(subShape);
	const mainShape = document.createElement('div');
	mainShape.id = ('main-shape');
	mainShape.classList.add(shape);
	if(shape == 'triangle' || shape == 'rectangle'){
		mainShape.style.transform = `scale(${scale}) rotate(${deg}deg)`;
	}else{
		mainShape.style.transform = `scale(${scale})`;
		bgShape.style.transform = `rotate(${deg}deg)`;
	}
	const dot = document.createElement('div');
	dot.classList.add('dot');
	field.appendChild(bgShape);
	field.appendChild(mainShape);
	field.appendChild(dot);
	changePosition();
}

function startScreen(){
	const fragment = document.createDocumentFragment();
	const wrapper = document.createElement('div');
	const h1 = document.createElement('h1');
	h1.textContent = "Do you think you've got a designer's eye?";
	const p = document.createElement('p');
	p.classList.add('black');
	p.textContent = "Test your skills and judge whether the dots are really in the middle of the shapes. We’ve prepared 10 shapes for you to select from, but you have to get all 10 correct to win the game. Can you do it?"
	const btnStart = document.createElement('div');
	btnStart.textContent = 'Begin';
	btnStart.id = 'start';
	btnStart.classList.add('btn-start'); 
	const contentCenter = document.createElement('div');
	contentCenter.classList.add('content-center');
	contentCenter.classList.add('content-80');
	contentCenter.appendChild(h1);
	contentCenter.appendChild(p);
	contentCenter.appendChild(btnStart);
	const initRight = document.createElement('div');
	initRight.classList.add('init-right');
	initRight.appendChild(contentCenter);
	const initLeft = document.createElement('div');
	initLeft.classList.add('init-left');
	wrapper.classList.add('init-wrapper');
	wrapper.appendChild(initLeft);
	wrapper.appendChild(initRight);
	fragment.appendChild(wrapper);
	main.appendChild(fragment);
	changeColor();
	bindEvent();
}

function questionScreen(){
	main.innerHTML = '';
	const fragment = document.createDocumentFragment();
	const wrapper = document.createElement('div');
	const progress = document.createElement('div');
	progress.classList.add('progress');
	const btnLeft = document.createElement('div');
	btnLeft.classList.add('btn-left');
	const btnYes = document.createElement('div');
	btnYes.classList.add('btn-answer');
	btnYes.id = 'btn-yes';
	btnYes.innerHTML = '<i class="fas fa-laugh fa-3x"></i>';
	btnLeft.appendChild(btnYes);
	const yes = document.createElement('span');
	yes.classList.add('text-yes');
	yes.classList.add('btn-text');
	yes.textContent = 'Yes';
	btnLeft.appendChild(yes);
	const btnRight = document.createElement('div');
	btnRight.classList.add('btn-right');
	const btnNo = document.createElement('div');
	btnNo.classList.add('btn-answer');
	btnNo.id = 'btn-no';
	btnNo.innerHTML = '<i class="fas fa-tired fa-3x"></i>';
	btnRight.appendChild(btnNo);
	const no = document.createElement('span');
	no.classList.add('text-no');
	no.classList.add('btn-text');
	no.textContent = 'No';
	btnRight.appendChild(no);
	const content = document.createElement('div');
	content.classList.add('content-center');
	wrapper.classList.add('container');
	wrapper.appendChild(progress);
	wrapper.appendChild(btnLeft);
	wrapper.appendChild(content);
	wrapper.appendChild(btnRight);
	fragment.appendChild(wrapper);
	main.appendChild(fragment);
	generateQuestion();
	bindEvent();
}

function generateQuestion(){
	const shape = getShape();
	const content = document.getElementsByClassName('content-center')[0];
	content.innerHTML = '';
	const question = document.createElement('div');
	question.id = 'question';
	const scoreText = document.createElement('p');
	scoreText.classList.add('score-text');
	scoreText.classList.add('black');
	scoreText.textContent = `SCORE: ${score}/10`;
	const dexcription = document.createElement('h2');
	dexcription.classList.add('description');
	dexcription.textContent = `Is the dot in the center of the ${shape}?`;
	content.appendChild(question);
	content.appendChild(scoreText);
	content.appendChild(dexcription);
	renderQuestion(shape);
	changeColor();
}

function endScreen(){
	main.innerHTML = '';
	const fbContent = changeFB();
	const fragment = document.createDocumentFragment();
	const wrapper = document.createElement('div');
	wrapper.classList.add('container');
	const contentCenter = document.createElement('div');
	contentCenter.classList.add('content-center');
	const icon = document.createElement('div');
	icon.classList.add('icon-circle');
	icon.innerHTML = fbContent[0];
	const feedback = document.createElement('p');
	feedback.classList.add('feedback');
	feedback.classList.add('black');
	feedback.textContent = fbContent[1];
	const result = document.createElement('h2');
	result.classList.add('result');
	result.classList.add('black');
	result.textContent =  `You got ${score} correct!`;
	const btnAgain = document.createElement('div');
	btnAgain.id = 'again';
	btnAgain.classList.add('btn-again');
	btnAgain.textContent = 'Try Again';
	contentCenter.appendChild(icon);
	contentCenter.appendChild(feedback);
	contentCenter.appendChild(result);
	contentCenter.appendChild(btnAgain);
	wrapper.appendChild(contentCenter);
	fragment.appendChild(wrapper);
	main.appendChild(fragment);
	changeColor();
	bindEvent();
}

function changeFB(){
	let feedback = [];
	if(score < 3){
		feedback.push('<i class="fas fa-tired fa-4x"></i>');
		feedback.push('DID YOU EVEN TRY?');
	}else if(score < 5){
		feedback.push('<i class="fas fa-frown fa-4x"></i>');
		feedback.push('WELL THAT WAS POOR');
	}else if(score < 7){
		feedback.push('<i class="fas fa-sad-tear fa-4x"></i>');
		feedback.push("DON'T CRY ABOUT IT");
	}else if(score < 9){
		feedback.push('<i class="fas fa-smile fa-4x"></i>');
		feedback.push('NOT BAD');
	}else if(score < 10){
		feedback.push('<i class="fas fa-grin-stars fa-4x"></i>');
		feedback.push('YOU WERE SO CLOSE!');
	}else{
		feedback.push('<i class="fas fa-gem fa-4x"></i>');
		feedback.push('YOU SMASHED IT!');
	}
	return feedback;
}

function bindEvent(){
	switch(screen){
		case 0:
			const start = document.getElementById('start');
			start.addEventListener('click', questionScreen, false);
			screen = 1;
			break;
		case 1:
			const yes = document.getElementById('btn-yes');
			const no = document.getElementById('btn-no');
			yes.addEventListener('click', {name: 'true', handleEvent: checkAnswer}, false);
			no.addEventListener('click', {name: 'false', handleEvent: checkAnswer}, false);
			break;
		case 2:
			const again = document.getElementById('again');
			again.addEventListener('click',questionScreen, false);
			screen = 1;
			score = 0;
			break;
	}
}

function checkAnswer(e){
	const target = e.currentTarget;
	const displayText = target.nextElementSibling;
	const progress = document.getElementsByClassName('progress')[0];
	
	function renderProgress(){
		const width = score * 10;
		progress.style.width = `${width}%`;
	}

	if(score == 0){
		const hideText = document.getElementsByClassName('btn-text');
		for(let i = 0; i < hideText.length; i++){
			hideText[i].innerHTML = '';
		}
		displayText.style.animation = 'fadeIn 1s';
	}else{
		displayText.style.animation = 'display 1s'
	}
	
	if(answer == this.name){
		score ++;
		displayText.innerHTML = 'Correct';
		displayText.style.color = '#1DD1A1';
		target.style.animation = 'correct 1s';
		setTimeout(renderProgress, 1100);
		setTimeout(clearAnimation, 1200);
		if(score == 10){
			screen = 2;
			setTimeout(endScreen, 1300);
		}else{
			setTimeout(generateQuestion, 1300);
		}
	}else{
		screen = 2;
		displayText.innerHTML = 'Incorrect';
		displayText.style.color = '#DC4250';
		target.style.animation = 'wrong 1s';
		setTimeout(endScreen, 1200);	
	}
	function clearAnimation(){
		displayText.innerHTML = '';
		displayText.style.animation = '';
		target.style.animation = '';
	}
}

(function init(){
	startScreen();
})();

