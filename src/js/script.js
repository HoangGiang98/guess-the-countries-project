'use strict';

import { shuffleArray } from './helpers.js';
import * as view from './view.js';
import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const init = async function () {
	try {
		model.getHighScore();
		view.renderPreLoad(model.state.highscore);
		await model.getAllCountries();
		view.renderPostLoad();
	} catch (err) {
		view.renderError(err);
	}
};

const controlNext = function (e) {
	try {
		if (e.code !== 'Space' || view.nextBtn.disabled) return;
		model.state.index += 1;
		view.renderNext(model.state.allCountries[model.state.index]);
	} catch (err) {
		view.renderError(err);
	}
};

const controlPlay = function () {
	this.blur();
	model.state.index = 0;
	model.state.score = 0;
	shuffleArray(model.state.allCountries);
	view.renderPlay(
		model.state.allCountries[model.state.index],
		model.state.score
	);
};

const rightGuessActions = function () {
	model.state.score += 1;
	if (model.state.score > model.state.highscore) {
		model.state.highscore = model.state.score;
		model.saveHighScore();
	}
	view.renderRightGuess(model.state);
};

const wrongGuessActions = function () {
	model.state.score = 0;
	view.renderWrongGuess(
		model.state.allCountries[model.state.index],
		model.state.score
	);
};

const controlGuess = function (e) {
	e.preventDefault();
	this.blur();
	const curCountry = model.state.allCountries[model.state.index].name
		.replace(/ *\([^)]*\) */g, ' ')
		.trim()
		.toLowerCase();

	const guess = view.getGuessInput();
	// No input
	if (guess.length === 0) view.displayMess('⛔️ No input! Misclick?');
	else if (guess === curCountry) rightGuessActions();
	else if (guess !== curCountry) wrongGuessActions();
};

window.addEventListener('load', init);
view.playBtn.addEventListener('click', controlPlay);
view.guessBtn.addEventListener('click', controlGuess);
document.addEventListener('keypress', controlNext);
