const INIT_MESSAGE = 'Start guessing...';
const PLAY_BTN_CONTENT = 'New Game!';
const GUESS_BTN_INIT_CONTENT = 'Guess!';
const message = document.querySelector('.message');
const countriesContainer = document.querySelector('.countries');
const headerMessage = document.querySelector('h1');
const scoreLabel = document.querySelector('.score');
const highscoreLabel = document.querySelector('.highscore');
const guessInput = document.querySelector('.guess__input');

export const guessBtn = document.querySelector('.btn--guess');
export const playBtn = document.querySelector('.btn--play-new');
export const resetBtn = document.querySelector('.btn--reset');

export const getGuessInput = function () {
	return guessInput.value.trim().replace(/\.+$/, '').toLowerCase();
};

export const displayMess = function (mess) {
	message.textContent = mess;
};

export const displayHighScore = function (highscore) {
	highscoreLabel.textContent = highscore;
};

export const renderPreLoad = function (highscore) {
	highscoreLabel.textContent = highscore;
	playBtn.textContent = 'Loading!';
	playBtn.disabled = true;
	resetBtn.disabled = true;
	guessBtn.disabled = true;
};

export const renderPostLoad = function () {
	playBtn.disabled = false;
	resetBtn.disabled = false;
	playBtn.textContent = PLAY_BTN_CONTENT;
};

export const renderNewGame = function (newCountry, score) {
	message.textContent = INIT_MESSAGE;
	message.style.color = '#eee';
	guessBtn.textContent = GUESS_BTN_INIT_CONTENT;
	scoreLabel.textContent = score;
	guessInput.value = '';
	guessBtn.disabled = false;
	resetBtn.disabled = true;
	renderCountry(newCountry);
};
//
export const renderRightGuess = function (state) {
	const message =
		state.index === state.allCountries.length - 1
			? '🔥 You win!'
			: `👍 Correct! Good Guess`;
	displayMess(message);
	guessBtn.textContent = 'Continue!';
	scoreLabel.textContent = state.score;
	highscoreLabel.textContent = state.highscore;
	guessBtn.disabled =
		state.index === state.allCountries.length - 1 ? true : false;
	resetBtn.disabled =
		state.index === state.allCountries.length - 1 ? false : true;
	renderCountry(state.allCountries[state.index], true);
};

export const renderNext = function (nextCountry) {
	guessInput.value = '';
	displayMess(INIT_MESSAGE);
	renderCountry(nextCountry);
	guessBtn.textContent = GUESS_BTN_INIT_CONTENT;
};

export const renderWrongGuess = function (country, score) {
	displayMess(`😕 Oops! You lost`);
	message.style.color = '#FF0000';
	scoreLabel.textContent = score;
	guessBtn.disabled = true;
	resetBtn.disabled = false;
	renderCountry(country, true);
};

export const renderError = function (err) {
	countriesContainer.innerHTML = '';
	headerMessage.textContent = err.message;
	headerMessage.style.color = '#FF0000';
	console.error(err);
};

const renderCountry = function (data, revealed = false) {
	console.log(data);
	countriesContainer.innerHTML = '';
	const html = `
   <article class="country">
			<img class="country__img" src= ${data.flag} />
				<div class="country__data">
					<h3 class="country__name"><span>Country:</span>${
						revealed ? data.name : '?'
					}</h3>
					<h4 class="country__region"><span>REGION:</span>${data.region}</h4>
					<p class="country__row"><span>Population:</span>${+data.population} People</p> 
					<p class="country__row"><span>Currency:</span>${
						revealed ? data.currency.name : data.currency.code
					}</p>
				</div>
	</article>`;
	countriesContainer.insertAdjacentHTML('beforeend', html);
	countriesContainer.style.opacity = 1;
};
