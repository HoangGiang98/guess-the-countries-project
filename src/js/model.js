import { AJAX } from './helpers.js';
import { API_URL } from './config.js';
import { async } from 'regenerator-runtime';
export const state = {
	allCountries: [],
	index: 0,
	highscore: 0,
	score: 0,
	isRevealed: false,
	userGuess: '',
};

const loadCountries = function (data) {
	const allCountries = data.map(count => {
		return {
			name: count.name,
			region: count.region,
			population: count.population,
			currency: count.currencies[0],
			flag: count.flag,
		};
	});
	return allCountries;
};

export const saveHighScore = function () {
	localStorage.setItem('highscore', JSON.stringify(state.highscore));
};

export const getHighScore = function () {
	const storage = localStorage.getItem('highscore');
	if (storage) state.highscore = +JSON.parse(storage);
};

export const clearHighScore = function () {
	localStorage.clear('highscore');
};

export const getAllCountries = async function () {
	try {
		const data = await AJAX(API_URL);
		state.allCountries = loadCountries(data);
	} catch (err) {
		console.error(err);
		throw err;
	}
};
