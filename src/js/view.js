const INIT_MESSAGE = 'Start guessing...';

const message = document.querySelector('.message');
const countriesContainer = document.querySelector('.countries');
const headerMessage = document.querySelector('h1');
const scoreLabel = document.querySelector('.score');
const highscoreLabel = document.querySelector('.highscore');
const guessInput = document.querySelector('.guess__input');

export const guessBtn = document.querySelector('.btn--guess');
export const playBtn = document.querySelector('.btn--play-again');
export const nextBtn = document.querySelector('.btn--next');

export const getGuessInput = function () {
	return guessInput.value.trim().toLowerCase();
};

export const displayMess = function (mess) {
	message.textContent = mess;
};

export const renderPlay = function (newCountry, score) {
	renderNewGame(score);
	guessBtn.disabled = false;
	nextBtn.disabled = true;
	renderCountry(newCountry);
};

export const renderRightGuess = function (state) {
	const message =
		state.index === state.allCountries.length - 1
			? '🔥 You win!'
			: `👍 Correct! Space to continue`;
	displayMess(message);
	scoreLabel.textContent = state.score;
	highscoreLabel.textContent = state.highscore;
	nextBtn.disabled =
		state.index === state.allCountries.length - 1 ? true : false;
	guessBtn.disabled = true;
	renderCountry(state.allCountries[state.index], true);
};

export const renderNext = function (nextCountry) {
	guessInput.value = '';
	displayMess(INIT_MESSAGE);
	renderCountry(nextCountry);
	guessBtn.disabled = false;
	nextBtn.disabled = true;
};

export const renderWrongGuess = function (country, score) {
	displayMess(`😕 Oops! You lost`);
	message.style.color = '#FF0000';
	scoreLabel.textContent = score;
	guessBtn.disabled = true;
	renderCountry(country, true);
};
export const renderPreLoad = function (highscore) {
	highscoreLabel.textContent = highscore;
	playBtn.textContent = 'Loading';
	playBtn.disabled = true;
	nextBtn.disabled = true;
	guessBtn.disabled = true;
};

export const renderPostLoad = function () {
	playBtn.disabled = false;
	playBtn.textContent = 'Play!';
};

export const renderNewGame = function (score) {
	message.textContent = INIT_MESSAGE;
	playBtn.textContent = 'Again!';
	scoreLabel.textContent = score;
	guessInput.value = '';
	message.style.color = '#eee';
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
