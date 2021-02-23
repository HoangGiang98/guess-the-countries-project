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

const controlPlay = function (e) {
	e.preventDefault();
	this.blur();
	model.state.index = 0;
	model.state.score = 0;
	model.state.isRevealed = false;
	model.state.userGuess = '';
	shuffleArray(model.state.allCountries);
	view.renderNewGame(
		model.state.allCountries[model.state.index],
		model.state.score
	);
};

const rightGuessActions = function () {
	try {
		if (model.state.isRevealed) {
			model.state.userGuess = '';
			model.state.index += 1;
			view.renderNext(model.state.allCountries[model.state.index]);
			model.state.isRevealed = false;
			return;
		}
		model.state.score += 1;
		if (model.state.score > model.state.highscore) {
			model.state.highscore = model.state.score;
			model.saveHighScore();
		}
		view.renderRightGuess(model.state);
		model.state.isRevealed = true;
	} catch (err) {
		view.renderError(err);
	}
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

	model.state.userGuess =
		model.state.userGuess === '' ? view.getGuessInput() : model.state.userGuess;
	// No input
	if (model.state.userGuess.length === 0)
		view.displayMess('⛔️ No input! Misclick?');
	else if (model.state.userGuess === curCountry) rightGuessActions();
	else if (model.state.userGuess !== curCountry) wrongGuessActions();
};

const controlReset = function (e) {
	this.blur();
	model.state.highscore = 0;
	model.clearHighScore();
	view.displayHighScore(model.state.highscore);
};

window.addEventListener('load', init);
view.playBtn.addEventListener('click', controlPlay);
view.guessBtn.addEventListener('click', controlGuess);
view.resetBtn.addEventListener('click', controlReset);
